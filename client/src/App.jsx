import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/Forgotpassword";
import Navbar from "./components/Navbar";
import CreateTrip from "./pages/CreateTrip";

import SavedTrips from "./pages/SavedTrips";
import ItineraryResult from "./pages/ItineraryResult";
import StateRecommendation from "./pages/StateRecommendation";   // ✅ ADD

function AppContent() {
  const location = useLocation();

  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/forgot-password";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/create-trip_toggle" element={<CreateTrip />} />

        {/* Saved Trips */}
        <Route path="/my-trips" element={<SavedTrips />} />
        <Route path="/my-trips/:id" element={<ItineraryResult />} />

        {/* ✅ State Recommendation */}
        <Route path="/recommendation/:state" element={<StateRecommendation />} />

      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
