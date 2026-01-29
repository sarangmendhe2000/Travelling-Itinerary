using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TravelItineraryAPI.Models;

namespace TravelItineraryAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class TripsController : ControllerBase
    {
        private readonly TravelItineraryDbContext _context;

        public TripsController(TravelItineraryDbContext context)
        {
            _context = context;
        }
        [HttpGet("my")]
        public IActionResult GetMyTrips()
        {
            var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier);

            if (userIdClaim == null)
                return Unauthorized();

            int userId = int.Parse(userIdClaim.Value);

            var trips = _context.Trips
                .Where(t => t.UserId == userId)
                .Select(t => new
                {
                    t.TripId,
                    t.StartDate,
                    t.EndDate,
                    t.BudgetRange,
                    t.HotelType
                })
                .ToList();

            return Ok(trips);
        }

        [HttpGet("{id}")]
        public IActionResult GetTripById(int id)
        {
            var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier);

            if (userIdClaim == null)
                return Unauthorized();

            int userId = int.Parse(userIdClaim.Value);

            var trip = _context.Trips
                .Where(t => t.TripId == id && t.UserId == userId)
                .Select(t => new
                {
                    t.TripId,
                    t.StartDate,
                    t.EndDate,
                    t.BudgetRange,
                    t.HotelType,
                    Days = _context.TripDays
                        .Where(d => d.TripId == t.TripId)
                        .Select(d => new
                        {
                            d.DayNumber,
                            Activities = _context.TripActivities
                                .Where(a => a.TripDayId == d.TripDayId)
                                .Select(a => new
                                {
                                    a.TimeSlot,
                                    a.ActivityName
                                }).ToList()
                        }).ToList()
                })
                .FirstOrDefault();

            if (trip == null)
                return NotFound();

            return Ok(trip);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteTrip(int id)
        {
            var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier);

            if (userIdClaim == null)
                return Unauthorized();

            int userId = int.Parse(userIdClaim.Value);

            var trip = _context.Trips
                .FirstOrDefault(t => t.TripId == id && t.UserId == userId);

            if (trip == null)
                return NotFound();

            var days = _context.TripDays.Where(d => d.TripId == id).ToList();

            foreach (var day in days)
            {
                var activities = _context.TripActivities
                    .Where(a => a.TripDayId == day.TripDayId);

                _context.TripActivities.RemoveRange(activities);
            }

            _context.TripDays.RemoveRange(days);
            _context.Trips.Remove(trip);

            _context.SaveChanges();

            return Ok("Trip deleted");
        }



        [HttpPost("save")]
        public IActionResult SaveTrip([FromBody] TripSaveRequest request)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);

            if (userIdClaim == null)
            {
                return Unauthorized();
            }

            int userId = int.Parse(userIdClaim.Value);

            var trip = new Trip
            {
                UserId = userId,
                DestinationStateId = request.StateId,
                StartDate = request.StartDate,
                EndDate = request.EndDate,
                Travelers = request.Travelers,
                Budget = request.Budget,
                HotelType = request.HotelType,
                TransportMode = request.TransportMode,
                BudgetRange = request.BudgetRange
            };

            _context.Trips.Add(trip);
            _context.SaveChanges();

            foreach (var day in request.Itinerary)
            {
                var tripDay = new TripDay
                {
                    TripId = trip.TripId,
                    DayNumber = day.DayNumber
                };

                _context.TripDays.Add(tripDay);
                _context.SaveChanges();

                foreach (var act in day.Activities)
                {
                    var activity = new TripActivity
                    {
                        TripDayId = tripDay.TripDayId,
                        TimeSlot = act.TimeSlot,
                        ActivityName = act.ActivityName
                    };

                    _context.TripActivities.Add(activity);
                }
            }

            _context.SaveChanges();

            return Ok("Trip saved successfully");
        }

    }

    // DTOs
    public class TripSaveRequest
    {
        public int UserId { get; set; }
        public int StateId { get; set; }
        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }
        public int Travelers { get; set; }
        public decimal Budget { get; set; }
        public string HotelType { get; set; }
        public string TransportMode { get; set; }
        public string BudgetRange { get; set; }
        public List<TripDayDto> Itinerary { get; set; }
    }

    public class TripDayDto
    {
        public int DayNumber { get; set; }
        public List<ActivityDto> Activities { get; set; }
    }

    public class ActivityDto
    {
        public string TimeSlot { get; set; }
        public string ActivityName { get; set; }
    }
}
