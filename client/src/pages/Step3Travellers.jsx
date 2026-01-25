import React, { useState } from "react";

function Step3Travellers({ tripData, setTripData }) {

  const [tripType, setTripType] = useState("solo");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  // Add traveller
  const addTraveller = () => {

  if (!name || !age || !gender) {
    alert("Please fill all fields");
    return;
  }

  // If Solo trip and already one traveller added
  if (tripType === "solo" && tripData.travellers.length > 0) {
    alert("Please select Group Trip to add more travellers");
    return;
  }

  const newTraveller = { name, age, gender };

  setTripData({
    ...tripData,
    travellers: [...tripData.travellers, newTraveller]
  });

  setName("");
  setAge("");
  setGender("");
};


  return (
    <div>

      <h4 className="mb-4">Travellers Details</h4>

      {/* Trip Type */}
      <div className="mb-3">
        <label className="me-3">
          <input
            type="radio"
            checked={tripType === "solo"}
            onChange={() => setTripType("solo")}
          /> Solo Trip
        </label>

        <label className="ms-4">
          <input
            type="radio"
            checked={tripType === "group"}
            onChange={() => setTripType("group")}
          /> Group Trip
        </label>
      </div>

      {/* Traveller Form */}
      <div className="row">

        <div className="col-md-4 mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="col-md-4 mb-3">
          <input
            type="number"
            className="form-control"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>

        <div className="col-md-4 mb-3">
          <select
            className="form-select"
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

      <button className="btn btn-success mb-3" onClick={addTraveller}>
        Add Traveller
      </button>

      {/* Traveller List */}
      <h5>Added Travellers</h5>

      {tripData.travellers.length === 0 && (
        <p>No travellers added</p>
      )}

      <ul className="list-group">
        {tripData.travellers.map((t, index) => (
          <li key={index} className="list-group-item">
            {t.name} - {t.age} yrs - {t.gender}
          </li>
        ))}
      </ul>

    </div>
  );
}

export default Step3Travellers;
