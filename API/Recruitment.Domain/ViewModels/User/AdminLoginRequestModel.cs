namespace Recruitment.Domain.ViewModels;

public class AdminLoginRequestModel
{
    public string UserName { get; set; }

    public string Password { get; set; }

    public string Validate()
    {
        if (string.IsNullOrWhiteSpace(UserName) || string.IsNullOrWhiteSpace(Password)) return "Enter Email and Password";

        return null;
    }
}