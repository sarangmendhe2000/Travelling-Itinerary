using Microsoft.AspNetCore.Mvc;
using TravelItineraryAPI.Models;

namespace TravelItineraryAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PlacesController : ControllerBase
    {
        private readonly TravelItineraryDbContext _context;

        public PlacesController(TravelItineraryDbContext context)
        {
            _context = context;
        }

        [HttpGet("{stateId}")]
        public IActionResult GetPlacesByState(int stateId)
        {
            var places = _context.Places
                .Where(p => p.StateId == stateId)
                .ToList();

            return Ok(places);
        }
    }
}
