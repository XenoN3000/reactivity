using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos;

public class Delete
{
    public class Command : IRequest<Result<Unit>>
    {
        public string Id { get; set; }
    }


    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
        private readonly DataContext _dataContext;
        private readonly IPhotoAccessor _photoAccessor;
        private readonly IUserAccessor _userAccessor;

        public Handler(DataContext dataContext, IPhotoAccessor photoAccessor, IUserAccessor userAccessor)
        {
            _dataContext = dataContext;
            _photoAccessor = photoAccessor;
            _userAccessor = userAccessor;
        }


        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await _dataContext.Users.Include(p => p.Photos)
                .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername(), cancellationToken);

            if (user is null) return null;

            var photo = user.Photos.FirstOrDefault(p => p.Id == request.Id);

            if (photo is null) return null;

            if (photo.IsMain) return Result<Unit>.Fail("You cant delete your main photo !");

            var result = await _photoAccessor.DeletePhoto(photo.Id);

            if (result is null) return Result<Unit>.Fail("Failed to delete photo from cloudinary!");
            
            user.Photos.Remove(photo);
            
            var success = await _dataContext.SaveChangesAsync(cancellationToken) > 0;
            
            return success ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Fail("Failed to delete photo from cloudinary!"); 
            
        }
    }
}