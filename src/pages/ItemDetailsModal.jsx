import React from 'react';
import d from '../assets/img/d.png'

export default function ItemDetailsModal({ show, item, onClose }) {
    if (!show || !item) return null;

    const imageFields = ['image', 'image1', 'image2'];

    const formatLabel = (key) =>
        key
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, (char) => char.toUpperCase());

    // Split keys evenly for two-column display
    const excludedKeys = ['itemName', ...imageFields];
    const remainingKeys = Object.keys(item).filter((key) => !excludedKeys.includes(key));
    const middleIndex = Math.ceil(remainingKeys.length / 2);
    const leftFields = remainingKeys.slice(0, middleIndex);
    const rightFields = remainingKeys.slice(middleIndex);

    return (
        <div
            className="modal show fade d-block"
            tabIndex="-1"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
            <div className="modal-dialog modal-xl" style={{ width: "50%" }}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" style={{ color: "#0986a7", fontSize: "22px", fontWeight: "600" }}><img src={d} height={30} width={30}></img>&nbsp; Item Details - {item.itemName}</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>

                    <div className="modal-body">
                        {/* Image Row */}
                        <div className="row mb-4 text-center">
                            {imageFields.map((imgKey, idx) => (
                                <div className="col-md-4" key={idx}>
                                    <img
                                        src={item[imgKey]}
                                        alt={`img-${idx}`}
                                        className="img-thumbnail"
                                        style={{ width: '200px', height: '150px', objectFit: 'cover' }}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Data Fields Row */}
                        <div className="row">
                            <div className="col-md-6">
                                {leftFields.map((key, index) => (
                                    <div className="mb-2" key={index}>
                                        <strong>{formatLabel(key)}:</strong> {item[key]}
                                    </div>
                                ))}
                            </div>

                            <div className="col-md-6">
                                {rightFields.map((key, index) => (
                                    <div className="mb-2" key={index}>
                                        <strong>{formatLabel(key)}:</strong> {item[key]}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div style={{
                            display: "flex",
                            justifyContent: "center"
                        }}>
                            <button className="custom-btn-primary" onClick={onClose}>Close</button>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
}
