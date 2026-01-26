import React from "react";
import "./Step2Dates.css";

function Step2Dates({ tripData, setTripData }) {
  const handleStartDate = (e) => {
    setTripData({
      ...tripData,
      startDate: e.target.value,
    });
  };

  const handleEndDate = (e) => {
    if (e.target.value < tripData.startDate) return;

    setTripData({
      ...tripData,
      endDate: e.target.value,
    });
  };

  const calculateDays = () => {
    if (tripData.startDate && tripData.endDate) {
      const start = new Date(tripData.startDate);
      const end = new Date(tripData.endDate);
      const diff = end - start;
      return diff / (1000 * 60 * 60 * 24) + 1;
    }
    return 0;
  };

  return (
    <div className="step2-wrapper">
      <h2 className="step2-title">📅 Select Trip Dates</h2>
      <p className="step2-subtitle">Choose your travel duration</p>

      <div className="row justify-content-center">
        <div className="col-md-5 mb-3">
          <label>Start Date</label>
          <input
            type="date"
            className="form-control step2-input"
            value={tripData.startDate}
            min={new Date().toISOString().split("T")[0]}
            onChange={handleStartDate}
          />
        </div>

        <div className="col-md-5 mb-3">
          <label>End Date</label>
          <input
            type="date"
            className="form-control step2-input"
            value={tripData.endDate}
            min={tripData.startDate}
            onChange={handleEndDate}
            disabled={!tripData.startDate}
          />
        </div>
      </div>

      <div className="days-box">
        Total Days: <span>{calculateDays()}</span>
      </div>
    </div>
  );
}

export default Step2Dates;
