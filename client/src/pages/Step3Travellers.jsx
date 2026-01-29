import React, { useState } from "react";
import "./Step3Travellers.css";

function Step3Travellers({ tripData, setTripData }) {

  const [tripType, setTripType] = useState("solo");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  const addTraveller = () => {

    if (!name || !age || !gender) {
      alert("Please fill all fields");
      return;
    }

    if (tripType === "solo" && tripData.travellers.length > 0) {
      alert("Please select Group Trip to add more travellers");
      return;
    }

    const newTraveller = { name, age, gender };

    setTripData(prev => ({
      ...prev,
      travellers: [...prev.travellers, newTraveller]
    }));

    setName("");
    setAge("");
    setGender("");
  };

  return (
    <div className="step3-wrapper">

      <h2 className="step3-title">👨‍👩‍👧 Travellers Details</h2>
      <p className="step3-subtitle">Who is going on this trip?</p>

      {/* Trip Type */}
      <div className="trip-type-box">
        <label>
          <input
            type="radio"
            checked={tripType === "solo"}
            onChange={() => setTripType("solo")}
          />
          Solo Trip
        </label>

        <label>
          <input
            type="radio"
            checked={tripType === "group"}
            onChange={() => setTripType("group")}
          />
          Group Trip
        </label>
      </div>

      {/* Traveller Form */}
      <div className="row justify-content-center">

        <div className="col-md-3 mb-3">
          <input
            type="text"
            className="form-control step3-input"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="col-md-3 mb-3">
          <input
            type="number"
            className="form-control step3-input"
            placeholder="Age"
            min="1"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>

        <div className="col-md-3 mb-3">
          <select
            className="form-select step3-input"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

      </div>

      <div className="text-center">
        <button className="btn btn-success px-4" onClick={addTraveller}>
          ➕ Add Traveller
        </button>
      </div>

      {/* Traveller List */}
      <div className="traveller-list">

        <h5>Added Travellers</h5>

        {tripData.travellers.length === 0 && (
          <p>No travellers added</p>
        )}

        {tripData.travellers.map((t, index) => (
          <div key={index} className="traveller-card">
            {t.name} • {t.age} yrs • {t.gender}
          </div>
        ))}

      </div>

    </div>
  );
}

export default Step3Travellers;
