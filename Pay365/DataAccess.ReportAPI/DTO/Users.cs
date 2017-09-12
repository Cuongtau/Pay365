using System;

namespace DataAccess.ReportAPI.DTO
{
    public class Users
    {
        public int UserID { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string FullName { get; set; }
        public string Password { get; set; }
        public bool IsAdministrator { get; set; }
        public DateTime CreatedTime { get; set; }
        public string CreatedUser { get; set; }
        public bool Status { get; set; }
        public bool IsLock { get; set; } //0:mở , 1:đóng
    }

    //Quyền chức năng
    public class UserFunction
    {
        public int UserID { get; set; }
        public string UserName { get; set; }
        public int FunctionID { get; set; }
        public string FunctionName { get; set; }
        public string ActionName { get; set; }
        public int FatherID { get; set; }
        public string FatherName { get; set; }
        public bool IsGrant { get; set; }
        public bool IsInsert { get; set; }
        public bool IsUpdate { get; set; }
        public bool IsDelete { get; set; }
        public int CreatedUserID { get; set; }
        public bool IsRead { get; set; }
    }

}
