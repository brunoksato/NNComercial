using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace NNComercial.Controllers
{
    public class IndexController : Controller
    {
        //
        // GET: /Index/

        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Email(string nomeData, string emailData, string telefoneData, string textData)
        {
            var js = new JavaScriptSerializer();
            js.MaxJsonLength = Int32.MaxValue;
            var Nome = js.Deserialize<string>(nomeData);
            var Email = js.Deserialize<string>(emailData);
            var Telefone = js.Deserialize<string>(telefoneData);
            var Texto = js.Deserialize<string>(textData);

            MailMessage mail = new MailMessage();

            mail.From = new MailAddress(Email);
            mail.To.Add("site@nncomercial.com");
            mail.Subject = "Email do Site - Enviado por" + Nome;
            mail.IsBodyHtml = true;
            mail.Body = Telefone + "/n/n" + Texto;
            

            SmtpClient client = new SmtpClient("smtp.nncomercial.com", 587);
            client.Credentials = new NetworkCredential("site@nncomercial.com", "Draculla@10");

            try
            {
                client.Send(mail);
            }
            catch (Exception)
            {
                return Redirect("/Index/Index");
            }

            return Redirect("/Index/Index");
        }

    }
}
