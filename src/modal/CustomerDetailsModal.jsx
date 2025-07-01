import React from 'react';
import d from '../assets/img/d.png';

export default function CustomerDetailsModal({ show, onClose, customer }) {
  if (!customer) return null;

  return (
    <div
      className={`modal fade ${show ? 'show d-block' : ''}`}
      tabIndex="-1"
      style={{ backgroundColor: show ? 'rgba(0,0,0,0.5)' : 'transparent' }}
    >
      <div className="modal-dialog">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title" style={{ color: "#0986a7", fontSize: "22px", fontWeight: "600" }}>
              <img src={d} height={30} width={30} alt="icon" />
              &nbsp; Customer Details - {customer.cust_full_name}
            </h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <ul className="list-group list-group-flush">
              <li className="list-group-item"><strong>Full Name :</strong> {customer.cust_full_name}</li>
              <li className="list-group-item"><strong>Shop Name :</strong> {customer.cust_shop_name}</li>
              <li className="list-group-item"><strong>Email :</strong> {customer.cust_email}</li>
              <li className="list-group-item"><strong>Contact No :</strong> {customer.cust_contact}</li>
              <li className="list-group-item"><strong>Alternate No :</strong> {customer.cust_alt_contact}</li>
              <li className="list-group-item"><strong>Address :</strong> {customer.cust_address}</li>
              <li className="list-group-item"><strong>Status :</strong> {customer.cust_status}</li>
            </ul>
          </div>

          <div className="modal-footer justify-content-center">
            <button className="custom-btn-primary" onClick={onClose}>Close</button>
          </div>

        </div>
      </div>
    </div>
  );
}
