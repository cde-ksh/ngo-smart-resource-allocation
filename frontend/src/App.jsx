import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/Landingpage';
import LoginCredential from './components/LoginCredential';
import Volunteer from "./components/Volunteer";
import NgoProfile from "./components/NgoProfile";
import VolunteerDashboard from "./components/VolunteerDashboard";
import VolunteerProfile from "./components/VolunteerProfile";
import NGODashboard from "./components/NGODashboard";
import ImpactMap from "./components/ImpactMap";
import FieldReport from "./components/FieldReport";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/ngo-auth" element={<LoginCredential />} />
        <Route path="/volunteer-auth" element={<Volunteer />} />
        <Route path="/ngo-profile" element={<NgoProfile />} />
        <Route path="/dashboard" element={<NGODashboard />} />
        <Route path="/volunteer-dashboard" element={<VolunteerDashboard />} />
        <Route path="/volunteer-profile" element={<VolunteerProfile />} />
        <Route path="/impact-map" element={<ImpactMap />} />
        <Route path="/field-report" element={<FieldReport />} />
      </Routes>
    </Router>
  );
}
export default App;