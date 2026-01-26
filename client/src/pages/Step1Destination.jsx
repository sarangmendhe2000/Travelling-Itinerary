import React, { useState } from "react";

const destinationData = {
  India: {
    "Madhya Pradesh": ["Pachmarhi", "Ujjain", "Maheshwar", "Bhimbetka"],
    Rajasthan: ["Jaipur", "Udaipur", "Jaisalmer"],
    Maharashtra: ["Mumbai", "Pune", "Mahabaleshwar"]
  },
  Indonesia: {
    Bali: ["Kuta Beach", "Ubud", "Seminyak"]
  },
  France: {
    Paris: ["Eiffel Tower", "Louvre Museum"]
  }
};

function Step1Destination({ tripData, setTripData }) {

  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [place, setPlace] = useState("");

  // When country changes
  const handleCountryChange = (e) => {
    setCountry(e.target.value);
    setState("");
    setPlace("");
  };

  // When state changes
  const handleStateChange = (e) => {
    setState(e.target.value);
    setPlace("");
  };

  // Add place to trip
  const handleAddPlace = () => {
    if (place && !tripData.places.includes(place)) {
      setTripData({
        ...tripData,
        country: country,
        state: state,
        places: [...tripData.places, place]
      });
    }
  };

  return (
    <div>

      <h4 className="mb-4">Select Destination</h4>

      {/* Country */}
      <div className="mb-3">
        <label className="form-label">Country</label>
        <select
          className="form-select"
          value={country}
          onChange={handleCountryChange}
        >
          <option value="">Select Country</option>
          {Object.keys(destinationData).map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* State */}
      <div className="mb-3">
        <label className="form-label">State / Region</label>
        <select
          className="form-select"
          value={state}
          onChange={handleStateChange}
          disabled={!country}
        >
          <option value="">Select State</option>
          {country &&
            Object.keys(destinationData[country]).map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
        </select>
      </div>

      {/* Place */}
      <div className="mb-3">
        <label className="form-label">Place</label>
        <select
          className="form-select"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          disabled={!state}
        >
          <option value="">Select Place</option>
          {country && state &&
            destinationData[country][state].map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
        </select>
      </div>

      {/* Add Button */}
      <button
        className="btn btn-success mb-3"
        onClick={handleAddPlace}
      >
        Add Place
      </button>

      {/* Selected Places */}
      <div>
        <h5>Selected Places:</h5>

        {tripData.places.length === 0 && (
          <p>No places added yet</p>
        )}

        <ul className="list-group">
          {tripData.places.map((p, index) => (
            <li key={index} className="list-group-item">
              {p}
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}

export default Step1Destination;
