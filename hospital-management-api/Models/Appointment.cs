using System;

namespace hospital_management_api.Models
{
    public class Appointment
    {
        public int Id { get; set; }
        public DateTime CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public Patient Patient { get; set; }
        public Doctor Doctor { get; set; }
        public Hospital Hospital { get; set; }
        public DateTime AppointmentTime { get; set; }
        public string AppointmentType { get; set; }
        public float FullPrice { get; set; }
        public float Discount { get; set; }
        public float FinalPrice { get; set; }
        public bool IsCancelled { get; set; }
        public string CancellationReason { get; set; }
    }
}