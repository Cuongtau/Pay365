using Pay365.Pay365.Dto;

namespace Pay365.Pay365.Common.Dto
{
    public class FindUsersInput : PagedAndFilteredInputDto
    {
        public int? TenantId { get; set; }
    }
}