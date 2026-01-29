import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SavedTrips.css";

function SavedTrips() {

  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);

  // -------- LOAD TRIPS ----------
  useEffect(() => {

    const loadTrips = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://localhost:5223/api/Trips/my",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setTrips(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    loadTrips();

  }, []);

  // -------- DELETE TRIP ----------
  const deleteTrip = async (id, e) => {
    e.stopPropagation();

    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5223/api/Trips/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTrips(prev => prev.filter(t => t.tripId !== id));

    } catch (err) {
      console.log(err);
    }
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
            key={trip.tripId}
            className="trip-card"
            onClick={() => navigate(`/my-trips/${trip.tripId}`)}
          >

            {/* DELETE BUTTON */}
            <span
              className="delete-btn"
              onClick={(e) => deleteTrip(trip.tripId, e)}
            >
              ❌
            </span>

            <h5>Trip #{trip.tripId}</h5>

            <p>📅 {trip.startDate} → {trip.endDate}</p>

            <p>🏨 {trip.hotelType}</p>

            <p>💰 {trip.budgetRange}</p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default SavedTrips;
