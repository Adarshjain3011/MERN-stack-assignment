// src/pages/SignUpPage.jsx
import React, { useState } from 'react';
// import {u} from "react-router-dom"
import axios from '../axios';

const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
//   const history = useHistory();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/signup', { username, password });
    //   history.push('/login');
    } catch (err) {
      console.error('Error signing up', err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 border rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;


