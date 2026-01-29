using System;
using System.Collections.Generic;

namespace TravelItineraryAPI.Models;

public partial class Attraction
{
    public int AttractionId { get; set; }

    public string AttractionName { get; set; } = null!;

    public int PlaceId { get; set; }

    public string? Description { get; set; }

    public string? BestTimeToVisit { get; set; }

    public virtual Place Place { get; set; } = null!;
}
