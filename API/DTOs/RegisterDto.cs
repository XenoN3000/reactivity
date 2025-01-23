using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class RegisterDto
{
    [Required] [EmailAddress] public string Email { get; set; }


    [Required]
    [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$", ErrorMessage = "Please enter a valid Password - at least 1 upperCase 1 lowerCase and 1 number  minimum 8 character")]
    public string Password { get; set; }

    [Required] public string DisplayName { get; set; }

    [Required] public string Username { get; set; }
}