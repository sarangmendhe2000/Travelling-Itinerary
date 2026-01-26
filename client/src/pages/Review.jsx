import React from "react";
import "./Review.css";

function Review({ tripData }) {

  return (
    <div className="review-wrapper">

      <h2 className="review-title">📝 Review Your Trip</h2>
      <p className="review-subtitle">Please verify all details</p>

      {/* Destination */}
      <div className="review-section">
        <h5>📍 Destination</h5>
        <p><b>Country:</b> {tripData.country}</p>
        <p><b>Places:</b> {tripData.places.join(", ")}</p>
      </div>

      {/* Dates */}
      <div className="review-section">
        <h5>📅 Dates</h5>
        <p>{tripData.startDate} to {tripData.endDate}</p>
      </div>

      {/* Travellers */}
      <div className="review-section">
        <h5>👨‍👩‍👧 Travellers</h5>
        {tripData.travellers.map((t, index) => (
          <div key={index} className="review-item">
            {t.name} • {t.age} yrs • {t.gender}
          </div>
        ))}
      </div>

      {/* Preferences */}
      <div className="review-section">
        <h5>⚙ Preferences</h5>
        <p><b>Hotel:</b> {tripData.hotelType}</p>
        <p><b>Transport:</b> {tripData.transport}</p>
        <p><b>Budget Range:</b> {tripData.budgetRange}</p>
      </div>

      {/* Estimated Budget */}
      <div className="estimate-box">
        Estimated Trip Cost: ₹{tripData.estimatedBudget || 0}
      </div>

      <div className="alert alert-info text-center mt-3">
        Click Next to generate itinerary
      </div>

    </div>
  );
}

export default Review;
