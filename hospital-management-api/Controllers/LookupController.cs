using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using hospital_management_api.Data;
using hospital_management_api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace hospital_management_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LookupController : ControllerBase
    {
        private readonly HospitalManagementContext _context;

        public LookupController(HospitalManagementContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<LookupType> GetLookupTypes()
        {
            return _context.LookupType.ToList();
        }

        // GET api/<LookupController>/5
        [HttpGet("{id}")]
        public IEnumerable<Lookup> GetLookupById(int id)
        {
            return _context.Lookup.Where(item => item.TypeId == id).ToList();
        }

        // POST api/<LookupController>
        [HttpPost]
        public void Post([FromBody] Lookup entry)
        {
            _context.Lookup.Add(entry);
            _context.SaveChanges();
        }

        // PUT api/<LookupController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Lookup entry)
        {
            if (id == entry.Id)
            {
                _context.Entry(entry).State = EntityState.Modified;
                _context.SaveChanges();
            }
        }

        // DELETE api/<LookupController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var entry = _context.Lookup.Find(id);
            if (entry != null)
            {
                _context.Lookup.Remove(entry);
                _context.SaveChanges();
            }
        }
    }
}
