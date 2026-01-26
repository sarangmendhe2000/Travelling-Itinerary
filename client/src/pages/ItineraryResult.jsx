import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ItineraryResult.css";

// Static attraction data
const attractionData = {
  Jaipur: {
    day: ["Amer Fort", "City Palace"],
    evening: ["Hawa Mahal", "Local Market"],
  },
  Pachmarhi: {
    day: ["Bee Falls", "Pandav Caves"],
    evening: ["Sunset Point"],
  },
  Ujjain: {
    day: ["Mahakaleshwar Temple"],
    evening: ["Ram Ghat Aarti"],
  },
  Maheshwar: {
    day: ["Maheshwar Fort"],
    evening: ["Narmada Ghat"],
  },
};

function ItineraryResult({ tripData }) {
  const { id } = useParams();
  const navigate = useNavigate();

  let finalTripData = tripData;

  if ((!finalTripData || !finalTripData.places) && id) {
    const trips = JSON.parse(localStorage.getItem("myTrips")) || [];
    const foundTrip = trips.find((t) => t.id.toString() === id);
    if (foundTrip) {
      finalTripData = foundTrip.tripData;
    }
  }

  if (
    !finalTripData ||
    !finalTripData.places ||
    finalTripData.places.length === 0
  ) {
    return <h3 className="text-center mt-5">Trip not found</h3>;
  }

  const generateItinerary = () => {
    let result = [];

    finalTripData.places.forEach((place, index) => {
      const data = attractionData[place] || {
        day: ["Local Sightseeing"],
        evening: ["Free Time"],
      };

      result.push({
        dayNumber: index + 1,
        city: place,
        dayPlaces: data.day,
        eveningPlaces: data.evening,
      });
    });

    return result;
  };

  const itinerary = generateItinerary();

  const saveTrip = () => {
    let trips = JSON.parse(localStorage.getItem("myTrips")) || [];

    const tripId = new Date().getTime();

    const newTrip = {
      id: tripId,
      tripData: finalTripData,
      itinerary: itinerary,
    };

    trips.push(newTrip);
    localStorage.setItem("myTrips", JSON.stringify(trips));

    alert("Trip saved successfully!");

    navigate(`/recommendation/${finalTripData.state}`);
  };

  return (
    <div className="itinerary-wrapper">
      <h2 className="itinerary-title">🗺 Your Trip Itinerary</h2>
      <p className="itinerary-subtitle">Day wise travel plan</p>

      {itinerary.map((item) => (
        <div key={item.dayNumber} className="day-card">
          <h4>
            Day {item.dayNumber} - {item.city}
          </h4>

          <div className="session">
            <b>🌞 Day Time</b>
            <ul>
              {item.dayPlaces.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </div>

          <div className="session">
            <b>🌙 Evening</b>
            <ul>
              {item.eveningPlaces.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}

      <div className="text-center">
        <button className="btn btn-primary save-btn" onClick={saveTrip}>
          💾 Save Trip & View State Info
        </button>
      </div>
    </div>
  );
}

export default ItineraryResult;
