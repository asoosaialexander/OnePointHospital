using System;

namespace hospital_management_api.Models
{
    public class AppointmentDetails
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string PatientName { get; set; }
        public string AppointmentType { get; set; }
        public string Location { get; set; }
        public string DoctorName { get; set; }
        public string DoctorSpeciality { get; set; }
        public int ConsultationFee { get; set; }
        public string Status { get; set; }

    }
}