import React from "react";
import { useParams, useNavigate } from "react-router-dom";

// Static attraction data
const attractionData = {
  Jaipur: {
    day: ["Amer Fort", "City Palace"],
    evening: ["Hawa Mahal", "Local Market"]
  },
  Pachmarhi: {
    day: ["Bee Falls", "Pandav Caves"],
    evening: ["Sunset Point"]
  },
  Ujjain: {
    day: ["Mahakaleshwar Temple"],
    evening: ["Ram Ghat Aarti"]
  },
  Maheshwar: {
    day: ["Maheshwar Fort"],
    evening: ["Narmada Ghat"]
  }
};

function ItineraryResult({ tripData }) {

  const { id } = useParams();
  const navigate = useNavigate();   // ✅ ADD

  // If tripData not passed, load from localStorage
  let finalTripData = tripData;

  if (!finalTripData && id) {

    const trips = JSON.parse(localStorage.getItem("myTrips")) || [];

    const foundTrip = trips.find(t => t.id.toString() === id);

    if (foundTrip) {
      finalTripData = foundTrip.tripData;
    }
  }

  if (!finalTripData) {
    return <h3 className="text-center mt-5">Trip not found</h3>;
  }

  const generateItinerary = () => {

    let result = [];

    finalTripData.places.forEach((place, index) => {

      const data = attractionData[place] || {
        day: ["Local Sightseeing"],
        evening: ["Free Time"]
      };

      result.push({
        dayNumber: index + 1,
        city: place,
        dayPlaces: data.day,
        eveningPlaces: data.evening
      });

    });

    return result;
  };

  const itinerary = generateItinerary();

  // ✅ SAVE + REDIRECT
  const saveTrip = () => {

    let trips = JSON.parse(localStorage.getItem("myTrips")) || [];

    const tripId = new Date().getTime();

    const newTrip = {
      id: tripId,
      tripData: finalTripData,
      itinerary: itinerary
    };

    trips.push(newTrip);

    localStorage.setItem("myTrips", JSON.stringify(trips));

    alert("Trip saved successfully!");

    // Redirect to State Recommendation Page
    navigate(`/recommendation/${finalTripData.state}`);
  };

  return (
    <div className="container mt-5">

      <h4 className="mb-4">Our Recommended Itinerary</h4>

      {itinerary.map((item) => (
        <div key={item.dayNumber} className="card mb-3 p-3">

          <h5>Day {item.dayNumber} - {item.city}</h5>

          <p><b>Day Time:</b></p>
          <ul>
            {item.dayPlaces.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>

          <p><b>Evening:</b></p>
          <ul>
            {item.eveningPlaces.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>

        </div>
      ))}

      {/* ✅ SAVE BUTTON */}
      <button
        className="btn btn-primary mt-3"
        onClick={saveTrip}
      >
        Save Trip & View State Info
      </button>

    </div>
  );
}

export default ItineraryResult;
