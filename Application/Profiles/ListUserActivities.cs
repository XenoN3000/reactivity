using Application.Core;
using Application.Followers;
using Application.Interfaces;
using Application.Profiles.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles;

public class ListUserActivities
{
    public class Query : IRequest<Result<List<UserActivityDto>>>
    {
        public string ProfileUsername { get; set; }
        public string Predicate { get; set; }
    }

    public class Handler : IRequestHandler<Query, Result<List<UserActivityDto>>>
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public Handler(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }


        public async Task<Result<List<UserActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
        {
            // var preQuery = request.Params.Hosting
            //     ? _context.Activities.Where(x => x.Attendees.FirstOrDefault(a => a.IsHost).AppUser.UserName == request.ProfileUsername)
            //     : request.Params.Future
            //         ? _context.Activities.Where(x => x.Date >= DateTime.UtcNow)
            //         : _context.Activities.Where(x => x.Date < DateTime.UtcNow);

            // var query  = preQuery.OrderBy(d => d.Date).ProjectTo<UserActivityDto>(_mapper.ConfigurationProvider).AsQueryable();

            var query = _context.ActivityAttendees
                .Where(u => u.AppUser.UserName == request.ProfileUsername)
                .OrderBy(d => d.Activity.Date)
                .ProjectTo<UserActivityDto>(_mapper.ConfigurationProvider)
                .AsQueryable();

            query = request.Predicate switch
            {
                "hosting" => query.Where(a => a.HostUsername == request.ProfileUsername),
                "past" => query.Where(a => a.Date <= DateTime.Now),
                _ => query.Where(a => a.Date > DateTime.Now)
            };

            var activities = await query.ToListAsync(cancellationToken);


            return Result<List<UserActivityDto>>.Success(activities);
        }
    }
}