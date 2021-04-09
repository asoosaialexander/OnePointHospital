using System;
using System.Collections.Generic;

namespace hospital_management_api.Models
{
    public class Doctor : Person
    {
        public int MedicalId { get; set; }
        public string Speciality { get; set; }
        public int ConsultationFee { get; set; }
        public List<string> Memberships { get; set; }
        public List<string> ServicesProvided { get; set; }
        public Hospital Hospital { get; set; }
    }
}
