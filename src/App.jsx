import React, { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'; // Importing js-cookie library to work with cookies

import RtlLayout from "layouts/rtl";
import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
import SignIn from "views/auth/SignIn";
import { jwtDecode } from 'jwt-decode';

// Custom route component to handle authentication
const PrivateRoute = ({ element, path }) => {

  // If user is not authenticated and not trying to access the sign-in page, redirect to sign-in page
  if (!isAuthenticated() && path !== "/auth/sign-in") {
    return <Navigate to="/auth/sign-in" replace />;
  }

  // If user is authenticated or trying to access the sign-in page, render the provided element
  return element;
};

// Function to check if user is authenticated
const isAuthenticated = () => {
  // const authToken = Cookies.get("auth");
  const authToken = localStorage.getItem("auth");
  return authToken ? true : false;
}

const App = () => {
  // const authToken = Cookies.get("auth");
  const authToken = localStorage.getItem("auth")
  const navigate = useNavigate();

  useEffect(() => {
    if (authToken) {
      // Decode the JWT token to get its expiration time
      const decodedToken = jwtDecode(authToken);
      // Check if the token is expired
      if (decodedToken.exp * 1000 < Date.now()) {
        // Token is expired, remove it from localStorage
        localStorage.removeItem("auth");
        navigate('/auth/sign-in');
      } else {
        // Token is valid, navigate to admin page
        navigate('/admin/default');
      }
    } else {
      // No auth token found, navigate to sign-in page
      navigate('/auth/sign-in');
    }
  }, []);

  
  return (
    <Routes>
      {!authToken && <Route path="auth/sign-in" element={<SignIn />} />}
      {!authToken && <Route path="auth/*" element={<AuthLayout />} />}
      {/* Protect admin routes using PrivateRoute */}
      <Route path="admin/*" element={<PrivateRoute element={<AdminLayout />} />} />
      {/* Redirect to admin if no specific route matches */}
      <Route path="/" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
};

export default App;
