// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';

import { IoIosNotifications } from "react-icons/io";

import {clearUserData} from "../../redux/UserSlice";

import { useDispatch } from 'react-redux';

const Navbar = () => {

  const { loggedIn } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  console.log(loggedIn);


  function logoutHandler(){

      dispatch(clearUserData());


  }

  return (
    <nav className="bg-blue-500 fixed top-0 z-50 w-screen mb-14 py-3">
      <div className="flex justify-between items-center px-8">
        <Link to="/" className="text-white text-xl">MERN Friends</Link>
        {

          !loggedIn ? (<div>

            <Link to="/login" className="text-white px-4">Login</Link>
            <Link to="/signup" className="text-white px-4">Sign Up</Link>
          </div>) : (

            <div className='flex gap-6'>

              <IoIosNotifications></IoIosNotifications>

              <button onClick={logoutHandler}>Logout</button>

            </div>

          )

        }
      </div>
    </nav>
  );
};

export default Navbar;


