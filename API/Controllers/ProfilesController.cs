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

    [HttpPut]
    public async Task<IActionResult> UpdateProfile([FromBody] UserInfoUpdateDto userInfoUpdateDto, CancellationToken cancellationToken)
    {
        return HandleResult(await Mediator.Send(new Update.Command{UpdateInfo = userInfoUpdateDto}, cancellationToken));
    }
}