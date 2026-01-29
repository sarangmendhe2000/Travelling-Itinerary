using Microsoft.AspNetCore.Mvc;
using TravelItineraryAPI.Models;

namespace TravelItineraryAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AttractionsController : ControllerBase
    {
        private readonly TravelItineraryDbContext _context;

        public AttractionsController(TravelItineraryDbContext context)
        {
            _context = context;
        }

        [HttpGet("{placeId}")]
        public IActionResult GetAttractionsByPlace(int placeId)
        {
            var attractions = _context.Attractions
                .Where(a => a.PlaceId == placeId)
                .ToList();

            return Ok(attractions);
        }
    }
}
