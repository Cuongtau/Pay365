using System.ComponentModel.DataAnnotations;

namespace ShoppinOnline.Model.Request
{
    public class Account
    {
        [Required]
        [MaxLength(100)]
        public string AccountName { get; set; }
        [Required]
        [MaxLength(50)]
        public string Password { get; set; }
    }
}
