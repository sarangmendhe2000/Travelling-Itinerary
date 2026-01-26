import React from "react";
import { useParams } from "react-router-dom";
import "./StateRecommendation.css";

const placeImages = {
  Pachmarhi: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=60",
  Ujjain: "https://images.unsplash.com/photo-1532009324734-20a7a5813719?auto=format&fit=crop&w=800&q=60",

  Maheshwar: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=60",
  Bhimbetka: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=60",

  Mumbai: "https://images.unsplash.com/photo-1532009324734-20a7a5813719?auto=format&fit=crop&w=800&q=60",
  Pune: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=60",
  Lonavala: "https://images.unsplash.com/photo-1532009324734-20a7a5813719?auto=format&fit=crop&w=800&q=60",
  Mahabaleshwar: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=60",


  Jaipur: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=800&q=60",
Udaipur: "https://images.unsplash.com/photo-1532009324734-20a7a5813719?auto=format&fit=crop&w=800&q=60",
Jaisalmer: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=60",
Pushkar: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=60"
};

const HOTEL_IMG =
 "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=60";



const stateStaticData = {
  "Madhya Pradesh": {
    places: ["Pachmarhi", "Ujjain", "Maheshwar", "Bhimbetka"],
    hotels: [
      { name: "MP Tourism Hotel", city: "Pachmarhi", price: 2000 },
      { name: "Temple View Stay", city: "Ujjain", price: 1800 }
    ]
  },

  Maharashtra: {
    places: ["Mumbai", "Pune", "Lonavala", "Mahabaleshwar"],
    hotels: [
      { name: "Hotel Sea View", city: "Mumbai", price: 2500 },
      { name: "Royal Palace Inn", city: "Pune", price: 3200 }
    ]
  }, 
  Rajasthan: {
  places: ["Jaipur", "Udaipur", "Jaisalmer", "Pushkar"],

  hotels: [
    { name: "Pink City Palace Hotel", city: "Jaipur", price: 2800 },
    { name: "Lake View Resort", city: "Udaipur", price: 3200 },
    { name: "Desert Pearl Camp", city: "Jaisalmer", price: 3500 },
    { name: "Pushkar Heritage Stay", city: "Pushkar", price: 2200 }
  ]
}

  
};



function StateRecommendation() {

  const { state } = useParams();

  const stateKey = Object.keys(stateStaticData)
    .find(k => k.toLowerCase() === state.toLowerCase());

  const stateInfo = stateStaticData[stateKey];

  if (!stateInfo) {
    return <h3 className="text-center mt-5">No Data Found</h3>;
  }

  return (
    <div className="state-page">

      {/* HERO */}
      <div className="state-hero">
        <h1>Welcome to {state}</h1>
        <p>Best places & hotel suggestions</p>
      </div>

      {/* PLACES */}
      <h2 className="section-title">Famous Tourist Places</h2>

      <div className="grid">
        {stateInfo.places.map((p, i) => (
          <div className="card-box" key={i}>
            <img src={placeImages[p]} alt={p} />
            <h4>{p}</h4>
          </div>
        ))}
      </div>

      {/* HOTELS */}
      <h2 className="section-title">Hotel Suggestions</h2>

      <div className="grid">
        {stateInfo.hotels.map((h, i) => (
          <div className="card-box" key={i}>
            <img src={HOTEL_IMG} alt={h.name} />
            <h4>{h.name}</h4>
            <p>{h.city}</p>
            <p className="price">₹{h.price} / night</p>
          </div>
        ))}
      </div>

    </div>
  );
}

export default StateRecommendation;
