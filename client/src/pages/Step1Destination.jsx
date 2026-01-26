import React, { useState } from "react";
import "./Step1Destination.css";

const destinationData = {
  India: {
    "Madhya Pradesh": ["Pachmarhi", "Ujjain", "Maheshwar", "Bhimbetka"],
    Rajasthan: ["Jaipur", "Udaipur", "Jaisalmer"],
    Maharashtra: ["Mumbai", "Pune", "Mahabaleshwar"],
  },
  Indonesia: {
    Bali: ["Kuta Beach", "Ubud", "Seminyak"],
  },
  France: {
    Paris: ["Eiffel Tower", "Louvre Museum"],
  },
};

function Step1Destination({ tripData, setTripData }) {
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [place, setPlace] = useState("");

  const handleAddPlace = () => {
    if (place && !tripData.places.includes(place)) {
      setTripData({
        ...tripData,
        country,
        state,
        places: [...tripData.places, place],
      });
    }
  };

  return (
    <div>
      <h2 className="step-title text-center mb-4">
        🌍 Select Your Destination
      </h2>

      <div className="row">
        <div className="col-md-4">
          <label>Country</label>
          <select
            className="form-select"
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
              setState("");
            }}
          >
            <option value="">Select</option>
            {Object.keys(destinationData).map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <label>State</label>
          <select
            className="form-select"
            value={state}
            onChange={(e) => setState(e.target.value)}
            disabled={!country}
          >
            <option value="">Select</option>
            {country &&
              Object.keys(destinationData[country]).map((s) => (
                <option key={s}>{s}</option>
              ))}
          </select>
        </div>

        <div className="col-md-4">
          <label>Place</label>
          <select
            className="form-select"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            disabled={!state}
          >
            <option value="">Select</option>
            {country &&
              state &&
              destinationData[country][state].map((p) => (
                <option key={p}>{p}</option>
              ))}
          </select>
        </div>
      </div>

      <div className="text-center mt-3">
        <button className="btn btn-success" onClick={handleAddPlace}>
          + Add Place
        </button>
      </div>

      <div className="selected-box">
        <h5>Selected Places</h5>
        {tripData.places.map((p, i) => (
          <div key={i} className="place-item">
            {p}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Step1Destination;
