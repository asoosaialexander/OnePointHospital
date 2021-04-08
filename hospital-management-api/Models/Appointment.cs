using System;

namespace hospital_management_api.Models
{
    public class Appointment
    {
        public int Id { get; set; }
        public Patient Patient { get; set; }
        public Doctor Doctor { get; set; }
        public DateTime AppointmentTime { get; set; }
        public string AppointmentType { get; set; }
    }
}