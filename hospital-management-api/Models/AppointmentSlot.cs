using System;

namespace hospital_management_api.Models
{
    public class AppointmentSlot
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public int DoctorId { get; set; }
        public int HospitalId { get; set; }
        public string Day { get; set; }
        public string Time { get; set; }
        public int NoOfSlots { get; set; }
    }

    public class AppointmentSlotCancelled
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public AppointmentSlot AppointmentSlot { get; set; }
    }
}
