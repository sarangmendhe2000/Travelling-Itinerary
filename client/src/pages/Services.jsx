import React from "react";
import "./Service.css";

function Service() {
  return (
    <>
      {/* SERVICE HERO */}
      <div className="service-hero">
        <h1 className="service-title">Service</h1>
      </div>

      {/* RECENT TRIPS */}
      <div className="section">
        <div className="container">
          <h2>Recent Trips</h2>
          <p className="subtitle">
            Discover colorful landscapes, peaceful nature and unforgettable
            journeys crafted just for you.
          </p>

          <div className="cards">
            <div className="card">
              <img src="https://images.unsplash.com/photo-1548013146-72479768bada" />
              <h3>Rajasthan</h3>
              <p>Royal forts and golden deserts.</p>
            </div>

            <div className="card">
              <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e" />
              <h3>Goa</h3>
              <p>Blue beaches and colorful sunsets.</p>
            </div>

            <div className="card">
              <img src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944" />
              <h3>Kerala</h3>
              <p>Green backwaters and calm nature.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Service;
