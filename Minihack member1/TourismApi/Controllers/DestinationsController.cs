using Microsoft.AspNetCore.Mvc;
using TourismApi.Data;
using TourismApi.DTOs;
using TourismApi.Models;

namespace TourismApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DestinationsController : ControllerBase
    {
        private readonly IDestinationService _destinationService;

        public DestinationsController(IDestinationService destinationService)
        {
            _destinationService = destinationService;
        }

        // GET: api/destinations
        [HttpGet]
        public async Task<ActionResult<List<Destination>>> GetAll()
        {
            var destinations = await _destinationService.GetAllAsync();
            return Ok(destinations);
        }

        // GET: api/destinations/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Destination>> GetById(string id)
        {
            var destination = await _destinationService.GetByIdAsync(id);

            if (destination is null)
                return NotFound(new { message = "Destination not found" });

            return Ok(destination);
        }

        // POST: api/destinations
        [HttpPost]
        public async Task<ActionResult<Destination>> Create(CreateDestinationDto dto)
        {
            var destination = new Destination
            {
                Name = dto.Name,
                Location = dto.Location,
                Category = dto.Category,
                Description = dto.Description,
                ImageUrl = dto.ImageUrl
            };

            await _destinationService.CreateAsync(destination);
            return CreatedAtAction(nameof(GetById), new { id = destination.Id }, destination);
        }

        // PUT: api/destinations/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, CreateDestinationDto dto)
        {
            var existing = await _destinationService.GetByIdAsync(id);
            if (existing is null)
                return NotFound(new { message = "Destination not found" });

            existing.Name = dto.Name;
            existing.Location = dto.Location;
            existing.Category = dto.Category;
            existing.Description = dto.Description;
            existing.ImageUrl = dto.ImageUrl;

            await _destinationService.UpdateAsync(id, existing);
            return NoContent();
        }

        // DELETE: api/destinations/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var existing = await _destinationService.GetByIdAsync(id);
            if (existing is null)
                return NotFound(new { message = "Destination not found" });

            await _destinationService.DeleteAsync(id);
            return NoContent();
        }
    }
}