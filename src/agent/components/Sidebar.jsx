import React from 'react';
import { Link } from 'react-router-dom';

const AgentSidebar = () => (
  <div className="bg-light border-end" style={{ width: '200px', height: '100vh' }}>
    <div className="list-group list-group-flush">
      <Link to="/agenthome" className="list-group-item list-group-item-action">Dashboard</Link>
      <Link to="/agenthome/add-voucher" className="list-group-item list-group-item-action">Add Voucher</Link>
    </div>
  </div>
);

export default AgentSidebar;
