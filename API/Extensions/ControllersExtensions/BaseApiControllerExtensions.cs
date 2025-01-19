using API.Controllers;
using Application.Core;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace API.Extensions.ControllersExtensions;

public static class BaseApiControllerExtensions
{
    public static ActionResult OkWithPagination<T>(this BaseApiController controller, Result<PagedList<T>> result)
    {
        controller.Response.AddPaginationHeader(result.Value.CurrentPage, result.Value.PageSize, result.Value.TotalCount,
            result.Value.TotalPage);
        return controller.Ok(result.Value);
    }
}