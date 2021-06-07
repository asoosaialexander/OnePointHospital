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
    [Route("api/logs")]
    [ApiController]
    public class LoggingController : ControllerBase
    {
        private readonly HospitalManagementContext _context;

        public LoggingController(HospitalManagementContext context)
        {
            _context = context;
        }



        // POST: api/Logging
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult> PostLog(NGXLogInterface log)
        {
            _context.Log.Add(log);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
