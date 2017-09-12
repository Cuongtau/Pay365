using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Web;
using DataAccess.ReportAPI.DTO;
using Pay365.Utils;
using Pay365.BillingReport.Models;

namespace Pay365.BillingReport.Controllers.Common
{
    public class CommonLib
    {
        private UserFunction Permission { get { return ((UserFunction)HttpContext.Current.Session[SessionsManager.SESSION_PERMISSION]); } }

        public List<TreeFunction> GetListTreeFunction(int ParentsID, List<Functions> roots)
        {
            var tmp = new List<TreeFunction>();
            var levesub = roots.FindAll(c => c.ParentID == ParentsID);
            levesub.Sort((f1, f2) => f1.FunctionID.CompareTo(f2.FunctionID));
            if (levesub.Count <= 0) return null;
            foreach (var t in levesub)
            {
                roots.Remove(t);
                var data = new TreeFunction
                {
                    FuntionId = t.FunctionID,
                    ParentId = t.ParentID,
                    text = t.FunctionName,
                    icon = t.CssIcon,
                    IsBtnGrant = false
                };
                if (!string.IsNullOrEmpty(t.Url))
                {
                    data.IsBtnGrant = true;
                }
                tmp.Add(data);
                var childrens = GetListTreeFunction(t.FunctionID, roots);
                data.nodes = childrens;
            }
            return tmp;


        }


        public static string GenerateSign(string dataSign, string keySign)
        {
            var sign = string.Empty;
            try
            {
                var ticks = DateTime.Now.Ticks;
                var plaintextSign = string.Format("{0}|{1}|{2}", dataSign, keySign, ticks);
                sign = string.Format("{0}.{1}", ticks, Pay365.Utils.Security.Encrypt.MD5(plaintextSign));
                return sign;
            }
            catch (Exception ex)
            {
                NLogLogger.PublishException(ex);
                return sign;
            }
        }
 



        #region Chuyen list -> datatable
        public DataTable ToDataTable<T>(List<T> items)
        {
            var tb = new DataTable(typeof(T).Name);

            PropertyInfo[] props = typeof(T).GetProperties(BindingFlags.Public | BindingFlags.Instance);

            foreach (PropertyInfo prop in props)
            {
                Type t = GetCoreType(prop.PropertyType);
                tb.Columns.Add(prop.Name, t);
            }


            foreach (T item in items)
            {
                var values = new object[props.Length];

                for (int i = 0; i < props.Length; i++)
                {
                    values[i] = props[i].GetValue(item, null);
                }

                tb.Rows.Add(values);
            }

            return tb;
        }
        public static Type GetCoreType(Type t)
        {
            if (t != null && IsNullable(t))
            {
                if (!t.IsValueType)
                {
                    return t;
                }
                else
                {
                    return Nullable.GetUnderlyingType(t);
                }
            }
            else
            {
                return t;
            }
        }
        public static bool IsNullable(Type t)
        {
            return !t.IsValueType || (t.IsGenericType && t.GetGenericTypeDefinition() == typeof(Nullable<>));
        }

        #endregion
        public static DateTime UnixTimeStampToDateTime(long unixTimeStamp)
        {
            // Unix timestamp is seconds past epoch
            System.DateTime dtDateTime = new DateTime(1970, 1, 1, 0, 0, 0, 0, System.DateTimeKind.Local);
            dtDateTime = dtDateTime.AddSeconds(unixTimeStamp).ToLocalTime();
            return dtDateTime;
        }
        public static double DateTimeToUnixTimestamp(DateTime dateTime)
        {
            return TimeZoneInfo.ConvertTimeToUtc(dateTime).Subtract(new DateTime(1970, 1, 1, 0, 0, 0, 0, System.DateTimeKind.Local)).TotalSeconds;
        }
    }
    public static class RandomLetter
    {
        static Random _random = new Random();
        public static char GetLetter()
        {
            // This method returns a random lowercase letter.
            // ... Between 'a' and 'z' inclusize.
            int num = _random.Next(0, 26); // Zero to 25
            char let = (char)('a' + num);
            return let;
        }
        public static string RandomString(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var random = new Random();
            return new string(Enumerable.Repeat(chars, length)
              .Select(s => s[random.Next(s.Length)]).ToArray());
        }
    }
}