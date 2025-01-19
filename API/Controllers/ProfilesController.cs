using Application.Profiles;
using Application.Profiles.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class ProfilesController: BaseApiController
{
    [HttpGet("{username}")]
    public async Task<IActionResult> GetProfile(string username, CancellationToken cancellationToken)
    {
        return HandleResult(await Mediator.Send(new Details.Query { Username = username }));
    }

    [HttpGet("{username}/activities")]
    public async Task<IActionResult> GetUserActivity(string username, [FromQuery] string predicate, CancellationToken cancellationToken)
    {
        return HandleResult(await Mediator.Send(new ListUserActivities.Query { ProfileUsername = username, Predicate = predicate}, cancellationToken));
    }

    [HttpPut]
    public async Task<IActionResult> UpdateProfile([FromBody] UserInfoUpdateDto userInfoUpdateDto, CancellationToken cancellationToken)
    {
        return HandleResult(await Mediator.Send(new Update.Command{UpdateInfo = userInfoUpdateDto}, cancellationToken));
    }
}