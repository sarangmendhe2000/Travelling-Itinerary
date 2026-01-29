import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Step1Destination.css";

function Step1Destination({ tripData, setTripData }) {

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [places, setPlaces] = useState([]);

  const [countryId, setCountryId] = useState("");
  const [stateId, setStateId] = useState("");
  const [placeName, setPlaceName] = useState("");

  // ---------------- LOAD COUNTRIES ----------------
  useEffect(() => {
    axios.get("https://localhost:7013/api/countries")
      .then(res => setCountries(res.data))
      .catch(err => console.log(err));
  }, []);

  // ---------------- LOAD STATES ----------------
  useEffect(() => {
    if (countryId) {
      axios.get(`https://localhost:7013/api/states/${countryId}`)
        .then(res => setStates(res.data))
        .catch(err => console.log(err));
    }
  }, [countryId]);

  // ---------------- LOAD PLACES ----------------
  useEffect(() => {
    if (stateId) {
      axios.get(`https://localhost:7013/api/places/${stateId}`)
        .then(res => setPlaces(res.data))
        .catch(err => console.log(err));
    }
  }, [stateId]);

  // ---------------- ADD PLACE ----------------
  const handleAddPlace = () => {
    if (placeName && !tripData.places.includes(placeName)) {

      const selectedState =
        states.find(s => s.stateId == stateId)?.stateName;

      setTripData(prev => ({
        ...prev,
        state: selectedState,          // for display
        stateId: parseInt(stateId),    // ✅ important
        places: [...prev.places, placeName]
      }));
    }
  };

  return (
    <div>

      <h2 className="step-title text-center mb-4">
        🌍 Select Your Destination
      </h2>

      <div className="row">

        {/* COUNTRY */}
        <div className="col-md-4">
          <label>Country</label>
          <select
            className="form-select"
            value={countryId}
            onChange={(e) => {
              setCountryId(e.target.value);
              setStateId("");
              setPlaces([]);
            }}
          >
            <option value="">Select Country</option>
            {countries.map(c => (
              <option key={c.countryId} value={c.countryId}>
                {c.countryName}
              </option>
            ))}
          </select>
        </div>

        {/* STATE */}
        <div className="col-md-4">
          <label>State</label>
          <select
            className="form-select"
            value={stateId}
            onChange={(e) => setStateId(e.target.value)}
            disabled={!countryId}
          >
            <option value="">Select State</option>
            {states.map(s => (
              <option key={s.stateId} value={s.stateId}>
                {s.stateName}
              </option>
            ))}
          </select>
        </div>

        {/* PLACE */}
        <div className="col-md-4">
          <label>Place</label>
          <select
            className="form-select"
            value={placeName}
            onChange={(e) => setPlaceName(e.target.value)}
            disabled={!stateId}
          >
            <option value="">Select Place</option>
            {places.map(p => (
              <option key={p.placeId} value={p.placeName}>
                {p.placeName}
              </option>
            ))}
          </select>
        </div>

      </div>

      <div className="text-center mt-3">
        <button className="btn btn-success" onClick={handleAddPlace}>
          + Add Place
        </button>
      </div>

      {/* SELECTED */}
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
