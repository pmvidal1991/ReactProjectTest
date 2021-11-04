using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using streamProject.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace streamProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IConfiguration Configuration;
        private string conString;

        public LoginController(IConfiguration configuration)
        {
            this.Configuration = configuration;
            this.conString = Configuration.GetConnectionString("ConnectionString");
        }
        // GET: api/<LoginController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<LoginController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<LoginController>
        [HttpPost]
        public async Task<string> PostAsync()
        {

            LoginModel login = new LoginModel();
            login.Username = Request.Form["Username"].ToString();
            login.Password = Request.Form["Password"].ToString();
            var isLogin = Convert.ToBoolean(Request.Form["Login"].ToString());
            if (isLogin)
            {
                try
                {
                    var response = LoginModel.Login(login, conString);
                    if (response.success == true)
                    {
                        //HttpContext.Session.SetString("isAthenticated", true.ToString());
                        var claims = new List<Claim>();
                        claims.Add(new Claim("username", login.Username));
                        claims.Add(new Claim(ClaimTypes.NameIdentifier, login.Username));
                        claims.Add(new Claim(ClaimTypes.Name, login.Username));
                        claims.Add(new Claim(ClaimTypes.Role, "Admin"));
                        var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
                        var claimsPrincipal = new ClaimsPrincipal(claimsIdentity);
                        await HttpContext.SignInAsync(claimsPrincipal);
                        return JsonConvert.SerializeObject(response);
                    }
                    else
                    {
                        return JsonConvert.SerializeObject(response);
                    }
                }
                catch (Exception ex)
                {
                    throw ex;
                }

            }
            else
            {
                try
                {
                    //HttpContext.Session.Clear();
                    await HttpContext.SignOutAsync();
                    var response = new LoginModel();
                    response.success = false;
                    return JsonConvert.SerializeObject(response);
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }

        }

        // PUT api/<LoginController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<LoginController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
