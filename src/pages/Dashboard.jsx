import React from 'react'
import user from '../assets/img/team.png'
import gh from '../assets/img/hg.png'
import inv from '../assets/img/Inv.png'
import invoice from '../assets/img/invoice.png'
import group from '../assets/img/group.png'
import { Link } from 'react-router-dom'

const Dashboard = () => {

  return (
    <div className="add-dashboard-container py-4">
     <p style={{fontSize:"22px", fontWeight:"700",marginLeft:"30px", color:"#0986a7"}}><img src={user} height={40} width={40}></img> Admin DashBoard</p>
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4 col-xl-3">
            <Link to={'/Pending-req'} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="dashboard-card d-flex justify-content-between align-items-center">
              <div>
                <h5 className="mb-2" style={{color:"#0986a7"}}>Pending Requests</h5>
                <p className="fs-4 fw-bold" style={{color:"#b60e7c"}}>5</p>
              </div>
              <img src={gh} height={50} width={50} alt="Pending" />
            </div>
            </Link>
          </div>
          <div className="col-lg-4 col-xl-3">
             <Link to={'/Pending-req'} style={{ textDecoration: 'none', color: 'inherit' }}>
             <div className="dashboard-card d-flex justify-content-between align-items-center">
              <div>
                <h5 className="mb-2" style={{color:"#0986a7"}}>Invoice</h5>
                <p className="fs-4 fw-bold" style={{color:"#b60e7c"}}>50</p>
              </div>
              <img src={inv} height={50} width={50} alt="Pending" />
            </div>
            </Link>
          </div>
          <div className="col-lg-4 col-xl-3">
             <Link to={'/Pending-req'} style={{ textDecoration: 'none', color: 'inherit' }}>
             <div className="dashboard-card d-flex justify-content-between align-items-center">
              <div>
                <h5 className="mb-2" style={{color:"#0986a7"}}>Inventory</h5>
                <p className="fs-4 fw-bold" style={{color:"#b60e7c"}}>145</p>
              </div>
              <img src={invoice} height={50} width={50} alt="Pending" />
            </div>
            </Link>
          </div>
           <div className="col-lg-4 col-xl-3">
             <Link to={'/Pending-req'} style={{ textDecoration: 'none', color: 'inherit' }}>
             <div className="dashboard-card d-flex justify-content-between align-items-center">
              <div>
                <h5 className="mb-2" style={{color:"#0986a7"}}>All Agents</h5>
                <p className="fs-4 fw-bold" style={{color:"#b60e7c"}}>265</p>
              </div>
              <img src={group} height={50} width={50} alt="Pending" />
            </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
