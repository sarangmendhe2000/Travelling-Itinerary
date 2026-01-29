import { useParams, Link } from "react-router-dom";
import "./TripDetails.css";



const tripData = {
  goa: {
    title: "3 Days in Goa",
    heroImage:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e", // Beach
    days: [
      "Day 1: Arrival & Beach",
      "Day 2: Water Sports & Nightlife",
      "Day 3: Shopping & Departure",
    ],
  },

  manali: {
    title: "5 Days in Manali",
    heroImage:
      "https://images.unsplash.com/photo-1548013146-72479768bada", // Mountains
    days: [
      "Day 1: Arrival",
      "Day 2: Solang Valley",
      "Day 3: Rohtang Pass",
      "Day 4: Local Sightseeing",
      "Day 5: Departure",
    ],
  },

  rajasthan: {
    title: "7 Days in Rajasthan",
    heroImage:
      "https://images.unsplash.com/photo-1599661046289-e31897846e41", // Hawa Mahal
    days: [
      "Day 1: Jaipur City Tour",
      "Day 2: Amer Fort & Hawa Mahal",
      "Day 3: Jodhpur & Mehrangarh Fort",
      "Day 4: Udaipur & Lake Pichola",
      "Day 5: Udaipur Sightseeing",
      "Day 6: Desert Safari",
      "Day 7: Departure",
    ],
  },
};


const TripDetails = () => {
  const { tripId } = useParams();
  const trip = tripData[tripId];

  if (!trip) return <h2>Trip not found</h2>;

  return (
    <div className="trip-page">

      {/* HERO WITH DYNAMIC IMAGE */}
      <div
        className="trip-hero"
        style={{
          backgroundImage: `linear-gradient(
            rgba(0,0,0,0.5),
            rgba(0,0,0,0.5)
          ), url(${trip.heroImage})`,
        }}
      >
        <h1>{trip.title}</h1>
        <p>Your perfect travel plan</p>
      </div>

      <div className="trip-content">
        <h2>Day-wise Itinerary</h2>

        <ul className="day-list">
          {trip.days.map((day, index) => (
            <li key={index}>{day}</li>
          ))}
        </ul>

        <Link to="/explore" className="back-link">
          ← Back to Explore
        </Link>
      </div>

    </div>
  );
};

export default TripDetails;
