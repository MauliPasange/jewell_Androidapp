import React from 'react';

export default function VoucherDetailModal({ show, onClose, voucher }) {
  if (!voucher) return null;
  
  return (
    <div className={`modal fade ${show ? 'show d-block' : ''}`} tabIndex="-1" style={{ backgroundColor: show ? 'rgba(0,0,0,0.5)' : 'transparent' }}>
      <div className="modal-dialog">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">Voucher Details</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <ul className="list-group list-group-flush">
              <li className="list-group-item"><strong>Voucher No.:</strong> {voucher.voucherNo }</li>
              <li className="list-group-item"><strong>Item Name:</strong> {voucher.itemName}</li>
              <li className="list-group-item"><strong>Item Shape:</strong> {voucher.shape}</li>
              <li className="list-group-item"><strong>Item Color:</strong> {voucher.color}</li>
              <li className="list-group-item"><strong>Quantity:</strong> {voucher.quantity}</li>
              <li className="list-group-item"><strong>Purchase Price:</strong> ₹{voucher.purchasePrice}</li>
              <li className="list-group-item"><strong>Status:</strong> {voucher.status }</li>
              <li className="list-group-item"><strong>Remark:</strong> {voucher.remark }</li>
            </ul>
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>Close</button>
            <button className="btn btn-success">Print</button>
          </div>

        </div>
      </div>
    </div>
  );
}
