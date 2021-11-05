using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using streamProject.models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace streamProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WineController : ControllerBase
    {
        private readonly IConfiguration Configuration;
        private string conString;
        public WineController(IConfiguration configuration)
        {
            this.Configuration = configuration;
            this.conString = Configuration.GetConnectionString("ConnectionString");
        }
        // GET: api/<WineController>
        [HttpGet]
        public string Get()
        {
            if (User.Identity.IsAuthenticated)
            {
                var filters = JsonConvert.DeserializeObject<FiltersModel>(HttpContext.Request.Headers["filters"]); 
                try
                {
                    var resp = WineModel.GetList(conString, filters);
                    return JsonConvert.SerializeObject(resp);
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
            else
            {
                return "no permission";
            }
        }

        // GET api/<WineController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            //var isAuthenticated = HttpContext.Session.GetString("isAthenticated");
            if (User.Identity.IsAuthenticated)
            {

                try
                {
                    var resp = WineModel.GetWineById(conString, id);
                    return JsonConvert.SerializeObject(resp);
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
            else
            {
                return "no permission";
            }
        }

        // POST api/<WineController>
        [HttpPost]
        public String Post()
        {
            //var isAuthenticated = HttpContext.Session.GetString("isAthenticated");
            if (User.Identity.IsAuthenticated)
            {

                try
                {
                    var img = Request.Form.Files[0];//campo que guarda a imagem que vem do formulario
                    WineModel item = new WineModel();
                    Random rnd = new Random();
                    int rndNumber = rnd.Next(100, 1000);
                    item.name = Request.Form["name"].ToString();
                    item.section = Request.Form["section"].ToString();
                    item.division = Request.Form["division"].ToString();
                    item.type = Request.Form["type"].ToString();
                    item.description = Request.Form["description"].ToString();
                    item.region = Request.Form["region"].ToString();
                    item.brand = Request.Form["brand"].ToString();
                    item.reference = item.name.Substring(0, 2) + "-" + item.brand.Substring(0, 2) + "-00" + rndNumber.ToString();
                    item.img = img.FileName;
                    var resp = WineModel.AddWine(item, conString);
                    if (resp.success == true)
                    {

                        string projectDirectory = Directory.GetCurrentDirectory();//obtem o Path do projeto
                        string folderName = System.IO.Path.Combine(projectDirectory, "ClientApp/public/img/Wine");//Guarda o caminho
                        string pic = System.IO.Path.GetFileName(img.FileName);//obtem o nome da imagem.
                        string path = System.IO.Path.Combine(folderName, pic);//concatena o caminho com o nome da imagem.
                        using (FileStream stream = new FileStream(path, FileMode.Create))
                        {
                            img.CopyTo(stream);
                        }

                    }
                    return JsonConvert.SerializeObject(resp);
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
            else
            {
                return "no permission";
            }
        }

        // PUT api/<WineController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<WineController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
