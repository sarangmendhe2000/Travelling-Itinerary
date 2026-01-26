import React, { useState } from "react";
import Step1Destination from "./Step1Destination";
import Step2Dates from "./Step2Dates";
import Step3Travellers from "./Step3Travellers";
import Step4HotelTransport from "./Step4HotelTransport";
import Review from "./Review";
import ItineraryResult from "./ItineraryResult";
import "./CreateTrip.css";

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
    transport: "",
    budgetRange: "",
    estimatedBudget: 0
  });

  const nextStep = () => {
    if (step === 1 && tripData.places.length === 0) {
      alert("Please select at least one place");
      return;
    }

    if (step === 2 && (!tripData.startDate || !tripData.endDate)) {
      alert("Please select start and end dates");
      return;
    }

    if (step === 3 && tripData.travellers.length === 0) {
      alert("Please add traveller details");
      return;
    }

    if (step === 4) {
  if (
    !tripData.hotelType ||
    !tripData.transport ||
    !tripData.budgetRange
  ) {
    alert("Please complete preferences");
    return;
  }
}


    if (step < 6) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Step1Destination tripData={tripData} setTripData={setTripData} />
        );
      case 2:
        return <Step2Dates tripData={tripData} setTripData={setTripData} />;
      case 3:
        return (
          <Step3Travellers tripData={tripData} setTripData={setTripData} />
        );
      case 4:
        return (
          <Step4HotelTransport tripData={tripData} setTripData={setTripData} />
        );
      case 5:
        return <Review tripData={tripData} />;
      case 6:
        return <ItineraryResult tripData={tripData} />;
      default:
        return null;
    }
  };

  return (
    <div className="create-trip-bg page-offset">
      <div className="trip-card">

        <div key={step} className="step-transition">
          {renderStep()}
        </div>

        {/* Buttons inside background */}
        <div className="trip-buttons">
          <button
            className="btn btn-outline-primary"
            disabled={step === 1}
            onClick={prevStep}
          >
            Back
          </button>

          <button className="btn btn-primary" onClick={nextStep}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateTrip;
