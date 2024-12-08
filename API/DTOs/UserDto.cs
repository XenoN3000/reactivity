using System.Diagnostics.CodeAnalysis;
using Domain;

namespace API.DTOs;

public class UserDto
{
    public string DisplayName { get; set; }
    public string Token { get; set; }
    public string Image { get; set; }
    public string Username { get; set; }


    public static UserDto CreateFromUserDto(UserDto userDto) => new UserDto
    {
        DisplayName = userDto.DisplayName, Token = userDto.Token, Image = userDto.Image, Username = userDto.Username
    };
    
    public static UserDto CreateFromUser(AppUser user,string token) => new UserDto
    {
        DisplayName = user.DisplayName, Token = token, Image = null, Username = user.UserName
    };
}