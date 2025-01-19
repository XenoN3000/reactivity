using Application.Core;

namespace Application.Profiles;

public class UserActivityParams : PagingParams
{

    public bool Future { get; set; }
    public bool Hosting { get; set; }
}