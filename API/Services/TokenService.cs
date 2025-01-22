using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Domain;
using Microsoft.IdentityModel.Tokens;

namespace API.Services;

public class TokenService
{
    private readonly IConfiguration _configuration;
    private readonly string _environment;

    public TokenService(IConfiguration configuration)
    {
        _configuration = configuration;
        _environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
    }

    public string CreateToken(AppUser user)
    {
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, user.UserName),
            new Claim(ClaimTypes.NameIdentifier, user.Id),
            new Claim(ClaimTypes.Email, user.Email),
        };

        /*
         * C#
           new(JwtRegisteredClaimNames.Nbf, currentTime.ToUnixTimeSeconds().ToString()),
           new(JwtRegisteredClaimNames.Exp, expiresInSeconds.ToString()),
           new(WebApiCommonDefaults.ClaimTypeName, customer.Id.ToString()),
           new(ClaimTypes.NameIdentifier, customer.CustomerGuid.ToString())
         */
        
        // var key = _environment == "Development"
        //     ? new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["TokenKey"]!))
        //     : new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["TokenKey"]!));
        
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["TokenKey"]!));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddDays(30),
            SigningCredentials = creds
        };

        var tokenHandler = new JwtSecurityTokenHandler();

        var token = tokenHandler.CreateToken(tokenDescriptor);

        return tokenHandler.WriteToken(token);
    }
}