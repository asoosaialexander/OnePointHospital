using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using hospital_management_api.Data;
using hospital_management_api.Models;

namespace hospital_management_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomFormController : ControllerBase
    {
        private readonly HospitalManagementContext _context;

        public CustomFormController(HospitalManagementContext context)
        {
            _context = context;
        }

        // GET: api/CustomForm
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomForm>>> GetCustomForms()
        {
            return await _context.CustomForms.ToListAsync();
        }

        // GET: api/CustomForm/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CustomForm>> GetCustomForm(int id)
        {
            var customForm = await _context.CustomForms.FindAsync(id);

            if (customForm == null)
            {
                return NotFound();
            }

            customForm.Fields = await _context.Question.Where(q => q.CustomFormId == id).ToListAsync();
            return customForm;
        }

        // PUT: api/CustomForm/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCustomForm(int id, CustomForm customForm)
        {
            if (id != customForm.Id)
            {
                return BadRequest();
            }

            _context.Entry(customForm).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomFormExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/CustomForm
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<CustomForm>> PostCustomForm(CustomForm customForm)
        {
            _context.CustomForms.Add(customForm);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCustomForm", new { id = customForm.Id }, customForm);
        }

        // DELETE: api/CustomForm/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<CustomForm>> DeleteCustomForm(int id)
        {
            var customForm = await _context.CustomForms.FindAsync(id);
            if (customForm == null)
            {
                return NotFound();
            }

            _context.CustomForms.Remove(customForm);
            await _context.SaveChangesAsync();

            return customForm;
        }

        private bool CustomFormExists(int id)
        {
            return _context.CustomForms.Any(e => e.Id == id);
        }
    }
}
