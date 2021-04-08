using System;

namespace hospital_management_api.Models
{
    public abstract class Person
    {
        int Id { get; set; }
        string FirstName { get; set; }
        string LastName { get; set; }
        string Gender { get; set; }
    }
}