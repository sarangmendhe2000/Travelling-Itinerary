using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace TravelItineraryAPI.Models;

public partial class TravelItineraryDbContext : DbContext
{
    public TravelItineraryDbContext()
    {
    }

    public TravelItineraryDbContext(DbContextOptions<TravelItineraryDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Attraction> Attractions { get; set; }

    public virtual DbSet<Country> Countries { get; set; }

    public virtual DbSet<Place> Places { get; set; }

    public virtual DbSet<State> States { get; set; }

    public virtual DbSet<Trip> Trips { get; set; }

    public virtual DbSet<TripActivity> TripActivities { get; set; }

    public virtual DbSet<TripDay> TripDays { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=DESKTOP-HP22E34\\SQLEXPRESS;Database=TravelItineraryDB;Trusted_Connection=True;TrustServerCertificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Attraction>(entity =>
        {
            entity.HasKey(e => e.AttractionId).HasName("PK__Attracti__DAE24D5A9E67BA55");

            entity.Property(e => e.AttractionName).HasMaxLength(150);
            entity.Property(e => e.BestTimeToVisit).HasMaxLength(100);
            entity.Property(e => e.Description).HasMaxLength(500);

            entity.HasOne(d => d.Place).WithMany(p => p.Attractions)
                .HasForeignKey(d => d.PlaceId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Attractio__Place__5535A963");
        });

        modelBuilder.Entity<Country>(entity =>
        {
            entity.HasKey(e => e.CountryId).HasName("PK__Countrie__10D1609FAE7D3CBC");

            entity.Property(e => e.CountryName).HasMaxLength(100);
        });

        modelBuilder.Entity<Place>(entity =>
        {
            entity.HasKey(e => e.PlaceId).HasName("PK__Places__D5222B6E26B680A0");

            entity.Property(e => e.Description).HasMaxLength(500);
            entity.Property(e => e.PlaceName).HasMaxLength(100);

            entity.HasOne(d => d.State).WithMany(p => p.Places)
                .HasForeignKey(d => d.StateId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Places__StateId__52593CB8");
        });

        modelBuilder.Entity<State>(entity =>
        {
            entity.HasKey(e => e.StateId).HasName("PK__States__C3BA3B3A6B055799");

            entity.Property(e => e.StateName).HasMaxLength(100);

            entity.HasOne(d => d.Country).WithMany(p => p.States)
                .HasForeignKey(d => d.CountryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__States__CountryI__4F7CD00D");
        });

        modelBuilder.Entity<Trip>(entity =>
        {
            entity.HasKey(e => e.TripId).HasName("PK__Trips__51DC713EDCA38ECD");

            entity.Property(e => e.Budget).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.BudgetRange).HasMaxLength(50);
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.HotelType).HasMaxLength(50);
            entity.Property(e => e.TransportMode).HasMaxLength(50);

            entity.HasOne(d => d.DestinationState).WithMany(p => p.Trips)
                .HasForeignKey(d => d.DestinationStateId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Trips__Destinati__59FA5E80");

            entity.HasOne(d => d.User).WithMany(p => p.Trips)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Trips__UserId__59063A47");
        });

        modelBuilder.Entity<TripActivity>(entity =>
        {
            entity.HasKey(e => e.ActivityId).HasName("PK__TripActi__45F4A791AFE90C3A");

            entity.Property(e => e.ActivityName).HasMaxLength(150);
            entity.Property(e => e.TimeSlot).HasMaxLength(20);

            entity.HasOne(d => d.TripDay).WithMany(p => p.TripActivities)
                .HasForeignKey(d => d.TripDayId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__TripActiv__TripD__5FB337D6");
        });

        modelBuilder.Entity<TripDay>(entity =>
        {
            entity.HasKey(e => e.TripDayId).HasName("PK__TripDays__4F31B7A57D9EE4B6");

            entity.HasOne(d => d.Trip).WithMany(p => p.TripDays)
                .HasForeignKey(d => d.TripId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__TripDays__TripId__5CD6CB2B");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__Users__1788CC4CE0167B19");

            entity.HasIndex(e => e.Email, "UQ__Users__A9D105346E668EC3").IsUnique();

            entity.Property(e => e.Address).HasMaxLength(300);
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Dob).HasColumnName("DOB");
            entity.Property(e => e.Email).HasMaxLength(150);
            entity.Property(e => e.EmergencyName).HasMaxLength(100);
            entity.Property(e => e.EmergencyPhone).HasMaxLength(20);
            entity.Property(e => e.FullName).HasMaxLength(100);
            entity.Property(e => e.Gender).HasMaxLength(20);
            entity.Property(e => e.PasswordHash).HasMaxLength(255);
            entity.Property(e => e.Phone).HasMaxLength(20);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
