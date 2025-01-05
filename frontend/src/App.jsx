// src/App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import SignUpPage from './pages/SignupPage';
import LoginPage from "./pages/LoginPage";
import HomePage from './pages/HomePage';

import ProtectedRoute from './components/ProtectedRoute';

import PublicRoute from './components/PublicRoute';

const App = () => {
  return (
    <div className="container mx-auto px-4">
      <Routes>
        <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><SignUpPage /></PublicRoute>} />
      </Routes>
    </div>
  );
};

export default App;
