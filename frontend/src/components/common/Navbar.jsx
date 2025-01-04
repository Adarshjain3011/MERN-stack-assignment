// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-white text-xl">MERN Friends</Link>
        <div>
          <Link to="/login" className="text-white px-4">Login</Link>
          <Link to="/signup" className="text-white px-4">Sign Up</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


