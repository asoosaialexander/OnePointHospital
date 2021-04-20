using System;
using hospital_management_api.Data;
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
        private readonly HospitalManagementContext _context;

        public NotificationController(HospitalManagementContext context)
        {
            _context = context;
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


                string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID", EnvironmentVariableTarget.User);
                string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN", EnvironmentVariableTarget.User);
                string fromNumber = Environment.GetEnvironmentVariable("TWILIO_PHONE_NO", EnvironmentVariableTarget.User);
                var appointmentDate = appointment.AppointmentTime;

                TwilioClient.Init(accountSid, authToken);

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
                    from: new Twilio.Types.PhoneNumber(fromNumber),
                    body: body,
                    to: new Twilio.Types.PhoneNumber(patient.ContactNumber)
                );

                Console.WriteLine(message.Sid);
            }
        }
    }
}