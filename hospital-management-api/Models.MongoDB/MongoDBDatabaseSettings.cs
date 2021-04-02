using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace hospital_management_api.Models.MongoDB
{
    public class MongoDBDatabaseSettings : IOnePointHospitalDatabaseSettings
    {
        public string CustomFormCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }

    public interface IOnePointHospitalDatabaseSettings
    {
        string CustomFormCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}
