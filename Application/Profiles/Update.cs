using Application.Activities;
using Application.Core;
using Application.Interfaces;
using Application.Profiles.DTOs;
using Application.Profiles.Validators;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles;

public class Update
{
    public class Command : IRequest<Result<Unit>>
    {
        public UserInfoUpdateDto UpdateInfo { get; set; }
    }


    public class CommandValidator : AbstractValidator<Command>
    {
        public CommandValidator()
        {
            RuleFor(x => x.UpdateInfo).SetValidator(new ProfileUpdateInfoValidator());
        }
    }


    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
        private readonly DataContext _dataContext;
        private readonly IMapper _mapper;
        private readonly IUserAccessor _userAccessor;

        public Handler(DataContext dataContext, IMapper mapper, IUserAccessor userAccessor)
        {
            _dataContext = dataContext;
            _mapper = mapper;
            _userAccessor = userAccessor;
        }


        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await _dataContext.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername(), cancellationToken);

            if (user is null) return null;

            _mapper.Map(request.UpdateInfo, user);

            _dataContext.Entry(user).State = EntityState.Modified;
            
            var success = await _dataContext.SaveChangesAsync(cancellationToken) > 0;

            return success ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Fail("Problem to Update Profile!!!");
        }
    }
}