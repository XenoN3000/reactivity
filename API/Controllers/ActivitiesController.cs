using System.Diagnostics;
using Application;
using Application.Activities;
using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Activity = Domain.Activity;

namespace API.Controllers;

public class ActivitiesController : BaseApiController
{
    
    [HttpGet]
    public async Task<IActionResult> GetActivities(CancellationToken cancellationToken)
    {
        return HandleResult(await Mediator.Send(new List.Query(), cancellationToken));
    }


    [HttpGet("{id}")]
    public async Task<IActionResult> GetActivity(Guid id, CancellationToken cancellationToken)
    {
        var result = await Mediator.Send(new Details.Query { Id = id }, cancellationToken);
        return HandleResult(result);
    }


    [HttpPost]
    public async Task<IActionResult> CreateActivity([FromBody] Activity activity, CancellationToken cancellationToken)
    {
        var result = await Mediator.Send(new Create.Command { Activity = activity }, cancellationToken);
        return HandleResult(result);
    }
    
    [Authorize(Policy = "IsActivityHost")]
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateActivity(Guid id, [FromBody] Activity activity,
        CancellationToken cancellationToken)
    {
        activity.Id = id;
        return HandleResult(await Mediator.Send(new Edit.Command { Activity = activity }, cancellationToken));
    }


    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteActivity(Guid id)
    {
        return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
    }

    [HttpPost("{id}/attend")]

    public async Task<IActionResult> Attend(Guid id, CancellationToken cancellationToken)
    {
        return  HandleResult(await Mediator.Send(new UpdateAttendance.Command{Id = id}, cancellationToken));
    }
}