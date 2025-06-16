import React from 'react'

import user from '../../assets/img/team.png'
import gh from '../../assets/img/hg.png'
import inv from '../../assets/img/Inv.png'


import { Link } from 'react-router-dom'

const Dashboard = () => {


  return (
    <div className="add-dashboard-container py-4">
     <p style={{fontSize:"22px", fontWeight:"700",marginLeft:"30px", color:"#0986a7"}}><img src={user} height={40} width={40}></img> Agent DashBoard</p>

      <div className="container">
        <div className="row g-4">
          <div className="col-lg-3">
            <Link to={'/agenthome/all-vouchers'} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="dashboard-card d-flex justify-content-between align-items-center">
              <div>
                <h5 className="mb-2" style={{color:"#0986a7"}}>All Vouchers</h5>
                <p className="fs-4 fw-bold" style={{color:"#b60e7c"}}>5</p>
              </div>
               <img src={gh} height={50} width={50} alt="Pending" /> 
            </div>
            </Link>
          </div>
          <div className="col-lg-3">
             <Link to={'/agenthome/add-voucher'} style={{ textDecoration: 'none', color: 'inherit' }}>
             <div className="dashboard-card d-flex justify-content-between align-items-center">
              <div>
                <h5 className="mb-2" style={{color:"#0986a7"}}>Add Vouchers</h5>
                <p className="fs-4 fw-bold" style={{color:"#b60e7c"}}>50</p>
              </div>
               <img src={inv} height={50} width={50} alt="Pending" /> 
            </div>
            </Link>
          </div>
          
           
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
