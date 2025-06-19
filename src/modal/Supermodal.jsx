import React from 'react';
import d from '../assets/img/d.png'

export default function Supermodal({ show, onClose, supplier }) {
  if (!supplier) return null;
  console.log("supplier",supplier);
  return (
    <div className={`modal fade ${show ? 'show d-block' : ''}`} tabIndex="-1" style={{ backgroundColor: show ? 'rgba(0,0,0,0.5)' : 'transparent' }}>
      <div className="modal-dialog">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title" style={{ color: "#0986a7", fontSize: "22px", fontWeight: "600" }}><img src={d} height={30} width={30}></img>&nbsp; Supplier Details - {supplier.jew_sup_supplier_name }</h5>
            {/* <h5 className="modal-title text-primary">supplier Details -  {supplier.supplierNo }</h5> */}
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <ul className="list-group list-group-flush">
              <li className="list-group-item"><strong>Supplier name :</strong> {supplier.jew_sup_supplier_name }</li>
              <li className="list-group-item"><strong>Contact :</strong> {supplier.jew_sup_contact}</li>
              <li className="list-group-item"><strong>Address :</strong> {supplier.jew_sup_address}</li>
              <li className="list-group-item"><strong>GST No :</strong> {supplier.jew_sup_gst_no}</li>
              <li className="list-group-item"><strong>Email :</strong> {supplier.jew_sup_email}</li>
              <li className="list-group-item"><strong>Status :</strong> {supplier.jew_sup_status }</li>
              
            </ul>
          </div>

          <div className="modal-footer justify-content-center">
            <button className="custom-btn-primary" onClick={onClose}>Close</button>
            {/* <button className="btn btn-success">Print</button> */}
          </div>

        </div>
      </div>
    </div>
  );
}
