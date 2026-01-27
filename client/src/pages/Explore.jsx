import "./Explore.css";
import { Link } from "react-router-dom";


const destinations = [
  {
    name: "Goa",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    type: "Beach",
  },
  {
    name: "Manali",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada",
    type: "Hill",
  },
  {
    name: "Jaipur",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41", // ✅ WORKING
    type: "Heritage",
  },
  {
    name: "Kerala",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944",
    type: "Nature",
  },
];

const Explore = () => {
  return (
    <div className="explore-page">

      {/* Hero Section */}
      <div className="explore-hero">
        <h1>Explore Destinations</h1>
        <p>Discover beautiful places & ready-made itineraries</p>

        <input
          type="text"
          placeholder="Search destination..."
          className="search-box"
        />
      </div>

      {/* Destination Section */}
      <section className="section">
        <h2>Popular Destinations</h2>

        <div className="card-grid">
          {destinations.map((place, index) => (
            <div className="destination-card" key={index}>
              <img src={place.image} alt={place.name} />
              <div className="card-content">
                <h3>{place.name}</h3>
                <span>{place.type}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Itinerary Section */}
      <section className="section">
        <h2>Ready-Made Itineraries</h2>

        <div className="itinerary-grid">
          <div className="itinerary-card">
            <h3>3 Days in Goa</h3>
            <p>Beaches • Nightlife • Relax</p>
            <Link to="/trip/goa">View Plan</Link>
          </div>

          <div className="itinerary-card">
            <h3>5 Days in Manali</h3>
            <p>Snow • Adventure • Mountains</p>
            <Link to="/trip/manali">View Plan</Link>
          </div>

          <div className="itinerary-card">
            <h3>7 Days Rajasthan</h3>
            <p>Forts • Culture • Heritage</p>
            <Link to="/trip/rajasthan">View Plan</Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Explore;
