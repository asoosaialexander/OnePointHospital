using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using hospital_management_api.Data;
using hospital_management_api.Models;

namespace hospital_management_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentsController : ControllerBase
    {
        private readonly HospitalManagementContext _context;

        public AppointmentsController(HospitalManagementContext context)
        {
            _context = context;
        }

        // GET: api/Appointments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Appointment>>> GetAppointment()
        {
            return await _context.Appointment.ToListAsync();
        }

        [HttpGet]
        [Route("past")]
        public ActionResult<IEnumerable<AppointmentDetails>> PastAppointments(int patientId = 0)
        {
            var today = DateTime.Now;
            var appointments = _context.Appointment
                .Where(a => a.AppointmentTime.Date < today.Date).ToList();

            if (patientId != 0)
            {
                appointments = appointments.Where(a => a.PatientId == patientId).ToList();
            }

            var details = new List<AppointmentDetails>();
            foreach (var appointment in appointments)
            {
                var doctor = _context.Doctor.Find(appointment.DoctorId);
                var patient = _context.Patient.Find(appointment.PatientId);
                var location = "Virtual";

                if (appointment.HospitalId != 0)
                {
                    location = _context.Hospital.Find(appointment.HospitalId).Name;
                }

                var detail = new AppointmentDetails()
                {
                    Id = appointment.Id,
                    DoctorName = string.Format("Dr. {0} {1}", doctor.FirstName, doctor.LastName),
                    DoctorSpeciality = doctor.Speciality,
                    ConsultationFee = doctor.ConsultationFee,
                    PatientName = string.Format("{0} {1}", patient.FirstName, patient.LastName),
                    AppointmentType = appointment.AppointmentType,
                    Location = location,
                    Status = appointment.Status,
                    Date = appointment.AppointmentTime
                };

                details.Add(detail);
            }

            return Ok(details);
        }

        [HttpGet]
        [Route("today")]
        public ActionResult<IEnumerable<AppointmentDetails>> TodayAppointments(int doctorId = 0)
        {
            var today = DateTime.Now;
            var appointments = _context.Appointment
                .Where(a => a.AppointmentTime.Date == today.Date).ToList();

            if (doctorId != 0)
            {
                appointments = appointments.Where(a => a.DoctorId == doctorId).ToList();
            }

            var details = new List<AppointmentDetails>();
            foreach (var appointment in appointments)
            {
                var doctor = _context.Doctor.Find(appointment.DoctorId);
                var patient = _context.Patient.Find(appointment.PatientId);
                var location = "Virtual";

                if (appointment.HospitalId != 0)
                {
                    location = _context.Hospital.Find(appointment.HospitalId).Name;
                }

                var detail = new AppointmentDetails()
                {
                    Id = appointment.Id,
                    DoctorName = string.Format("Dr. {0} {1}", doctor.FirstName, doctor.LastName),
                    PatientName = string.Format("{0} {1}", patient.FirstName, patient.LastName),
                    AppointmentType = appointment.AppointmentType,
                    Location = location,
                    Status = appointment.Status,
                    Date = appointment.AppointmentTime
                };

                details.Add(detail);
            }

            return Ok(details);
        }

        [HttpGet]
        [Route("thisWeek")]
        public ActionResult<IEnumerable<AppointmentDetails>> WeekAppointments(int doctorId = 0)
        {
            var today = DateTime.Now;
            var dayOfWeek = (int)today.DayOfWeek;

            var appointments = _context.Appointment
                .Where(a => a.AppointmentTime.Date >= today.Date.AddDays(-dayOfWeek) &&
                a.AppointmentTime.Date <= today.Date.AddDays(7 - dayOfWeek)).ToList();

            if (doctorId != 0)
            {
                appointments = appointments.Where(a => a.DoctorId == doctorId).ToList();
            }

            var details = new List<AppointmentDetails>();
            foreach (var appointment in appointments)
            {
                var doctor = _context.Doctor.Find(appointment.DoctorId);
                var patient = _context.Patient.Find(appointment.PatientId);
                var location = "Virtual";

                if (appointment.HospitalId != 0)
                {
                    location = _context.Hospital.Find(appointment.HospitalId).Name;
                }

                var detail = new AppointmentDetails()
                {
                    Id = appointment.Id,
                    DoctorName = string.Format("Dr. {0} {1}", doctor.FirstName, doctor.LastName),
                    PatientName = string.Format("{0} {1}", patient.FirstName, patient.LastName),
                    AppointmentType = appointment.AppointmentType,
                    Location = location,
                    Status = appointment.Status,
                    Date = appointment.AppointmentTime
                };

                details.Add(detail);
            }

            return Ok(details);
        }

        // GET: api/Appointments/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Appointment>> GetAppointment(int id)
        {
            var appointment = await _context.Appointment.FindAsync(id);

            if (appointment == null)
            {
                return NotFound();
            }

            return appointment;
        }


        // PUT: api/Appointments/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAppointment(int id, Appointment appointment)
        {
            if (id != appointment.Id)
            {
                return BadRequest();
            }

            _context.Entry(appointment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AppointmentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpPut]
        [Route("updateStatus/{id}")]
        public async Task<IActionResult> CancelAppointment(int id, string status)
        {
            var appointment = _context.Appointment.Find(id);
            appointment.Status = status;

            _context.Entry(appointment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AppointmentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<Appointment>> PostAppointment(Appointment appointment)
        {
            appointment.Status = "Scheduled";
            _context.Appointment.Add(appointment);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAppointment", new { id = appointment.Id }, appointment);
        }

        // DELETE: api/Appointments/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Appointment>> DeleteAppointment(int id)
        {
            var appointment = await _context.Appointment.FindAsync(id);
            if (appointment == null)
            {
                return NotFound();
            }

            _context.Appointment.Remove(appointment);
            await _context.SaveChangesAsync();

            return appointment;
        }

        private bool AppointmentExists(int id)
        {
            return _context.Appointment.Any(e => e.Id == id);
        }
    }
}
