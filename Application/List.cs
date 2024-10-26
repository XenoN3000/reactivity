using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application;

public class List
{
    public class Query : IRequest<List<Activity>>
    {
    }

    public class Handler : IRequestHandler<Query, List<Activity>>
    {
        private readonly DataContext _context;

        public Handler(DataContext dataContext)
        {
            _context = dataContext;
        }

        public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
        {
            return await _context.Activities.ToListAsync();
        }
    }
}