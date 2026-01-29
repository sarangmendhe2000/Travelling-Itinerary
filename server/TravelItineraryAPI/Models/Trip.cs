using System;
using System.Collections.Generic;

namespace TravelItineraryAPI.Models;

public partial class Trip
{
    public int TripId { get; set; }

    public int UserId { get; set; }

    public int DestinationStateId { get; set; }

    public DateOnly? StartDate { get; set; }

    public DateOnly? EndDate { get; set; }

    public int? Travelers { get; set; }

    public decimal? Budget { get; set; }

    public string? HotelType { get; set; }

    public string? TransportMode { get; set; }

    public string? BudgetRange { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual State DestinationState { get; set; } = null!;

    public virtual ICollection<TripDay> TripDays { get; set; } = new List<TripDay>();

    public virtual User User { get; set; } = null!;
}
