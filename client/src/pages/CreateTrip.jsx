import React, { useState } from "react";
import Step1Destination from "./Step1Destination";
import Step2Dates from "./Step2Dates";
import Step3Travellers from "./Step3Travellers";
import Step4HotelTransport from "./Step4HotelTransport";
import Review from "./Review";
import ItineraryResult from "./ItineraryResult";

function CreateTrip() {

  const [step, setStep] = useState(1);

  const [tripData, setTripData] = useState({
    country: "",
    state: "",
    places: [],
    startDate: "",
    endDate: "",
    travellers: [],
    hotelType: "",
    transport: [],
    budgetRange: ""
  });

  const nextStep = () => {

  // STEP 1 → Destination
  if (step === 1) {
    if (tripData.places.length === 0) {
      alert("Please select at least one place");
      return;
    }
  }

  // STEP 2 → Dates
  if (step === 2) {
    if (!tripData.startDate || !tripData.endDate) {
      alert("Please select start and end dates");
      return;
    }
  }

  // STEP 3 → Travellers
  if (step === 3) {
    if (tripData.travellers.length === 0) {
      alert("Please add traveller details");
      return;
    }

    for (let t of tripData.travellers) {
      if (!t.name || !t.age || !t.gender) {
        alert("Please fill all traveller fields");
        return;
      }
    }
  }

  // STEP 4 → Hotel & Transport
  if (step === 4) {
    if (!tripData.hotelType) {
      alert("Please select hotel type");
      return;
    }

    if (tripData.transport.length === 0) {
      alert("Please select transport mode");
      return;
    }
    if (!tripData.budgetRange) {
  alert("Please select budget range");
  return;
}
  }

  // MOVE NEXT
  if (step < 6) {
    setStep(step + 1);
  }
};


  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Step1Destination
            tripData={tripData}
            setTripData={setTripData}
          />
        );
      case 2:
        return (
          <Step2Dates
            tripData={tripData}
            setTripData={setTripData}
          />
        );
      case 3:
        return (
          <Step3Travellers
            tripData={tripData}
            setTripData={setTripData}
          />
        );
      case 4:
        return (
          <Step4HotelTransport
            tripData={tripData}
            setTripData={setTripData}
          />
        );
      case 5:
        return (
          <Review tripData={tripData} />
        );
        case 6:
  return (
    <ItineraryResult tripData={tripData} />
  );
      default:
        return null;
    }
  };

  return (
    <div className="container py-5">

      {/* Step Bar */}
      <div className="d-flex justify-content-between mb-4">
        <div className={step === 1 ? "fw-bold text-primary" : ""}>Destination</div>
        <div className={step === 2 ? "fw-bold text-primary" : ""}>Dates</div>
        <div className={step === 3 ? "fw-bold text-primary" : ""}>Travellers</div>
        <div className={step === 4 ? "fw-bold text-primary" : ""}>Hotel & Transport</div>
        <div className={step === 5 ? "fw-bold text-primary" : ""}>Review</div>
        <div className={step === 6 ? "fw-bold text-primary" : ""}>Itinerary</div>
      </div>

      {/* Card */}
      <div className="card shadow-lg p-4">

        {renderStep()}

        {/* Buttons */}
        <div className="d-flex justify-content-between mt-4">

          <button
            className="btn btn-outline-secondary"
            disabled={step === 1}
            onClick={prevStep}
          >
            Back
          </button>

          <button
            className="btn btn-primary"
            onClick={nextStep}
          >
            Next
          </button>

        </div>

      </div>

    </div>
  );
}

export default CreateTrip;
