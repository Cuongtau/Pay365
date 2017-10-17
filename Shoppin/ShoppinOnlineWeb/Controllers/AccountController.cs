using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using System.Text;
using ShoppinOnline.Model.Response;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using UtilLibraries;
using UtilLibraries.Securities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Security.Principal;
using Services.IService;
using DAL.Model;
using Microsoft.Extensions.Logging;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace ShoppinOnline.Controllers
{
    [Route("api/[controller]/[action]")]
    public class AccountController : Controller
    {
        private readonly ILogger<AccountController> _logger;
        private readonly IConfiguration _appConfiguration;
        private readonly IdentityOptions _identityOptions;

        private IAccountService _iAccountService;
        public AccountController(ILogger<AccountController> logger, IConfiguration appConfiguration, IOptions<IdentityOptions> identityOptions, IAccountService iAccountService)
        {
            _logger = logger;
            _appConfiguration = appConfiguration;
            _identityOptions = identityOptions.Value;
            _iAccountService = iAccountService;
        }

        /// <summary>
        /// Delete API Value
        /// </summary>
        /// <remarks>This API will create account the values.</remarks>
        /// <param name="account">object account</param>
        /// <returns></returns>
        [HttpPost]
        public IActionResult Register([FromBody]Account account)
        {
            try
            {
                _logger.LogInformation("123454");
                if (string.IsNullOrEmpty(account.AccountName))
                {
                    return StatusCode(500, new { status = CommonError.AccountNameEmpty, description = CommonError.Description(CommonError.AccountNameEmpty) });
                }
                if (string.IsNullOrEmpty(account.Password))
                {
                    return StatusCode(500, new { status = CommonError.PasswordEmpty, description = CommonError.Description(CommonError.PasswordEmpty) });
                }
                if (string.IsNullOrEmpty(account.Email))
                {
                    return StatusCode(500, new { status = CommonError.EmailEmpty, description = CommonError.Description(CommonError.EmailEmpty) });
                }
                if (string.IsNullOrEmpty(account.PhoneNumber))
                {
                    return StatusCode(500, new { status = CommonError.PhoneNumberEmpty, description = CommonError.Description(CommonError.PhoneNumberEmpty) });
                }
                account.Password = PasswordHelper.HashPassword(account.Password);
                int response = _iAccountService.Register(account);
                if (response > 0)
                    return Ok(new { status = 1 });
                return StatusCode(500, new { status = CommonError.Systembusy, description = CommonError.Description(CommonError.Systembusy) });
            }
            catch (Exception ex)
            {
                _logger.LogDebug(ex, ex.Message);
                return StatusCode(500, new { status = CommonError.Systembusy, description = ex.Message });
            }
        }

        [HttpPost]
        public IActionResult Authentication([FromBody]Account account)
        {

            var handler = new JwtSecurityTokenHandler();
            ClaimsIdentity identity = new ClaimsIdentity(
                new GenericIdentity(account.AccountName, "TokenAuth"),
                new[] { new Claim("ID", "1") }
            );

            var configKey = _appConfiguration.GetValue<string>("Authentication:JwtBearer:SecurityKey");
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var securityToken = handler.CreateToken(new SecurityTokenDescriptor
            {
                Issuer = _appConfiguration.GetValue<string>("Authentication:JwtBearer:Issuer"),
                Audience = _appConfiguration.GetValue<string>("Authentication:JwtBearer:Audience"),
                SigningCredentials = creds,
                Subject = identity,
                Expires = DateTime.Now.AddMinutes(30)
            });
            return Ok(new { token = handler.WriteToken(securityToken) });
        }
        // GET api/values
        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IEnumerable<string> Get()
        {
            var identity = (ClaimsIdentity)User.Identity;
            return new string[] { "value1", "value2" };
        }

        private List<Claim> CreateJwtClaims(ClaimsIdentity identity)
        {
            var claims = identity.Claims.ToList();
            var nameIdClaim = claims.First(c => c.Type == _identityOptions.ClaimsIdentity.UserIdClaimType);

            if (_identityOptions.ClaimsIdentity.UserIdClaimType != JwtRegisteredClaimNames.Sub)
            {
                claims.Add(new Claim(JwtRegisteredClaimNames.Sub, nameIdClaim.Value));
            }

            claims.AddRange(new[]
            {
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Iat, DateTimeOffset.Now.ToUnixTimeSeconds().ToString(), ClaimValueTypes.Integer64)
            });

            return claims;
        }
        private string CreateAccessToken(IEnumerable<Claim> claims, TimeSpan? expiration = null)
        {
            var now = DateTime.UtcNow;
            var signingCredentials = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_appConfiguration.GetValue<string>("Authentication:JwtBearer:SecurityKey")));
            var jwtSecurityToken = new JwtSecurityToken(
                claims: claims,
                notBefore: now,
                expires: now.Add(expiration ?? TimeSpan.FromDays(1)),
                signingCredentials: new SigningCredentials(signingCredentials, SecurityAlgorithms.HmacSha256)
            );

            return new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);
        }
        private string GetEncrpyedAccessToken(string accessToken)
        {
            return StringCipher.EncryptString(accessToken, ShopConsts.DefaultPassPhrase);
        }
    }
}
