using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace hospital_management_api.Models.MongoDB
{
    public class CustomForm
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public bool Active { get; set; }
        //[BsonElement("name")]
        public string Name { get; set; }
        public string Type { get; set; }
        public int Columns { get; set; }
        public bool AlwaysInclude { get; set; }

        public List<Field> Fields { get; set; }
    }
}
