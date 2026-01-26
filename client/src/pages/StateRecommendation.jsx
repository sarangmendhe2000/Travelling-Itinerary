import React from "react";
import { useParams } from "react-router-dom";

/* ================================
   STATIC DATA
================================ */

const stateStaticData = {
  Maharashtra: {
    places: [
      {
        name: "Mumbai",
        image: "https://via.placeholder.com/300x200"
      },
      {
        name: "Pune",
        image: "https://via.placeholder.com/300x200"
      },
      {
        name: "Lonavala",
        image: "https://via.placeholder.com/300x200"
      },
      {
        name: "Mahabaleshwar",
        image: "https://via.placeholder.com/300x200"
      }
    ],

    hotels: [
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
      },
      {
        name: "Hilltop Resort",
        city: "Mahabaleshwar",
        price: 4500,
        image: "https://via.placeholder.com/300x200"
      },
      {
        name: "Green Valley Stay",
        city: "Lonavala",
        price: 2800,
        image: "https://via.placeholder.com/300x200"
      }
    ]
  },
  "Madhya Pradesh": {
  places: [
    { name: "Pachmarhi", image: "https://via.placeholder.com/300x200" },
    { name: "Ujjain", image: "https://via.placeholder.com/300x200" },
    { name: "Maheshwar", image: "https://via.placeholder.com/300x200" },
    { name: "Bhimbetka", image: "https://via.placeholder.com/300x200" }
  ],

  hotels: [
    {
      name: "MP Tourism Hotel",
      city: "Pachmarhi",
      price: 2000,
      image: "https://via.placeholder.com/300x200"
    },
    {
      name: "Temple View Stay",
      city: "Ujjain",
      price: 1800,
      image: "https://via.placeholder.com/300x200"
    }
  ]
},


  Goa: {
    places: [
      { name: "Baga Beach", image: "https://via.placeholder.com/300x200" },
      { name: "Calangute Beach", image: "https://via.placeholder.com/300x200" },
      { name: "Anjuna Beach", image: "https://via.placeholder.com/300x200" },
      { name: "Panaji", image: "https://via.placeholder.com/300x200" }
    ],

    hotels: [
      {
        name: "Ocean Breeze Resort",
        city: "Baga",
        price: 3500,
        image: "https://via.placeholder.com/300x200"
      },
      {
        name: "Palm Beach Hotel",
        city: "Calangute",
        price: 2800,
        image: "https://via.placeholder.com/300x200"
      },
      {
        name: "Sunset View Resort",
        city: "Anjuna",
        price: 4200,
        image: "https://via.placeholder.com/300x200"
      },
      {
        name: "Casa De Goa",
        city: "Panaji",
        price: 3000,
        image: "https://via.placeholder.com/300x200"
      }
    ]
  }
};

/* ================================
   COMPONENT
================================ */

function StateRecommendation() {
  const { state } = useParams();
  const stateKey = Object.keys(stateStaticData).find(
  key => key.toLowerCase() === state.toLowerCase()
);

const stateInfo = stateStaticData[stateKey];


  if (!stateInfo) {
    return <h3 className="mt-5 text-center">No Data Found</h3>;
  }

  return (
    <div className="container mt-5">

      {/* ✅ Welcome Message */}
      <h2 className="mb-4 text-center">
        Welcome to {state}
      </h2>

      {/* ✅ Famous Places */}
      <h4 className="mb-3">Famous Tourist Places</h4>

      <div className="row mb-5">
        {stateInfo.places.map((place, index) => (
          <div key={index} className="col-md-3">
            <div className="card">
              <img
                src={place.image}
                className="card-img-top"
                alt={place.name}
              />
              <div className="card-body text-center">
                <h6>{place.name}</h6>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Hotels */}
      <h4 className="mb-3">Hotel Suggestions</h4>

      <div className="row">
        {stateInfo.hotels.map((hotel, index) => (
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
        ))}
      </div>

    </div>
  );
}

export default StateRecommendation;
