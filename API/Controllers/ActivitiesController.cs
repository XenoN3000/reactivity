using System.Diagnostics;
using Application;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Activity = Domain.Activity;

namespace API.Controllers;

public class ActivitiesController : BaseApiController
{


    [HttpGet]
    public async Task<ActionResult<IEnumerable<Activity>>> GetActivities()
    {
        return await Mediator.Send(new List.Query());
    }

    

    [HttpGet("{id}")]
    public async Task<ActionResult<Activity>> GetActivity(Guid id)
    {
        return await Mediator.Send(new Details.Query {Id = id});
    }


    [HttpPost]
    public async Task<IActionResult> CreateActivity([FromBody]Activity activity)
    {
        await Mediator.Send(new Create.Command { Activity = activity });
        return Ok();
    }
}