using System;
using System.Globalization;
using System.Text;
using System.Text.RegularExpressions;
using static System.DateTime;

namespace Recruitment.Repository.Providers
{
    public static class FunctionsHelper
    {
        public static decimal RoundCeiling(decimal number, int decimals)
        {
            var factor = (decimal)Math.Pow(10, decimals);
            return Math.Ceiling(number * factor) / factor;
        }

        public static long ParseLong(object inputLong, int defaultVal = -1)
        {
            if (inputLong == null) inputLong = defaultVal;
            long outputLong;
            return long.TryParse(inputLong.ToString(), out outputLong) ? outputLong : defaultVal;
        }

        public static decimal ParseDecimal(object inputDecimal, decimal defaultVal = 0)
        {
            inputDecimal ??= defaultVal;

            decimal outPutInteger;
            return decimal.TryParse(inputDecimal.ToString(), out outPutInteger) ? outPutInteger : defaultVal;
        }

        public static Guid ParseGuid(object guid)
        {
            if (guid == null)
            {
                return Guid.NewGuid();
            }
            return Guid.TryParse(guid.ToString(), out Guid outPutGuid) ? outPutGuid : Guid.NewGuid();
        }

        public static string RemoveExtraString(string stringTxt, int numberOfCharacters, bool showDots = true)
        {
            if (string.IsNullOrEmpty(stringTxt)) return "";
            stringTxt = stringTxt.Replace("\r", string.Empty).Replace("\n", string.Empty);
            if (stringTxt.Length <= numberOfCharacters) return stringTxt;
            stringTxt = stringTxt.Substring(0, numberOfCharacters);
            if (stringTxt.LastIndexOf(" ", StringComparison.Ordinal) != numberOfCharacters && stringTxt.LastIndexOf(" ", StringComparison.Ordinal) != -1) stringTxt = stringTxt.Substring(0, stringTxt.LastIndexOf(" ", StringComparison.Ordinal));
            return stringTxt + (showDots ? "..." : "");
        }

        /// <summary>
        /// parse date time exact
        /// </summary>
        /// <param name="inputDateTime"></param>
        /// <param name="format"></param>
        /// <param name="defaultVal"></param>
        /// <returns>DateTime object</returns>
        public static DateTime ParseDateTimeExact(object inputDateTime, string format, string defaultVal)
        {
            if (string.IsNullOrEmpty(inputDateTime?.ToString())) inputDateTime = defaultVal;
            CultureInfo cultureInfo = new CultureInfo("ar-KW");
            TryParseExact(inputDateTime.ToString(), format, cultureInfo, DateTimeStyles.None, out var dateTime);

            return dateTime;
        }

        public static bool IsValidEmail(string strEmail)
        {
            var objNotWholePattern = new Regex(@"^(([\w-]+\.)+[\w-]+|([a-zA-Z]{1}|[\w-]{2,}))@"
                                               + @"((([0-1]?[0-9]{1,2}|25[0-5]|2[0-4][0-9])\.([0-1]?
				[0-9]{1,2}|25[0-5]|2[0-4][0-9])\."
                                               + @"([0-1]?[0-9]{1,2}|25[0-5]|2[0-4][0-9])\.([0-1]?
				[0-9]{1,2}|25[0-5]|2[0-4][0-9])){1}|"
                                               + @"([a-zA-Z0-9]+[\w-]+\.)+[a-zA-Z]{1}[a-zA-Z0-9-]{1,23})$");
            return objNotWholePattern.IsMatch(strEmail);
        }

        public static string GetRelativeTime(DateTime inputDate)
        {
            const int second = 1;
            const int minute = 60 * second;
            const int hour = 60 * minute;
            const int day = 24 * hour;
            const int month = 30 * day;
            const int year = 365 * day;
            var nowDate = Now;

            var ts = new TimeSpan(nowDate.Ticks - inputDate.Ticks);
            var sec = ts.TotalSeconds;
            var delta = Math.Abs(sec);

            var isFuture = sec < 0;

            decimal val;

            if (delta < 1 * minute)
            {
                return isFuture ? "after few seconds" : "a few seconds ago";
            }
            if (delta < 2 * minute)
            {
                return isFuture ? "in a minute" : "a minute ago";
            }
            if (delta < 45 * minute)
            {
                val = Math.Round((decimal)Math.Abs(ts.Minutes), 0, MidpointRounding.AwayFromZero);

                return isFuture ? "after " + val + " minutes" : val + " minutes ago";
            }
            if (delta < 90 * minute)
            {
                return isFuture ? "after an hour" : "an hour ago";
            }
            if (delta < 24 * hour)
            {
                val = Math.Round((decimal)Math.Abs(ts.Hours), 0, MidpointRounding.AwayFromZero);
                return isFuture ? "after " + val + " hours" : val + " hours ago";
            }
            if (delta < 48 * hour)
            {
                return isFuture ? "tomorrow" : "yesterday";
            }
            if (delta < 30 * day)
            {
                val = Math.Round((decimal)Math.Abs(ts.Days), 0, MidpointRounding.AwayFromZero);
                return isFuture ? "after " + val + " days" : val + " days ago";
            }
            if (delta < 12 * month)
            {
                var months = Math.Abs(sec / month);
                if (months <= 1)
                {
                    return isFuture ? "after one month" : "one month ago";
                }
                val = Math.Round((decimal)months, 0, MidpointRounding.AwayFromZero);
                return isFuture ? "after " + val + " months" : val + " months ago";
            }
            var years = Math.Abs(sec / year);
            if (years < 2)
            {
                return isFuture ? "after one year" : "one year ago";
            }
            val = Math.Round((decimal)years, 0, MidpointRounding.AwayFromZero);
            return isFuture ? "after " + val + " years" : val + " years ago";
        }

        public static bool IsIbanValid(string iban)
        {
            if (string.IsNullOrEmpty(iban))
            {
                return false;
            }

            if (iban.Length < 4)
            {
                return false;
            }
            iban = iban.ToUpper(); //IN ORDER TO COPE WITH THE REGEX BELOW

            if (Regex.IsMatch(iban, "^[a-zA-Z0-9 ]*$"))
            {
                iban = iban.Replace(" ", string.Empty);
                var bank = iban.Substring(4, iban.Length - 4) + iban.Substring(0, 4);
                const int asciiShift = 55;
                var sb = new StringBuilder();
                foreach (var c in bank)
                {
                    int v;
                    if (char.IsLetter(c)) v = c - asciiShift;
                    else v = int.Parse(c.ToString());
                    sb.Append(v);
                }
                var checkSumString = sb.ToString();
                var checksum = int.Parse(checkSumString.Substring(0, 1));
                for (var i = 1; i < checkSumString.Length; i++)
                {
                    var v = int.Parse(checkSumString.Substring(i, 1));
                    checksum *= 10;
                    checksum += v;
                    checksum %= 97;
                }
                return checksum == 1;
            }

            return false;
        }
    }
}