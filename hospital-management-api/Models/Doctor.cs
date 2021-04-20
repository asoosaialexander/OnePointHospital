using System;
using System.Collections.Generic;

namespace hospital_management_api.Models
{
    public class Doctor
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Speciality { get; set; }
        public int ConsultationFee { get; set; }
        public int MedicalId { get; set; }
    }
}
