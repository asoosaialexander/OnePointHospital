using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace hospital_management_api.Models
{
    public class CustomForm
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public int Columns { get; set; }
        public bool AlwaysInclude { get; set; }

        public List<Question> Fields { get; set; }
    }
}
