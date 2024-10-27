using System.Diagnostics;
using Application;
using Application.Activities;
using MediatR;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Activity = Domain.Activity;

namespace API.Controllers;

public class ActivitiesController : BaseApiController
{


    [HttpGet]
    public async Task<ActionResult<IEnumerable<Activity>>> GetActivities(CancellationToken cancellationToken)
    {
        return await Mediator.Send(new List.Query(), cancellationToken);
    }

    

    [HttpGet("{id}")]
    public async Task<ActionResult<Activity>> GetActivity(Guid id, CancellationToken cancellationToken)
    {
        return await Mediator.Send(new Details.Query {Id = id}, cancellationToken);
    }


    [HttpPost]
    public async Task<IActionResult> CreateActivity([FromBody]Activity activity, CancellationToken cancellationToken)
    {
        await Mediator.Send(new Create.Command { Activity = activity }, cancellationToken);
        return Ok();
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateActivity(Guid id, [FromBody] Activity activity, CancellationToken cancellationToken)
    {
        activity.Id = id;
        await Mediator.Send(new Edit.Command { Activity = activity }, cancellationToken);
        return Ok();
    }


    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteActivity(Guid id)
    {
        await Mediator.Send(new Delete.Command { Id = id });
        return Ok();
    }
}