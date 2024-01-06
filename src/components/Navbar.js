// src/components/Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'; // Update the path to where your logo is saved

const Navbar = () => {
    return (
        <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
            {/* Logo */}
            <Link to="/">
                <img src={logo} alt="PERFIN.AI Logo" className="h-auto w-24 md:w-32" /> {/* Adjust size classes for responsiveness */}
            </Link>

            {/* Navigation Links */}
            <ul className="flex space-x-4">
                <li><Link to="/game">Game</Link></li>
                <li><Link to="/npv">NPV</Link></li>
                <li><Link to="/emi">EMI</Link></li>
                <li><Link to="/financial-plan">Financial Plan</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
