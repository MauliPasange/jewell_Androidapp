import React from 'react';
import d from '../assets/img/d.png';

export default function DeliveryChallanModal({ show, item, onClose }) {
  if (!show || !item) return null;

  const formatLabel = (key) =>
    key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (char) => char.toUpperCase());

  const allKeys = Object.keys(item);
  const middleIndex = Math.ceil(allKeys.length / 2);
  const leftFields = allKeys.slice(0, middleIndex);
  const rightFields = allKeys.slice(middleIndex);

  return (
    <div
      className="modal show fade d-block"
      tabIndex="-1"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
    >
      <div
        className="modal-dialog"
        style={{
          width: window.innerWidth >= 992 ? '50%' : '100%',
          maxWidth: '100%',
          marginTop:"5%"
        }}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5
              className="modal-title"
              style={{ color: '#0986a7', fontSize: '22px', fontWeight: '600' }}
            >
              <img src={d} height={30} width={30} alt="icon" />
              &nbsp; Delivery Challan - {item.itemName}
            </h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <div className="row">
              <div className="col-md-6">
                {leftFields.map((key, index) => (
                  <div className="mb-2" key={index}>
                    <strong>{formatLabel(key)}:</strong> {item[key] || '—'}
                  </div>
                ))}
              </div>

              <div className="col-md-6">
                {rightFields.map((key, index) => (
                  <div className="mb-2" key={index}>
                    <strong>{formatLabel(key)}:</strong> {item[key] || '—'}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button className="custom-btn-primary" onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
