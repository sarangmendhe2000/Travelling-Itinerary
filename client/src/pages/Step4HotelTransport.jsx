import React from "react";

function Step4HotelTransport({ tripData, setTripData }) {

  // Hotel selection
  const selectHotel = (type) => {
    setTripData({
      ...tripData,
      hotelType: type
    });
  };

  // Transport selection
  const toggleTransport = (mode) => {

    let updatedTransport = [...tripData.transport];

    if (updatedTransport.includes(mode)) {
      updatedTransport = updatedTransport.filter(t => t !== mode);
    } else {
      updatedTransport.push(mode);
    }

    setTripData({
      ...tripData,
      transport: updatedTransport
    });
  };

  // Budget selection
  const selectBudget = (range) => {
    setTripData({
      ...tripData,
      budgetRange: range
    });
  };

  return (
    <div>

      <h4 className="mb-4">Travel Preferences</h4>

      {/* Hotel Type */}
      <h5>Hotel Type</h5>
      <div className="mb-3">
        <label className="me-3">
          <input
            type="radio"
            checked={tripData.hotelType === "Budget"}
            onChange={() => selectHotel("Budget")}
          /> Budget
        </label>

        <label className="me-3 ms-3">
          <input
            type="radio"
            checked={tripData.hotelType === "Standard"}
            onChange={() => selectHotel("Standard")}
          /> Standard
        </label>

        <label className="ms-3">
          <input
            type="radio"
            checked={tripData.hotelType === "Luxury"}
            onChange={() => selectHotel("Luxury")}
          /> Luxury
        </label>
      </div>

      {/* Transport Preference */}
      <h5>Transport Preference</h5>
      <div className="mb-3">

        <label className="me-3">
          <input
            type="checkbox"
            checked={tripData.transport.includes("Flight")}
            onChange={() => toggleTransport("Flight")}
          /> Flight
        </label>

        <label className="me-3">
          <input
            type="checkbox"
            checked={tripData.transport.includes("Train")}
            onChange={() => toggleTransport("Train")}
          /> Train
        </label>

        <label className="me-3">
          <input
            type="checkbox"
            checked={tripData.transport.includes("Bus")}
            onChange={() => toggleTransport("Bus")}
          /> Bus
        </label>

        <label>
          <input
            type="checkbox"
            checked={tripData.transport.includes("Cab")}
            onChange={() => toggleTransport("Cab")}
          /> Cab
        </label>

      </div>

      {/* Budget Range */}
      <h5>Total Budget</h5>

      <div className="mb-3">

        <label className="d-block">
          <input
            type="radio"
            checked={tripData.budgetRange === "10000-20000"}
            onChange={() => selectBudget("10000-20000")}
          /> 10,000 - 20,000
        </label>

        <label className="d-block">
          <input
            type="radio"
            checked={tripData.budgetRange === "20000-45000"}
            onChange={() => selectBudget("20000-45000")}
          /> 20,000 - 45,000
        </label>

        <label className="d-block">
          <input
            type="radio"
            checked={tripData.budgetRange === "Best"}
            onChange={() => selectBudget("Best")}
          /> Best Recommendation
        </label>

      </div>

    </div>
  );
}

export default Step4HotelTransport;
