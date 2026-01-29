using System;
using System.Collections.Generic;

namespace TravelItineraryAPI.Models;

public partial class TripActivity
{
    public int ActivityId { get; set; }

    public int TripDayId { get; set; }

    public string TimeSlot { get; set; } = null!;

    public string ActivityName { get; set; } = null!;

    public virtual TripDay TripDay { get; set; } = null!;
}
