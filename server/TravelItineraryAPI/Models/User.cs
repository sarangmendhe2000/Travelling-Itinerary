using System;
using System.Collections.Generic;

namespace TravelItineraryAPI.Models;

public partial class User
{
    public int UserId { get; set; }

    public string FullName { get; set; } = null!;

    public DateTime Dob { get; set; }


    public string Gender { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Phone { get; set; } = null!;

    public string PasswordHash { get; set; } = null!;

    public string? Address { get; set; }

    public string? EmergencyName { get; set; }

    public string? EmergencyPhone { get; set; }

    public DateTime? CreatedAt { get; set; }

    public string? ResetOtp { get; set; }
    public DateTime? ResetOtpExpiry { get; set; }

    public virtual ICollection<Trip> Trips { get; set; } = new List<Trip>();
}
