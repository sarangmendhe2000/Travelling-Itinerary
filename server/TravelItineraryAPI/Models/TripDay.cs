using System;
using System.Collections.Generic;

namespace TravelItineraryAPI.Models;

public partial class TripDay
{
    public int TripDayId { get; set; }

    public int TripId { get; set; }

    public int DayNumber { get; set; }

    public virtual Trip Trip { get; set; } = null!;

    public virtual ICollection<TripActivity> TripActivities { get; set; } = new List<TripActivity>();
}
