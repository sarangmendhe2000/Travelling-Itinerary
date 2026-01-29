using Microsoft.AspNetCore.Mvc;
using TravelItineraryAPI.Models;

namespace TravelItineraryAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CountriesController : ControllerBase
    {
        private readonly TravelItineraryDbContext _context;

        public CountriesController(TravelItineraryDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetCountries()
        {
            var countries = _context.Countries.ToList();
            return Ok(countries);
        }
    }
}
