import React from 'react';
import d from '../assets/img/d.png'; // Use a supplier-related icon if available

export default function SupplierDetailsModal({ show, supplier, onClose }) {
    if (!show || !supplier) return null;

    const formatLabel = (key) =>
        key
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, (char) => char.toUpperCase());

    const excludedKeys = ['image'];
    const keys = Object.keys(supplier).filter((key) => !excludedKeys.includes(key));
    const middleIndex = Math.ceil(keys.length / 2);
    const leftFields = keys.slice(0, middleIndex);
    const rightFields = keys.slice(middleIndex);

    return (
        <div
            className="modal show fade d-block"
            tabIndex="-1"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
            <div className="modal-dialog" style={{
                width: window.innerWidth >= 992 ? '50%' : '100%',
                maxWidth: '100%'
            }}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" style={{ color: "#0986a7", fontSize: "22px", fontWeight: "600" }}>
                            <img src={d} height={30} width={30} alt="icon" />&nbsp;
                            Supplier Details - {supplier.supplierName || 'N/A'}
                        </h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>

                    <div className="modal-body">
                        {/* Optional: Supplier image or logo */}
                        {supplier.image && (
                            <div className="text-center mb-4">
                                <img
                                    src={supplier.image}
                                    alt="Supplier"
                                    className="img-thumbnail"
                                    style={{ width: '200px', height: '150px', objectFit: 'cover' }}
                                />
                            </div>
                        )}

                        {/* Two-column details layout */}
                        <div className="row">
                            <div className="col-md-6">
                                {leftFields.map((key, index) => (
                                    <div className="mb-2" key={index}>
                                        <strong>{formatLabel(key)}:</strong> {supplier[key]}
                                    </div>
                                ))}
                            </div>
                            <div className="col-md-6">
                                {rightFields.map((key, index) => (
                                    <div className="mb-2" key={index}>
                                        <strong>{formatLabel(key)}:</strong> {supplier[key]}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <button className="custom-btn-primary" onClick={onClose}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
