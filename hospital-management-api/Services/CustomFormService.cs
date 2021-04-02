using hospital_management_api.Models.MongoDB;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace hospital_management_api.Services
{
    public class CustomFormService
    {
        private readonly IMongoCollection<CustomForm> _customForm;

        public CustomFormService(IOnePointHospitalDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _customForm = database.GetCollection<CustomForm>(settings.CustomFormCollectionName);
        }

        public List<CustomForm> Get() =>
            _customForm.Find(form => true).ToList();

        public CustomForm Get(string id) =>
            _customForm.Find<CustomForm>(form => form.Id == id).FirstOrDefault();

        public CustomForm Create(CustomForm form)
        {
            _customForm.InsertOne(form);
            return form;
        }

        public void Update(string id, CustomForm formIn) =>
            _customForm.ReplaceOne(form => form.Id == id, formIn);

        public void Remove(CustomForm formIn) =>
            _customForm.DeleteOne(form => form.Id == formIn.Id);

        public void Remove(string id) =>
            _customForm.DeleteOne(form => form.Id == id);
    }


}
