using System;

namespace hospital_management_api.Models
{
    public class Lookup
    {
        public int Id { get; set; }
        public int TypeId { get; set; }
        public string Value { get; set; }
    }

    public class LookupType{
        public int Id { get; set; }
        public string Name { get; set; }
    }
}