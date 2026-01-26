import React, { useEffect } from "react";
import "./Step4HotelTransport.css";

function Step4HotelTransport({ tripData, setTripData }) {
  // Hotel selection
  const selectHotel = (type) => {
    setTripData({
      ...tripData,
      hotelType: type,
    });
  };

  // Transport selection
  const selectTransport = (mode) => {
    setTripData({
      ...tripData,
      transport: mode,
    });
  };

  // 🔥 SMART BUDGET CALCULATION
  useEffect(() => {
    if (!tripData.startDate || !tripData.endDate) return;

    const start = new Date(tripData.startDate);
    const end = new Date(tripData.endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

    const travellers = tripData.travellers.length || 1;

    // Hotel cost per night
    const hotelRates = {
      Budget: 800,
      Standard: 1500,
      Luxury: 3000,
    };

    // Transport cost per person
    const transportRates = {
      Flight: 5000,
      Train: 1500,
      Bus: 800,
      Cab: 2000,
    };

    let hotelCost =
      (hotelRates[tripData.hotelType] || 1500) * days * travellers;

    let transportCost = 0;

    if (tripData.transport) {
  transportCost = (transportRates[tripData.transport] || 0) * travellers;
}

    const estimated = Math.round(hotelCost + transportCost);

    let budgetRange = "Best";

    if (estimated < 10000) {
      budgetRange = "Below-10000";
    } else if (estimated <= 20000) {
      budgetRange = "10000-20000";
    } else if (estimated <= 45000) {
      budgetRange = "20000-45000";
    }

    setTripData((prev) => ({
      ...prev,
      estimatedBudget: estimated,
      budgetRange: budgetRange,
    }));
  }, [
    tripData.startDate,
    tripData.endDate,
    tripData.hotelType,
    tripData.transport,
    tripData.travellers,
  ]);

  return (
    <div className="step4-wrapper">
      <h2 className="step4-title">🏨 Travel Preferences</h2>
      <p className="step4-subtitle">Customize your stay and travel</p>

      {/* HOTEL */}
      <h5 className="section-title">Hotel Type</h5>
      <div className="option-row">
        {["Budget", "Standard", "Luxury"].map((type) => (
          <div
            key={type}
            className={`option-card ${tripData.hotelType === type ? "active" : ""}`}
            onClick={() => selectHotel(type)}
          >
            {type}
          </div>
        ))}
      </div>

      {/* TRANSPORT */}
      <h5 className="section-title">Transport Preference</h5>
      <div className="option-row">
        {["Flight", "Train", "Bus", "Cab"].map((mode) => (
          <div
            key={mode}
            className={`option-card ${tripData.transport === mode ? "active" : ""}`}
            onClick={() => selectTransport(mode)}
          >
            {mode}
          </div>
        ))}
      </div>

      {/* BUDGET */}
      <h5 className="section-title">Estimated Budget</h5>
      <div className="option-row">
        <div className={`option-card active`}>
          {tripData.budgetRange === "Below-10000" && "Below ₹10k"}
          {tripData.budgetRange === "10000-20000" && "₹10k - ₹20k"}
          {tripData.budgetRange === "20000-45000" && "₹20k - ₹45k"}
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
