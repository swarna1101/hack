import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'; // Update the path to where your logo is saved

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="PERFIN.AI Logo" className="h-16" /> {/* Adjust size as needed */}
        </Link>

        {/* Navigation Links */}
        <ul className="flex space-x-4">
          <li>
            <Link to="/game" className="hover:text-gray-400">
              Game
            </Link>
          </li>
          <li>
            <Link to="/npv" className="hover:text-gray-400">
              NPV
            </Link>
          </li>
          <li>
            <Link to="/emi" className="hover:text-gray-400">
              EMI
            </Link>
          </li>
          <li>
            <Link to="/financial-plan" className="hover:text-gray-400">
              Financial Plan
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
