using System;
using System.Collections.Generic;

namespace hospital_management_api.Models
{
    public class Hospital
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public Address Address { get; set; }
        public List<Doctor> Doctors { get; set; }
    }
}