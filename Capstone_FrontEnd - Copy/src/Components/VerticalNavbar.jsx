import React from 'react';
import { Link } from 'react-router-dom'; // Make sure to import Link for routing

const VerticalNavbar = () => {
  return (
    <nav className="vertical-navbar">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/invoice" className="nav-link">
            Invoice
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/driver" className="nav-link">
            Driver
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/bus" className="nav-link">
            Bus
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/customers" className="nav-link">
            Customers
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default VerticalNavbar;
