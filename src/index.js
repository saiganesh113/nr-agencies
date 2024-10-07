import React from 'react';
import ReactDOM from 'react-dom/client'; // Add this line for ReactDOM
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import "assets/css/bootstrap.min.css";
import "assets/scss/now-ui-kit.scss?v=1.5.0";
import "assets/demo/demo.css?v=1.5.0";
import "assets/demo/nucleo-icons-page-styles.css?v=1.5.0";
// Import views and components
import Index from "views/Index.js";
import NucleoIcons from "views/NucleoIcons.js";
import LoginPage from "views/examples/LoginPage.js";
import LandingPage from "views/examples/LandingPage.js";
import ProfilePage from "views/examples/ProfilePage.js";
import UserDashboard from "components/Navbars/UserDashboard";
import SignUp from "views/index-sections/SignUp";
import TechnicianDashboard from "components/Navbars/TechnicianDashboard";
import ServicePage from "views/index-sections/servicespage";
import Login from "superadmin/Login";
import AdminDashboard from "superadmin/Admindashboard";
import Admincalender from "superadmin/Admincalender";
import Adminmailbox from "superadmin/Adminmailbox";
import Adminperformance from "superadmin/Adminperformance";
import Adminsettings from "superadmin/Adminsettings";
import ProtectedRoute from "components/ProtectedRoute.js"; // Import ProtectedRoute
import "components/Navbars/UserDashboard.css";  // Import CSS properly

const root = ReactDOM.createRoot(document.getElementById("root"));
const whatsappLink = `https://wa.me/9494412464?text=Hello!`;
const phoneLink = `tel:9494412464`; // Corrected link

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/index" element={<Index />} />
      <Route path="/nucleo-icons" element={<NucleoIcons />} />
      <Route path="/landing-page" element={<LandingPage />} />
      <Route path="/profile-page" element={<ProfilePage />} />
      <Route path="/login-page" element={<LoginPage />} />
      <Route path="/userdashboard" element={<UserDashboard />} />
      <Route path="/techdashboard" element={<TechnicianDashboard />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/homeservices" element={<ServicePage />} />
      <Route path="/Sreeteq/kingdev376/superadmin/login" element={<Login />} />

      {/* Protected admin routes */}
      <Route path="/Sreeteq/kingdev376/superadmin/admin-dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      <Route path="/Sreeteq/kingdev376/superadmin/admin-calender" element={<ProtectedRoute><Admincalender /></ProtectedRoute>} />
      <Route path="/Sreeteq/kingdev376/superadmin/admin-chat" element={<ProtectedRoute><Adminmailbox /></ProtectedRoute>} />
      <Route path="/Sreeteq/kingdev376/superadmin/admin-performance" element={<ProtectedRoute><Adminperformance /></ProtectedRoute>} />
      <Route path="/Sreeteq/kingdev376/superadmin/admin-settings" element={<ProtectedRoute><Adminsettings /></ProtectedRoute>} />

      {/* Redirect all other paths */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>

    {/* WhatsApp */}
    <div>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-icon btn btn-success rounded-circle"
        >
          <i className="fab fa-whatsapp fa-4x"></i>
        </a>
    </div>

    {/* Phone */}
    <div>
        <a
          href={phoneLink}
          target="_blank"
          className="phone-icon btn btn-success rounded-circle"
        >
          <i className="fas fa-phone fa-4x"></i>
        </a>
    </div>
  </BrowserRouter>
);
