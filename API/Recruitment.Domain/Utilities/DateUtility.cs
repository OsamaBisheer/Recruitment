using System.Globalization;

namespace Recruitment.Domain.Utilities
{
    public static class DateUtility
    {
        public static bool IsFirstLower(DateTime firstDate, DateTime secondDate) => DateTime.Compare(firstDate, secondDate) < 0;

        public static bool IsFirstHigher(DateTime firstDate, DateTime secondDate) => DateTime.Compare(firstDate, secondDate) > 0;

        // Parse string (dd/MM/yyyy) to datetime
        public static DateTime ParseExact(string date)
        {
            return DateTime.ParseExact(date, "dd/MM/yyyy", CultureInfo.InvariantCulture);
        }
    }
}