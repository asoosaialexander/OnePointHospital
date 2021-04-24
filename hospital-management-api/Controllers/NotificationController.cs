using System;
using hospital_management_api.Data;
using hospital_management_api.Models;
using Microsoft.AspNetCore.Mvc;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using Twilio.Rest.Verify.V2.Service;

namespace hospital_management_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationController : ControllerBase
    {
        private readonly HospitalManagementContext _context;
        private readonly string AccountSid;
        private readonly string AuthToken;
        private readonly string FromNumber;
        private readonly string VerificationSid;

        public NotificationController(HospitalManagementContext context)
        {
            _context = context;
            AccountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID", EnvironmentVariableTarget.User);
            AuthToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN", EnvironmentVariableTarget.User);
            FromNumber = Environment.GetEnvironmentVariable("TWILIO_PHONE_NO", EnvironmentVariableTarget.User);
            VerificationSid = "VA551fc3fcd3d48d8ff9f9b6a92301faf4";
        }

        [HttpPost]
        public void NotifyAppointmentConfirmation(Appointment appointment)
        {
            var patient = _context.Patient.Find(appointment.PatientId);
            if (patient.ContactNumber != string.Empty)
            {
                var doctor = _context.Doctor.Find(appointment.DoctorId);
                var hospital = "Virtual";
                if (appointment.HospitalId != 0)
                {
                    hospital = _context.Hospital.Find(appointment.HospitalId)?.Name;
                }

                var appointmentDate = appointment.AppointmentTime;

                TwilioClient.Init(AccountSid, AuthToken);

                string patientName = string.Format($"{patient.FirstName} {patient.LastName}'s");
                string doctorName = string.Format($"Dr. {doctor.FirstName} {doctor.LastName}");
                string date = string.Format("{0} {1} {2}",
                    appointmentDate.Day.WithOrdinal(),
                    appointmentDate.ToString("MMM"),
                    appointmentDate.ToString("hh:mmtt")
                    );

                string body = string.Format(
                    "CONFIRMED {0} appointment for {1} with {2} at {3}.",
                    patientName,
                    date,
                    doctorName,
                    hospital
                    );

                var message = MessageResource.Create(
                    from: new Twilio.Types.PhoneNumber(FromNumber),
                    body: body,
                    to: new Twilio.Types.PhoneNumber(patient.ContactNumber)
                );

                Console.WriteLine(message.Sid);
            }
        }

        [HttpPost]
        [Route("sentOTP")]
        public IActionResult sentOTP(string phoneNumber)
        {
            TwilioClient.Init(AccountSid, AuthToken);
            try
            {
                var verification = VerificationResource.Create(
                    to: phoneNumber,
                    channel: "sms",
                    pathServiceSid: VerificationSid
                );

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost]
        [Route("verifyOTP")]
        public IActionResult VerifyOTP(string phoneNumber, string code)
        {
            TwilioClient.Init(AccountSid, AuthToken);

            try
            {
                var verificationCheck = VerificationCheckResource.Create(
                    to: phoneNumber,
                    code: code,
                    pathServiceSid: VerificationSid
                );
                return Ok(verificationCheck.Status);
            }
            catch (Exception ex)
            {
                // 404 Verification / VerificationCheck resource not found
                // Twilio deletes the verification SID once:
                // 1. it expires
                // 2. it's approved
                // 3. the max attempts to check a code have been reached
                return NotFound(new { message = ex.Message });
            }
        }
    }
}