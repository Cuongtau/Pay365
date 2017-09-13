using System.ComponentModel.DataAnnotations;
using Abp.Application.Services.Dto;

namespace Pay365.Pay365.Localization.Dto
{
    public class CreateOrUpdateLanguageInput
    {
        [Required]
        public ApplicationLanguageEditDto Language { get; set; }
    }
}