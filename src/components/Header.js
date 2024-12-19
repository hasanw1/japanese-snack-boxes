import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';

function Header() {
  return (
    <header className="bg-red-500 text-white sticky top-0 z-50">
      <nav className="container mx-auto p-4 flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <Link to='/' className="logo font-bold text-2xl">Japanese Snacks</Link>
          <ul className="flex space-x-6">
            <li className="relative group">
              <Link to="/" className="hover:text-yellow-300 transition duration-300 ease-in-out">Snack Box</Link>
              <div className="absolute left-0 mt-2 hidden group-hover:block bg-red-500 text-white p-4 shadow-lg rounded-lg">
                <Link to="/subscribe" className="block hover:bg-gray-100 p-2 rounded">Current Box</Link>
                <Link to="/upcoming-box" className="block hover:bg-gray-100 p-2 rounded">Upcoming Box</Link>
                <Link to="/past-boxes" className="block hover:bg-gray-100 p-2 rounded">Past Boxes</Link>
              </div>
            </li>
            <li className="relative group">
              <Link to="/about" className="hover:text-yellow-300 transition duration-300 ease-in-out">About Us</Link>
              <div className="absolute left-0 mt-2 hidden group-hover:block bg-red-500 text-white p-4 shadow-lg rounded-lg">
                <Link to="/our-story" className="block hover:bg-gray-100 p-2 rounded">Our Story</Link>
              </div>
            </li>
          </ul>
        </div>
        <div className="flex items-center space-x-6">
          <Link to="/cart" className="hover:text-yellow-300 transition duration-300 ease-in-out">
            <FontAwesomeIcon icon={faShoppingCart} size="lg" />
          </Link>
          <Link to="/login" className="hover:text-yellow-300 transition duration-300 ease-in-out">
            <FontAwesomeIcon icon={faUser} size="lg" />
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;