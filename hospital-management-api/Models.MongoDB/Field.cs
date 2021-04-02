using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace hospital_management_api.Models.MongoDB
{
    public class Field
    {
        public string Value { get; set; }
        public string Key { get; set; }
        public string Label { get; set; }
        public bool Required { get; set; }
        public string ControlType { get; set; }
        public string Type { get; set; }
        public List<Option> Options { get; set; }
        public int Order { get; set; }
        public int Colspan { get; set; }
    }
}
