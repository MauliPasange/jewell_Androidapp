import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
    <Link className="navbar-brand" to="/">Jewell</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav ms-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/">Dashboard</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/admin">Admin</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/masters">Masters</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/orders">Orders</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/inventory">Inventory</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/reports">Reports</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/billing">Billing</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/quotation">Quotation</Link>
        </li>
      </ul>
    </div>
  </nav>
);

export default Navbar;
