
using System.Collections.Generic;

namespace hospital_management_api.Models
{
    public class Question
    {
        public int Id { get; set; }
        public string Value { get; set; }
        public string Key { get; set; }
        public string Label { get; set; }
        public bool Required { get; set; }
        public int Order { get; set; }
        public string ControlType { get; set; }
        public string Type { get; set; }
        public int Colspan { get; set; }
        public int CustomFormId { get; set; }
        public List<Option> Options { get; set; }
    }

    public class Option
    {
        public int Id { get; set; }
        public int QuestionId { get; set; }
        public string Key { get; set; }
        public string Value { get; set; }
    }
}