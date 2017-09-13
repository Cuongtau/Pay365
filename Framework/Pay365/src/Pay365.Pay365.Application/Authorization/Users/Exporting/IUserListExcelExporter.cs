using System.Collections.Generic;
using Pay365.Pay365.Authorization.Users.Dto;
using Pay365.Pay365.Dto;

namespace Pay365.Pay365.Authorization.Users.Exporting
{
    public interface IUserListExcelExporter
    {
        FileDto ExportToFile(List<UserListDto> userListDtos);
    }
}