using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {
        /*TODO : check null */
        private IMediator _mediator;

        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>();


        protected ActionResult HandleResult<T>(Result<T> result)
        {
            return result switch
            {
                null => NotFound(),
                { IsSuccess: true, Value: not null } => Ok(result.Value),
                { IsSuccess: true, Value: null } => NotFound(),
                _ => BadRequest(result.Error)
            };
        }

    }
}