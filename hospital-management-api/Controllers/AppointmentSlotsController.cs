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
    public class AppointmentSlotsController : ControllerBase
    {
        private readonly HospitalManagementContext _context;

        public AppointmentSlotsController(HospitalManagementContext context)
        {
            _context = context;
        }

        // GET: api/AppointmentSlots/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AppointmentSlot>> GetAppointmentSlot(int id)
        {
            var appointmentSlot = await _context.AppointmentSlot.FindAsync(id);

            if (appointmentSlot == null)
            {
                return NotFound();
            }

            return appointmentSlot;
        }

        [HttpGet]
        [Route("GetDoctorSlotsByDate")]
        public async Task<ActionResult<List<AppointmentSlot>>> GetAppointmentSlot(int doctorId, DateTime date)
        {
            var appointmentSlots = await _context.AppointmentSlot.ToListAsync();

            return appointmentSlots.Where(x => x.DoctorId == doctorId && x.Day == date.DayOfWeek.ToString()).ToList();
        }

        [HttpPost]
        public async Task<ActionResult<AppointmentSlot>> PostAppointmentSlot(AppointmentSlot appointmentSlot)
        {
            _context.AppointmentSlot.Add(appointmentSlot);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAppointmentSlot", new { id = appointmentSlot.Id }, appointmentSlot);
        }

        [HttpPost]
        [Route("CancelAppointmentSlot")]
        public void CancelAppointmentSlot(int doctorId, DateTime date, string time = "")
        {
            var slots = _context.AppointmentSlot.ToList();
            List<AppointmentSlot> cancellationSlots;
            if (time == "")
            {
                cancellationSlots = slots.Where(x => x.DoctorId == doctorId && x.Day == date.DayOfWeek.ToString()).ToList();
                foreach (var slot in cancellationSlots)
                {
                    _context.AppointmentSlotCancelled.Add(new AppointmentSlotCancelled()
                    {
                        Date = date,
                        AppointmentSlot = slot
                    });
                }
                _context.SaveChanges();
            }
            else
            {
                var cancellationSlot = slots.Where(x => x.DoctorId == doctorId &&
                    x.Day == date.DayOfWeek.ToString() &&
                    x.Time == time).FirstOrDefault();
                _context.AppointmentSlotCancelled.Add(new AppointmentSlotCancelled()
                {
                    Date = date,
                    AppointmentSlot = cancellationSlot
                });
                _context.SaveChanges();
            }
        }

        // DELETE: api/AppointmentSlots/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<AppointmentSlot>> DeleteAppointmentSlot(int id)
        {
            var appointmentSlot = await _context.AppointmentSlot.FindAsync(id);
            if (appointmentSlot == null)
            {
                return NotFound();
            }

            _context.AppointmentSlot.Remove(appointmentSlot);
            await _context.SaveChangesAsync();

            return appointmentSlot;
        }

        private bool AppointmentSlotExists(int id)
        {
            return _context.AppointmentSlot.Any(e => e.Id == id);
        }
    }
}
