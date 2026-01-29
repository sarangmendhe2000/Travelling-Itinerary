using Microsoft.AspNetCore.Mvc;
using TravelItineraryAPI.Models;

namespace TravelItineraryAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StatesController : ControllerBase
    {
        private readonly TravelItineraryDbContext _context;

        public StatesController(TravelItineraryDbContext context)
        {
            _context = context;
        }

        [HttpGet("{countryId}")]
        public IActionResult GetStatesByCountry(int countryId)
        {
            var states = _context.States
                .Where(s => s.CountryId == countryId)
                .ToList();

            return Ok(states);
        }
    }
}
