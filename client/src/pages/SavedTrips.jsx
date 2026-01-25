import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SavedTrips() {

  const navigate = useNavigate();

  const [trips] = useState(() => {
    const storedTrips = localStorage.getItem("myTrips");
    return storedTrips ? JSON.parse(storedTrips) : [];
  });

  return (
    <div className="container mt-5">

      <h2 className="mb-4">My Saved Trips</h2>

      {trips.length === 0 && (
        <p>No trips saved yet.</p>
      )}

      {trips.map((trip) => (

        <div
          key={trip.id}
          className="card mb-3 p-3"
          style={{ cursor: "pointer" }}
          onClick={() => navigate(`/my-trips/${trip.id}`)}
        >

          <h5>
            {trip.tripData.places.join(", ")}
          </h5>

          <p>
            {trip.tripData.startDate} → {trip.tripData.endDate}
          </p>

          <p>
            Travellers: {trip.tripData.travellers.length}
          </p>

        </div>

      ))}

    </div>
  );
}

export default SavedTrips;
