import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './component/Landingpage';
import LoginCredential from './component/LoginCredential';
import Volunteer from './component/Volunteer';
import NgoProfile from './component/NgoProfile';
import VolunteerDashboard from './component/VolunteerDashboard';
import VolunteerProfile from './component/VolunteerProfile';
import NGODashboard from './component/NGODashboard';
import ImpactMap from './component/ImpactMap';
import FieldReport from './component/FieldReport';

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