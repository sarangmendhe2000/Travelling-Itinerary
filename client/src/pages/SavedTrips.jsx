import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SavedTrips.css";

function SavedTrips() {

  const navigate = useNavigate();

  const [trips, setTrips] = useState(() => {
    const storedTrips = localStorage.getItem("myTrips");
    return storedTrips ? JSON.parse(storedTrips) : [];
  });

  // ✅ DELETE TRIP
  const deleteTrip = (id, e) => {
    e.stopPropagation();   // prevent opening card

    const updatedTrips = trips.filter(trip => trip.id !== id);

    setTrips(updatedTrips);
    localStorage.setItem("myTrips", JSON.stringify(updatedTrips));
  };

  return (
    <div className="saved-wrapper">

      <h2 className="saved-title">🧳 My Saved Trips</h2>

      {trips.length === 0 && (
        <p className="empty-text">No trips saved yet.</p>
      )}

      <div className="saved-grid">

        {trips.map((trip) => (

          <div
            key={trip.id}
            className="trip-card"
            onClick={() => navigate(`/my-trips/${trip.id}`)}
          >

            {/* DELETE BUTTON */}
            <span
              className="delete-btn"
              onClick={(e) => deleteTrip(trip.id, e)}
            >
              ❌
            </span>

            <h5>{trip.tripData.places.join(", ")}</h5>

            <p>📅 {trip.tripData.startDate} → {trip.tripData.endDate}</p>

            <p>👥 Travellers: {trip.tripData.travellers.length}</p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default SavedTrips;
