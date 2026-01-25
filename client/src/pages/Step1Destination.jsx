import React from "react";
import { useParams } from "react-router-dom";

/* ================================
   HOTEL DATA (STATE WISE)
================================ */

const hotelData = {
  "Madhya Pradesh": [
    {
      name: "Lake View Hotel",
      city: "Bhopal",
      price: 2200,
      image: "https://via.placeholder.com/300x200"
    },
    {
      name: "Crown Palace",
      city: "Indore",
      price: 2800,
      image: "https://via.placeholder.com/300x200"
    },
    {
      name: "Royal Heritage Inn",
      city: "Gwalior",
      price: 2600,
      image: "https://via.placeholder.com/300x200"
    }
  ],

  Maharashtra: [
    {
      name: "Hotel Sea View",
      city: "Mumbai",
      price: 2500,
      image: "https://via.placeholder.com/300x200"
    },
    {
      name: "Royal Palace Inn",
      city: "Pune",
      price: 3200,
      image: "https://via.placeholder.com/300x200"
    }
  ],

  Rajasthan: [
    {
      name: "Desert Pearl Resort",
      city: "Jaisalmer",
      price: 3000,
      image: "https://via.placeholder.com/300x200"
    },
    {
      name: "Royal Fort Hotel",
      city: "Jaipur",
      price: 2800,
      image: "https://via.placeholder.com/300x200"
    }
  ]
};

/* ================================
   COMPONENT
================================ */

function StateRecommendation() {

  const { state } = useParams();

  const savedTrip = JSON.parse(localStorage.getItem("lastTrip"));

  const selectedPlaces = savedTrip?.places || [];

  const hotels = hotelData[state] || [];

  return (
    <div className="container mt-5">

      {/* ✅ WELCOME */}
      <h2 className="mb-4 text-center">
        Welcome to {state}
      </h2>

      {/* ✅ TOURISM PLACES */}
      <h4 className="mb-3">Your Selected Tourist Places</h4>

      <div className="row mb-5">
        {selectedPlaces.length === 0 ? (
          <p>No places selected.</p>
        ) : (
          selectedPlaces.map((place, index) => (
            <div key={index} className="col-md-3">
              <div className="card">
                <img
                  src="https://via.placeholder.com/300x200"
                  className="card-img-top"
                  alt={place}
                />
                <div className="card-body text-center">
                  <h6>{place}</h6>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ✅ HOTELS */}
      <h4 className="mb-3">Hotel Suggestions</h4>

      <div className="row">
        {hotels.length === 0 ? (
          <p>No hotel data available.</p>
        ) : (
          hotels.map((hotel, index) => (
            <div key={index} className="col-md-3">
              <div className="card">
                <img
                  src={hotel.image}
                  className="card-img-top"
                  alt={hotel.name}
                />
                <div className="card-body text-center">
                  <h6>{hotel.name}</h6>
                  <p>{hotel.city}</p>
                  <p>₹{hotel.price} / night</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}

export default StateRecommendation;
