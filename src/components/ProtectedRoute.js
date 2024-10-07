import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('superAdminToken');

  if (!token) {
    console.log("No token found. Redirecting to login.");
    return <Navigate to="/Sreeteq/kingdev376/superadmin/login" replace />;
  }

  return children;
};

export default ProtectedRoute;