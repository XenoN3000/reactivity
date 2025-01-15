using Application.Profiles.DTOs;
using Domain;
using FluentValidation;

namespace Application.Profiles.Validators;

public class ProfileUpdateInfoValidator: AbstractValidator<UserInfoUpdateDto>
{
    public ProfileUpdateInfoValidator()
    {
        RuleFor(x => x.DisplayName).NotEmpty().MinimumLength(3);
    }
}