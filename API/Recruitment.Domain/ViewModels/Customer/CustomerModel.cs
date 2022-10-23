namespace Recruitment.Domain.ViewModels
{
    public class CustomerModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
        public string Mobile { get; set; }
        public string Name { get; set; }

        public string Validate()
        {
            if (string.IsNullOrWhiteSpace(Email)) return "emailRequired";

            if (string.IsNullOrWhiteSpace(Name)) return "emailRequired";

            if (string.IsNullOrWhiteSpace(Mobile)) return "mobileRequired";

            if (string.IsNullOrWhiteSpace(Password)) return "passwordRequired";

            if (Password != ConfirmPassword) return "invaildConfirmPassword";

            return null;
        }
    }
}