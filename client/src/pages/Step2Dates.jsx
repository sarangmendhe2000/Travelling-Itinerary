import React from "react";

function Step2Dates({ tripData, setTripData }) {

  const handleStartDate = (e) => {
    setTripData({
      ...tripData,
      startDate: e.target.value
    });
  };

  const handleEndDate = (e) => {
    setTripData({
      ...tripData,
      endDate: e.target.value
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
    <div>

      <h4 className="mb-4">Select Trip Dates</h4>

      <div className="mb-3">
        <label className="form-label">Start Date</label>
        <input
          type="date"
          className="form-control"
          value={tripData.startDate}
          onChange={handleStartDate}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">End Date</label>
        <input
          type="date"
          className="form-control"
          value={tripData.endDate}
          onChange={handleEndDate}
        />
      </div>

      <div className="alert alert-info">
        Total Days: <b>{calculateDays()}</b>
      </div>

    </div>
  );
}

export default Step2Dates;
