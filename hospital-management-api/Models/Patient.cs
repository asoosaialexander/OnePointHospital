using System;

namespace hospital_management_api.Models
{
    public class Patient : Person
    {
        public DateTime DateOfBirth { get; set; }
    }
}