import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LandingPage from "./components/Landingpage";
import LoginCredential from "./components/LoginCredential";
import Volunteer from "./components/Volunteer";
import NgoProfile from "./components/NgoProfile";
import VolunteerDashboard from "./components/VolunteerDashboard";
import VolunteerProfile from "./components/VolunteerProfile";
import NGODashboard from "./components/NGODashboard";
import ImpactMap from "./components/ImpactMap";
import FieldReport from "./components/FieldReport";

/*
========================================
TEMPORARY PRIVATE ROUTE
(Replace later with proper JWT auth)
========================================
*/

function PrivateRoute({ children }) {
  // Temporary fake auth check
  const isLoggedIn = true;

  return isLoggedIn ? children : <Navigate to="/" replace />;
}

/*
========================================
APP ROUTES
========================================
*/

function App() {
  return (
    <Router>
      <Routes>
        {/* LANDING PAGE */}
        <Route
          path="/"
          element={<LandingPage />}
        />

        {/* NGO LOGIN */}
        <Route
          path="/ngo-login"
          element={<LoginCredential />}
        />

        {/* VOLUNTEER LOGIN */}
        <Route
          path="/volunteer-login"
          element={<Volunteer />}
        />

        {/* NGO PROFILE */}
        <Route
          path="/ngo-profile/:id"
          element={
            <PrivateRoute>
              <NgoProfile />
            </PrivateRoute>
          }
        />

        {/* NGO DASHBOARD */}
        <Route
          path="/ngo-dashboard"
          element={
            <PrivateRoute>
              <NGODashboard />
            </PrivateRoute>
          }
        />

        {/* VOLUNTEER PROFILE */}
        <Route
          path="/volunteer-profile/:id"
          element={
            <PrivateRoute>
              <VolunteerProfile />
            </PrivateRoute>
          }
        />

        {/* VOLUNTEER DASHBOARD */}
        <Route
          path="/volunteer-dashboard"
          element={
            <PrivateRoute>
              <VolunteerDashboard />
            </PrivateRoute>
          }
        />

        {/* IMPACT MAP */}
        <Route
          path="/impact-map"
          element={
            <PrivateRoute>
              <ImpactMap />
            </PrivateRoute>
          }
        />

        {/* FIELD REPORT */}
        <Route
          path="/field-report"
          element={
            <PrivateRoute>
              <FieldReport />
            </PrivateRoute>
          }
        />

        {/* FALLBACK ROUTE */}
        <Route
          path="*"
          element={
            <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white text-2xl">
              404 — Page Not Found
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;