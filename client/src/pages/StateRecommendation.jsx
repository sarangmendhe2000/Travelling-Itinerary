import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./StateRecommendation.css";

/* =======================
   PLACE IMAGES
======================= */

const placeImages = {

  // INDIA
  Jaipur: "https://images.unsplash.com/photo-1564501049412-61c2a3083791",
  Udaipur: "https://images.unsplash.com/photo-1532009324734-20a7a5813719",
  Jaisalmer: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",

  Bhopal: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  Indore: "https://images.unsplash.com/photo-1532009324734-20a7a5813719",
  Jabalpur: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",

  Mumbai: "https://images.unsplash.com/photo-1532009324734-20a7a5813719",
  Pune: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  Nagpur: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",

  Bangalore: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  Mysore: "https://images.unsplash.com/photo-1532009324734-20a7a5813719",
  Coorg: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",

  Chennai: "https://images.unsplash.com/photo-1532009324734-20a7a5813719",
  Ooty: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  Madurai: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",

  // AUSTRALIA
  Sydney: "https://images.unsplash.com/photo-1532009324734-20a7a5813719",
  Newcastle: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  Wollongong: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",

  Melbourne: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  Geelong: "https://images.unsplash.com/photo-1532009324734-20a7a5813719",
  Ballarat: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",

  Brisbane: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  "Gold Coast": "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  Cairns: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",

  Perth: "https://images.unsplash.com/photo-1532009324734-20a7a5813719",
  Fremantle: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  Bunbury: "https://images.unsplash.com/photo-1506744038136-46273834b3fb"
};

const HOTEL_IMG =
  "https://images.unsplash.com/photo-1566073771259-6a8506099945";

/* =======================
   STATE STATIC DATA
======================= */

const stateStaticData = {

  // INDIA
  Rajasthan: {
    places: ["Jaipur", "Udaipur", "Jaisalmer"],
    hotels: [
      { name: "Pink City Palace Hotel", city: "Jaipur", price: 2800 },
      { name: "Lake View Resort", city: "Udaipur", price: 3200 }
    ]
  },

  "Madhya Pradesh": {
    places: ["Bhopal", "Indore", "Jabalpur"],
    hotels: [
      { name: "MP Tourism Hotel", city: "Bhopal", price: 2000 },
      { name: "Central Residency", city: "Indore", price: 2200 }
    ]
  },

  Maharashtra: {
    places: ["Mumbai", "Pune", "Nagpur"],
    hotels: [
      { name: "Sea View Hotel", city: "Mumbai", price: 3000 },
      { name: "Royal Palace Inn", city: "Pune", price: 2600 }
    ]
  },

  Karnataka: {
    places: ["Bangalore", "Mysore", "Coorg"],
    hotels: [
      { name: "ITC Gardenia", city: "Bangalore", price: 3500 },
      { name: "Mysore Palace Hotel", city: "Mysore", price: 2500 }
    ]
  },

  "Tamil Nadu": {
    places: ["Chennai", "Ooty", "Madurai"],
    hotels: [
      { name: "Beach Residency", city: "Chennai", price: 2800 },
      { name: "Hill View Resort", city: "Ooty", price: 2600 }
    ]
  },

  // AUSTRALIA
  Queensland: {
    places: ["Brisbane", "Gold Coast", "Cairns"],
    hotels: [
      { name: "Brisbane City Hotel", city: "Brisbane", price: 4500 },
      { name: "Gold Coast Resort", city: "Gold Coast", price: 5200 }
    ]
  },

  "Western Australia": {
    places: ["Perth", "Fremantle", "Bunbury"],
    hotels: [
      { name: "Perth Central Hotel", city: "Perth", price: 4700 },
      { name: "Ocean View Resort", city: "Fremantle", price: 5000 }
    ]
  },

  "New South Wales": {
    places: ["Sydney", "Newcastle", "Wollongong"],
    hotels: [
      { name: "Sydney Harbour Hotel", city: "Sydney", price: 5500 },
      { name: "Newcastle Beach Resort", city: "Newcastle", price: 4800 }
    ]
  },

  Victoria: {
    places: ["Melbourne", "Geelong", "Ballarat"],
    hotels: [
      { name: "Melbourne Grand Hotel", city: "Melbourne", price: 5200 },
      { name: "Victoria Palace Inn", city: "Geelong", price: 4600 }
    ]
  }

};

/* ======================= */

function StateRecommendation() {

  const navigate = useNavigate();
  const { state } = useParams();

  const stateKey = Object.keys(stateStaticData)
    .find(k => k.toLowerCase() === state.toLowerCase());

  const stateInfo = stateStaticData[stateKey];

  // ✅ SAFE REDIRECT
  useEffect(() => {
    if (!stateInfo) {
      navigate("/my-trips");
    }
  }, [stateInfo, navigate]);

  if (!stateInfo) return null;

  return (
    <div className="state-page">

      <div className="state-hero">
        <h1>Welcome to {stateKey}</h1>
        <p>Best places & hotel suggestions</p>
      </div>

      <h2 className="section-title">Famous Tourist Places</h2>

      <div className="grid">
        {stateInfo.places.map((p, i) => (
          <div className="card-box" key={i}>
            <img src={placeImages[p]} alt={p} />
            <h4>{p}</h4>
          </div>
        ))}
      </div>

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
