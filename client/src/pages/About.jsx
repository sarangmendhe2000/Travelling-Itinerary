import React from "react";
import "./About.css";

const About = () => {
  return (
    <>
      {/* HERO SECTION */}
      <section className="about-hero">
      <div className="about-overlay">
        <h1>About</h1>
      </div>
      </section>

      {/* CONTENT SECTION */}
      <section className="about-content">
        <div className="about-box">
          <h2>Our History</h2>
          <p>
            Our travel itinerary platform was created with a simple idea — to
            make travel planning easy, organized, and enjoyable. What started
            as a small initiative to help travelers plan trips efficiently has
            grown into a comprehensive solution that helps users design
            personalized itineraries, manage bookings, and explore destinations
            with confidence. Over time, we have continuously evolved by
            integrating smart planning tools, user-friendly interfaces, and
            real travel insights to meet the changing needs of modern travelers.
          </p>

          <h2>Our Mission</h2>
          <p>
            Our mission is to simplify travel planning by providing a seamless,
            reliable, and personalized itinerary experience. We aim to empower
            travelers to plan smarter trips by offering clear schedules,
            destination insights, and flexible planning options — all in one
            place. Transparency, ease of use, and customer satisfaction remain
            at the core of everything we build.
          </p>

          <h2>Our Vision</h2>
          <p>
            Our vision is to become a trusted global travel companion for every
            traveler. We aspire to redefine how people plan journeys by
            delivering innovative itinerary solutions, inspiring exploration,
            and creating memorable travel experiences. By combining technology
            with a traveler-centric approach, we aim to make every journey
            stress-free and unforgettable.
          </p>
        </div>
      </section>
    </>
  );
};

export default About;
