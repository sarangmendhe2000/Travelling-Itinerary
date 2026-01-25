import React from "react";

function Review({ tripData }) {

  return (
    <div>

      <h4 className="mb-4">Review Your Trip</h4>

      {/* Destination */}
      <div className="mb-3">
        <h5>Destination</h5>
        <p><b>Country:</b> {tripData.country}</p>
        <p><b>Places:</b> {tripData.places.join(", ")}</p>
      </div>

      {/* Dates */}
      <div className="mb-3">
        <h5>Dates</h5>
        <p>{tripData.startDate} to {tripData.endDate}</p>
      </div>

      {/* Travellers */}
      <div className="mb-3">
        <h5>Travellers</h5>
        <ul>
          {tripData.travellers.map((t, index) => (
            <li key={index}>
              {t.name} - {t.age} yrs - {t.gender}
            </li>
          ))}
        </ul>
      </div>

      {/* Preferences */}
      <div className="mb-3">
        <h5>Preferences</h5>
        <p><b>Hotel Type:</b> {tripData.hotelType}</p>
        <p><b>Transport:</b> {tripData.transport.join(", ")}</p>
        <p><b>Budget Range:</b> {tripData.budgetRange}</p>
      </div>

      <div className="alert alert-info">
        Click Next to generate itinerary
      </div>

    </div>
  );
}

export default Review;
