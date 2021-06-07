using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace hospital_management_api.Models
{
    public class NGXLogInterface
    {
        public int Id { get; set; }
        public NgxLoggerLevel Level { get; set; }
        public string Timestamp { get; set; }
        public string FileName { get; set; }
        public string LineNumber { get; set; }
        public string Message { get; set; }
    }

    public enum NgxLoggerLevel
    {
        TRACE = 0,
        DEBUG = 1,
        INFO = 2,
        LOG = 3,
        WARN = 4,
        ERROR = 5,
        FATAL = 6,
        OFF = 7
    }
}
