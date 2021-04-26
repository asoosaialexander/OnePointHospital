using System;

namespace hospital_management_api.Models
{
    public class Appointment
    {
        public int Id { get; set; }
        public DateTime CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public int PatientId { get; set; }
        public int DoctorId { get; set; }
        public int HospitalId { get; set; }
        public DateTime AppointmentTime { get; set; }
        public string AppointmentType { get; set; }
        public string Status { get; set; }
    }
}