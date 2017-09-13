using System.Collections.Generic;
using Pay365.Pay365.Auditing.Dto;
using Pay365.Pay365.Dto;

namespace Pay365.Pay365.Auditing.Exporting
{
    public interface IAuditLogListExcelExporter
    {
        FileDto ExportToFile(List<AuditLogListDto> auditLogListDtos);
    }
}
