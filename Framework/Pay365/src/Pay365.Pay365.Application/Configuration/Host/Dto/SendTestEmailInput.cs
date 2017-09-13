using System.ComponentModel.DataAnnotations;
using Abp.Application.Services.Dto;
using Pay365.Pay365.Authorization.Users;

namespace Pay365.Pay365.Configuration.Host.Dto
{
    public class SendTestEmailInput
    {
        [Required]
        [MaxLength(User.MaxEmailAddressLength)]
        public string EmailAddress { get; set; }
    }
}