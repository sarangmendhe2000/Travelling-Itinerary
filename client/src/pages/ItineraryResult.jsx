import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ItineraryResult.css";

// ---------------- STATIC ATTRACTIONS ----------------
const attractionData = {

  // 🇮🇳 RAJASTHAN
  Jaipur: {
    day: ["Amer Fort", "City Palace"],
    evening: ["Hawa Mahal", "Local Market"]
  },
  Udaipur: {
    day: ["City Palace", "Lake Pichola"],
    evening: ["Bagore Ki Haveli"]
  },
  Jaisalmer: {
    day: ["Jaisalmer Fort", "Patwon Ki Haveli"],
    evening: ["Sam Sand Dunes"]
  },

  // 🇮🇳 MADHYA PRADESH
  Bhopal: {
    day: ["Upper Lake", "Van Vihar"],
    evening: ["DB Mall"]
  },
  Indore: {
    day: ["Rajwada Palace", "Sarafa Bazaar"],
    evening: ["56 Dukan"]
  },
  Jabalpur: {
    day: ["Bhedaghat", "Dhuandhar Falls"],
    evening: ["Marble Rocks View"]
  },

  // 🇮🇳 MAHARASHTRA
  Mumbai: {
    day: ["Gateway of India", "Elephanta Caves"],
    evening: ["Marine Drive"]
  },
  Pune: {
    day: ["Shaniwar Wada", "Aga Khan Palace"],
    evening: ["FC Road"]
  },
  Nagpur: {
    day: ["Deekshabhoomi", "Futala Lake"],
    evening: ["Sitabuldi Market"]
  },

  // 🇮🇳 UTTAR PRADESH
  Agra: {
    day: ["Taj Mahal", "Agra Fort"],
    evening: ["Mehtab Bagh"]
  },
  Varanasi: {
    day: ["Kashi Vishwanath Temple"],
    evening: ["Ganga Aarti"]
  },
  Lucknow: {
    day: ["Bara Imambara", "Rumi Darwaza"],
    evening: ["Hazratganj Market"]
  },

  // 🇮🇳 KARNATAKA
  Bangalore: {
    day: ["Lalbagh Garden", "Bangalore Palace"],
    evening: ["MG Road"]
  },
  Mysore: {
    day: ["Mysore Palace", "Chamundi Hills"],
    evening: ["Brindavan Gardens"]
  },
  Coorg: {
    day: ["Abbey Falls", "Coffee Plantation"],
    evening: ["Sunset Point"]
  },

  // 🇮🇳 TAMIL NADU
  Chennai: {
    day: ["Marina Beach", "Kapaleeshwarar Temple"],
    evening: ["T Nagar Market"]
  },
  Ooty: {
    day: ["Botanical Garden", "Ooty Lake"],
    evening: ["Doddabetta Peak"]
  },
  Madurai: {
    day: ["Meenakshi Temple"],
    evening: ["Thirumalai Nayakkar Palace"]
  },

  // 🇫🇷 FRANCE
  Paris: {
    day: ["Eiffel Tower", "Louvre Museum"],
    evening: ["Seine River Cruise"]
  },
  Versailles: {
    day: ["Palace of Versailles"],
    evening: ["Garden Walk"]
  },
  Boulogne: {
    day: ["City Museum"],
    evening: ["Town Square"]
  },

  Toulouse: {
    day: ["Capitole", "Saint Sernin Basilica"],
    evening: ["Garonne River Walk"]
  },
  Montpellier: {
    day: ["Place de la Comedie"],
    evening: ["Historic Center"]
  },
  Nimes: {
    day: ["Roman Arena"],
    evening: ["Old Town"]
  },

  Rouen: {
    day: ["Rouen Cathedral"],
    evening: ["Old Market"]
  },
  Caen: {
    day: ["Caen Castle"],
    evening: ["Harbor Walk"]
  },
  "Le Havre": {
    day: ["Beachfront"],
    evening: ["Marina"]
  },

  // 🇮🇹 ITALY
  Rome: {
    day: ["Colosseum", "Roman Forum"],
    evening: ["Trevi Fountain"]
  },
  "Vatican City": {
    day: ["St Peter's Basilica", "Vatican Museums"],
    evening: ["St Peter's Square"]
  },
  Tivoli: {
    day: ["Villa d'Este"],
    evening: ["Town Center"]
  },

  Palermo: {
    day: ["Palermo Cathedral"],
    evening: ["Old Town"]
  },
  Catania: {
    day: ["Mount Etna"],
    evening: ["City Square"]
  },
  Messina: {
    day: ["Messina Cathedral"],
    evening: ["Harbor View"]
  },

  Venice: {
    day: ["St Mark's Square", "Doge's Palace"],
    evening: ["Gondola Ride"]
  },
  Verona: {
    day: ["Juliet's House"],
    evening: ["Piazza Bra"]
  },
  Padua: {
    day: ["Scrovegni Chapel"],
    evening: ["Old Town"]
  },

  // 🇯🇵 JAPAN
  "Tokyo City": {
    day: ["Tokyo Tower", "Senso-ji Temple"],
    evening: ["Shibuya Crossing"]
  },
  Shinjuku: {
    day: ["Shinjuku Gyoen"],
    evening: ["Kabukicho"]
  },
  Shibuya: {
    day: ["Hachiko Statue"],
    evening: ["Shopping Street"]
  },

  Sapporo: {
    day: ["Odori Park"],
    evening: ["Susukino"]
  },
  Hakodate: {
    day: ["Mount Hakodate"],
    evening: ["Bay Area"]
  },
  Otaru: {
    day: ["Otaru Canal"],
    evening: ["Glass Shops"]
  },

  Yokohama: {
    day: ["Minato Mirai"],
    evening: ["Chinatown"]
  },
  Kamakura: {
    day: ["Great Buddha"],
    evening: ["Temple Walk"]
  },
  Kawasaki: {
    day: ["Fujiko Museum"],
    evening: ["Shopping Area"]
  },

  // 🇦🇺 AUSTRALIA
  Brisbane: {
    day: ["South Bank", "Roma Street Parkland"],
    evening: ["Riverwalk"]
  },
  "Gold Coast": {
    day: ["Surfers Paradise", "Beach Time"],
    evening: ["Night Market"]
  },
  Cairns: {
    day: ["Great Barrier Reef"],
    evening: ["Esplanade"]
  },

  Sydney: {
    day: ["Opera House", "Harbour Bridge"],
    evening: ["Circular Quay"]
  },
  Newcastle: {
    day: ["Newcastle Beach"],
    evening: ["Coastal Walk"]
  },
  Wollongong: {
    day: ["North Beach"],
    evening: ["Sea Cliff Bridge"]
  },

  Melbourne: {
    day: ["Federation Square"],
    evening: ["Hosier Lane"]
  },
  Geelong: {
    day: ["Waterfront"],
    evening: ["Pier Walk"]
  },
  Ballarat: {
    day: ["Sovereign Hill"],
    evening: ["Town Center"]
  },

  Perth: {
    day: ["Kings Park"],
    evening: ["Elizabeth Quay"]
  },
  Fremantle: {
    day: ["Fremantle Market"],
    evening: ["Harbor"]
  },
  Bunbury: {
    day: ["Koombana Beach"],
    evening: ["Foreshore Walk"]
  }

};



function ItineraryResult({ tripData }) {

  const { id } = useParams();
  const navigate = useNavigate();

  const [dbTrip, setDbTrip] = useState(null);

  // ---------------- FETCH SAVED TRIP ----------------
  useEffect(() => {
    if (!id) return;

    const fetchTrip = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `http://localhost:5223/api/Trips/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        setDbTrip(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchTrip();
  }, [id]);

  // ---------------- GENERATE ITINERARY ----------------
  const generateItinerary = () => {

    console.log("PLACES RECEIVED:", tripData.places);

    if (!tripData.places || tripData.places.length === 0) {
      return [];
    }

    let result = [];

    const start = new Date(tripData.startDate);
    const end = new Date(tripData.endDate);

    const totalDays =
      Math.round((end - start) / (1000 * 60 * 60 * 24)) + 1;

    for (let i = 0; i < totalDays; i++) {

      const placeIndex = i % tripData.places.length;
      const place = tripData.places[placeIndex].trim();

      const data =
        attractionData[place] || {
          day: ["Local Sightseeing"],
          evening: ["Free Time"],
        };

      result.push({
        dayNumber: i + 1,
        city: place,
        dayPlaces: data.day,
        eveningPlaces: data.evening,
      });
    }

    return result;
  };

  // ✅ GENERATED (CREATE MODE)
  const generatedItinerary = generateItinerary();

  // ✅ DISPLAY (CREATE OR VIEW)
  const displayItinerary =
    id ? dbTrip?.days || [] : generatedItinerary;

  if (id && !dbTrip) {
    return <h3 className="text-center mt-5">Loading trip...</h3>;
  }

  // ---------------- SAVE TRIP ----------------
  const saveTrip = async () => {
    try {

      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      await axios.post(
        "http://localhost:5223/api/Trips/save",
        {
          stateId: tripData.stateId,
          startDate: tripData.startDate,
          endDate: tripData.endDate,
          travelers: tripData.travellers.length,
          budget: tripData.estimatedBudget,
          hotelType: tripData.hotelType,
          transportMode: tripData.transport,
          budgetRange: tripData.budgetRange,

          // ⚡ USE GENERATED ITINERARY ONLY
          itinerary: generatedItinerary.map(day => ({
            dayNumber: day.dayNumber,
            activities: [
              ...day.dayPlaces.map(p => ({
                timeSlot: "Day",
                activityName: p
              })),
              ...day.eveningPlaces.map(p => ({
                timeSlot: "Evening",
                activityName: p
              }))
            ]
          }))
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      alert("Trip saved successfully!");
      navigate(`/recommendation/${tripData.state}`);

    } catch (err) {
      console.log(err);
      alert("Error saving trip");
    }
  };

  // ---------------- UI ----------------
  return (
    <div className="itinerary-wrapper">

      <h2 className="itinerary-title">🗺 Your Trip Itinerary</h2>
      <p className="itinerary-subtitle">Day wise travel plan</p>

      {displayItinerary.map(item => (

        <div key={item.dayNumber} className="day-card">

          <h4>Day {item.dayNumber}</h4>

          {/* DAY */}
          <div className="session">
            <b>🌞 Day Time</b>
            <ul>
              {item.activities
                ? item.activities
                    .filter(a => a.timeSlot === "Day")
                    .map((a, i) => (
                      <li key={i}>{a.activityName}</li>
                    ))
                : item.dayPlaces.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))
              }
            </ul>
          </div>

          {/* EVENING */}
          <div className="session">
            <b>🌙 Evening</b>
            <ul>
              {item.activities
                ? item.activities
                    .filter(a => a.timeSlot === "Evening")
                    .map((a, i) => (
                      <li key={i}>{a.activityName}</li>
                    ))
                : item.eveningPlaces.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))
              }
            </ul>
          </div>

        </div>

      ))}

      {!id && (
        <div className="text-center">
          <button className="btn btn-primary save-btn" onClick={saveTrip}>
            💾 Save Trip & View State Info
          </button>
        </div>
      )}

    </div>
  );
}

export default ItineraryResult;
