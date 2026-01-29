import React, { useEffect } from "react";
import "./Step4HotelTransport.css";

function Step4HotelTransport({ tripData, setTripData }) {

  const isIndia = tripData.country === "India";

  // ---------- HOTEL ----------
  const selectHotel = (type) => {
    setTripData(prev => ({
      ...prev,
      hotelType: type
    }));
  };

  // ---------- TRANSPORT ----------
  const selectTransport = (mode) => {
    setTripData(prev => ({
      ...prev,
      transport: mode
    }));
  };

  // ---------- SMART BUDGET ----------
  useEffect(() => {

    if (!tripData.startDate || !tripData.endDate) return;

    const start = new Date(tripData.startDate);
    const end = new Date(tripData.endDate);

    const days =
      Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

    const travellers = tripData.travellers.length || 1;

    // 🇮🇳 India Hotel (per night)
    const hotelRatesIndia = {
      Budget: 800,
      Standard: 1500,
      Luxury: 3000
    };

    // 🌍 International Hotel (per night)
    const hotelRatesInternational = {
      Budget: 3000,
      Standard: 6000,
      Luxury: 10000
    };

    // 🇮🇳 India Transport (per person)
    const transportRatesIndia = {
      Flight: 5000,
      Train: 1500,
      Bus: 800,
      Cab: 2000
    };

    // 🌍 International Transport (per person)
    const transportRatesInternational = {
      Flight: 25000,
      Train: 12000,
      Bus: 8000,
      Cab: 10000
    };

    const hotelRates = isIndia
      ? hotelRatesIndia
      : hotelRatesInternational;

    const transportRates = isIndia
      ? transportRatesIndia
      : transportRatesInternational;

    const hotelCost =
      (hotelRates[tripData.hotelType] || 0) *
      days *
      travellers;

    const transportCost =
      (transportRates[tripData.transport] || 0) *
      travellers;

    const estimated = Math.round(hotelCost + transportCost);

    let budgetRange = "Best";

    if (estimated < 20000) {
      budgetRange = "Below-20000";
    } else if (estimated <= 50000) {
      budgetRange = "20000-50000";
    } else if (estimated <= 100000) {
      budgetRange = "50000-100000";
    } else {
      budgetRange = "Above-100000";
    }

    setTripData(prev => ({
      ...prev,
      estimatedBudget: estimated,
      budgetRange
    }));

  }, [
    tripData.startDate,
    tripData.endDate,
    tripData.hotelType,
    tripData.transport,
    tripData.travellers,
    tripData.country
  ]);

  return (
    <div className="step4-wrapper">

      <h2 className="step4-title">🏨 Travel Preferences</h2>
      <p className="step4-subtitle">Customize your stay and travel</p>

      {/* HOTEL */}
      <h5 className="section-title">Hotel Type</h5>
      <div className="option-row">
        {["Budget", "Standard", "Luxury"].map(type => (
          <div
            key={type}
            className={`option-card ${
              tripData.hotelType === type ? "active" : ""
            }`}
            onClick={() => selectHotel(type)}
          >
            {type}
          </div>
        ))}
      </div>

      {/* TRANSPORT */}
      <h5 className="section-title">Transport Preference</h5>
      <div className="option-row">
        {["Flight", "Train", "Bus", "Cab"].map(mode => (
          <div
            key={mode}
            className={`option-card ${
              tripData.transport === mode ? "active" : ""
            }`}
            onClick={() => selectTransport(mode)}
          >
            {mode}
          </div>
        ))}
      </div>

      {/* BUDGET */}
      <h5 className="section-title">Estimated Budget</h5>
      <div className="option-row">
        <div className="option-card active">
          {tripData.budgetRange === "Below-20000" && "Below ₹20k"}
          {tripData.budgetRange === "20000-50000" && "₹20k - ₹50k"}
          {tripData.budgetRange === "50000-100000" && "₹50k - ₹1L"}
          {tripData.budgetRange === "Above-100000" && "Above ₹1L"}
          {tripData.budgetRange === "Best" && "Best Recommendation"}
        </div>
      </div>

      {/* ESTIMATE */}
      <div className="estimate-preview">
        Estimated Cost: ₹{tripData.estimatedBudget || 0}
      </div>

    </div>
  );
}

export default Step4HotelTransport;
