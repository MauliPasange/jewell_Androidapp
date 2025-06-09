import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => (
  <div className="bg-light border-end" style={{ width: '200px', height: '100vh' }}>
    <div className="list-group list-group-flush">
      <Link to="/" className="list-group-item list-group-item-action">Dashboard</Link>
      <Link to="/admin" className="list-group-item list-group-item-action">Admin</Link>
      <Link to="/masters" className="list-group-item list-group-item-action">Masters</Link>
      <Link to="/orders" className="list-group-item list-group-item-action">Orders</Link>
      <Link to="/inventory" className="list-group-item list-group-item-action">Inventory</Link>
      <Link to="/reports" className="list-group-item list-group-item-action">Reports</Link>
      <Link to="/billing" className="list-group-item list-group-item-action">Billing</Link>
      <Link to="/quotation" className="list-group-item list-group-item-action">Quotation</Link>
      
    </div>
  </div>
);

export default Sidebar;
