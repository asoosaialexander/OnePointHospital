using System;
using hospital_management_api.Models;
using Microsoft.AspNetCore.Mvc;
using Twilio;
using Twilio.Rest.Api.V2010.Account;

namespace hospital_management_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationController : ControllerBase
    {

        [HttpGet]
        public void Get()
        {
            string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
            string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");


            TwilioClient.Init(accountSid, authToken);
            string body = string.Format(
                "CONFIRMED {0} appointment for {1} with {2} at {3}. For details: {4}",
                "John's",
                "1st mar 12:35PM",
                "Dr. Divya",
                "Ortho Clinic",
                "https://www.google.co.in"
                );

            var message = MessageResource.Create(
                from: new Twilio.Types.PhoneNumber("+13213213212"),
                body: body,
                to: new Twilio.Types.PhoneNumber("+917312345678")
            );

            Console.WriteLine(message.Sid);
        }
    }
}