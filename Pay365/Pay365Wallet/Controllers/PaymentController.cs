using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Pay365Wallet.Controllers
{
    public class PaymentController : BaseController
    {
        [Route("~/nap-dien-thoai")]
        public ActionResult TopupMobile()
        {
            ViewBag.Id = 1;
            return View("BuyProduct");
        }

        [Route("~/nap-game")]
        public ActionResult TopupGame()
        {
            ViewBag.Id = 2;
            return View("BuyProduct");
        }

        [Route("~/mua-the-game")]
        public ActionResult BuyCardGame()
        {
            ViewBag.Id = 4;
            return View("BuyProduct");
        }

        [Route("~/mua-the-dien-thoai")]
        public ActionResult BuyCard()
        {
            ViewBag.Id = 3;
            return View("BuyProduct");
        }
        
        // GET: Payment
        [Route("~/thanh-toan-hoa-don")]
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Payment()
        {
            return PartialView();
        }

        public ActionResult Payment_Bill()
        {
            return PartialView();
        }

        public ActionResult Payment_Comfirm()
        {

            return PartialView();
        }
    }
}