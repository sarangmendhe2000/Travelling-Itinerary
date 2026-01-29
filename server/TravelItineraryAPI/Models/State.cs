using System;
using System.Collections.Generic;

namespace TravelItineraryAPI.Models;

public partial class State
{
    public int StateId { get; set; }

    public string StateName { get; set; } = null!;

    public int CountryId { get; set; }

    public virtual Country Country { get; set; } = null!;

    public virtual ICollection<Place> Places { get; set; } = new List<Place>();

    public virtual ICollection<Trip> Trips { get; set; } = new List<Trip>();
}
