using System;
using System.Collections.Generic;

namespace hospital_management_api.Models
{
    public class Doctor
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Gender { get; set; }
        public string Speciality { get; set; }
        public int ConsultationFee { get; set; }
        public List<string> Memberships { get; set; }
        public List<Service> ServicesProvided { get; set; }
        public Hospital Hospital { get; set; }
        public int MedicalId { get; set; }
    }
}
