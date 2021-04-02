using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using hospital_management_api.Data;
using hospital_management_api.Models;
using hospital_management_api.Services;
using hospital_management_api.Models.MongoDB;

namespace hospital_management_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomFormController : ControllerBase
    {
        private readonly CustomFormService _customFormService;

        public CustomFormController(CustomFormService customFormService)
        {
            _customFormService = customFormService;
        }

        [HttpGet]
        public ActionResult<List<CustomForm>> Get() =>
            _customFormService.Get();

        [HttpGet("{id:length(24)}", Name = "GetCustomForm")]
        public ActionResult<CustomForm> Get(string id)
        {
            var customForm = _customFormService.Get(id);

            if (customForm == null)
            {
                return NotFound();
            }

            return customForm;
        }

        [HttpPost]
        public ActionResult<CustomForm> Create(CustomForm customForm)
        {
            _customFormService.Create(customForm);

            return CreatedAtRoute("GetCustomForm", new { id = customForm.Id.ToString() }, customForm);
        }

        [HttpPut("{id:length(24)}")]
        public IActionResult Update(string id, CustomForm customFormIn)
        {
            var customForm = _customFormService.Get(id);

            if (customForm == null)
            {
                return NotFound();
            }

            _customFormService.Update(id, customFormIn);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var customForm = _customFormService.Get(id);

            if (customForm == null)
            {
                return NotFound();
            }

            _customFormService.Remove(customForm.Id);

            return NoContent();
        }
    }
}
