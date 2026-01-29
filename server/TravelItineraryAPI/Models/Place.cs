using System;
using System.Collections.Generic;

namespace TravelItineraryAPI.Models;

public partial class Place
{
    public int PlaceId { get; set; }

    public string PlaceName { get; set; } = null!;

    public int StateId { get; set; }

    public string? Description { get; set; }

    public virtual ICollection<Attraction> Attractions { get; set; } = new List<Attraction>();

    public virtual State State { get; set; } = null!;
}
