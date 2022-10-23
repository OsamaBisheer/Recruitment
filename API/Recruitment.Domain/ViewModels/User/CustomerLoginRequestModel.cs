namespace Recruitment.Domain.ViewModels;

public class CustomerLoginRequestModel
{
    public string Email { get; set; }

    public string Password { get; set; }

    public string Validate()
    {
        if (string.IsNullOrWhiteSpace(Email) || string.IsNullOrWhiteSpace(Password)) return "Enter Email and Password";

        return null;
    }
}