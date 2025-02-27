using Application.Comments;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR;

public class ChatHub : BaseHub
{
    public ChatHub(IMediator mediator) : base(mediator)
    {
    }

    public async Task SendComment(Create.Command command)
    {
        var comment = await Mediator.Send(command);

        await Clients.Group(command.ActivityId.ToString())
            .SendAsync("ReceiveComment", comment.Value);
    }

    public override async Task OnConnectedAsync()
    {
        var httpContext = this.Context.GetHttpContext();
        var activityId = httpContext.Request.Query["activityId"];
        await Groups.AddToGroupAsync(Context.ConnectionId, activityId);

        var result = await Mediator.Send(new List.Query { ActivityId = Guid.Parse(activityId) });

        await Clients.Caller.SendAsync("LoadComments", result.Value);
    }
}