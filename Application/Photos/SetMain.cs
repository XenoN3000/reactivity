using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos;

public class SetMain
{
    public class Command : IRequest<Result<Unit>>
    {
        public string Id { get; init; }
    }


    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
        private readonly DataContext _dataContext;
        private readonly IUserAccessor _userAccessor;

        public Handler(DataContext dataContext, IUserAccessor userAccessor)
        {
            _dataContext = dataContext;
            _userAccessor = userAccessor;
        }


        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await _dataContext.Users.Include(p => p.Photos)
                .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername(), cancellationToken);


            if (user is null) return null;
            
            var photo = user.Photos.FirstOrDefault(x => x.Id == request.Id);
            
            if (photo is null) return null;
            
            var currentMain = user.Photos.FirstOrDefault(x => x.IsMain);
            
            if (currentMain is not null) currentMain.IsMain = false;
            
            photo.IsMain = true;
            
            var result = await _dataContext.SaveChangesAsync(cancellationToken) > 0;
            
            return  result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Fail("Problem setting main photo !!!");
        }
    }
}