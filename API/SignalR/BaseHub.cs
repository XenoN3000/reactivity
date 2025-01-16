using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR;

public class BaseHub: Hub
{
    protected readonly IMediator Mediator;

    public BaseHub(IMediator mediator) 
    {
        Mediator = mediator;
    }
}