import React, { useState, useEffect } from 'react';
import r from '../assets/img/return.png';


export default function ReturnModal({ show, onClose, item }) {
    const [returnQuantity, setReturnQuantity] = useState('');
    const [returnReason, setReturnReason] = useState('');

    useEffect(() => {
        if (item) {
            setReturnQuantity(item.quantity); // default quantity
            setReturnReason('');
        }
    }, [item]);

    if (!show) return null;

    const handleConfirmReturn = () => {
        if (!returnQuantity || !returnReason) {
            alert("Please fill in return quantity and reason.");
            return;
        }

        console.log("Return Submitted:", {
            voucherNo: item.voucherNo,
            returnQuantity,
            returnReason,
        });

        // You can call your API here

        onClose();
    };

    return (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" style={{ color: "#0986a7" }}>
                        <img src={r} height={30} width={30}></img> Return Voucher- {item?.supplierName} - {item?.voucherNo}
                        </h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>

                    <div className="modal-body">
                        {/* Two-column layout for fetched item details */}
                        <div className="row mb-2">
                            <div className="col-md-6"><strong>Voucher No:</strong> {item?.jew_voucher}</div>
                            <div className="col-md-6"><strong>Item Name:</strong> {item?.item_name}</div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-md-6"><strong>Supplier Name:</strong> {item?.supplier_name}</div>
                            <div className="col-md-6"><strong>Item Color:</strong> {item?.color_name}</div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-md-6"><strong>Item Shape:</strong> {item?.shape_name}</div>
                            <div className="col-md-6"><strong>Purchase Price:</strong> ₹{item?.jew_vou_purchase_price}</div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-md-6"><strong>Quantity:</strong> {item?.jew_vou_quantity}</div>
                            <div className="col-md-6"><strong>Date:</strong> {item?.jew_vou_sdate}</div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-md-6"><strong>Status:</strong> {item?.jew_vou_appr_status}</div>
                            <div className="col-md-6"><strong>Remark:</strong> {item?.jew_vou_remark}</div>
                        </div>

                        <hr />

                        {/* Input Form Row */}
                        <div className="row mt-3">
                            <div className="col-md-6 mb-3">
                                <label className="form-label"><strong>Return Quantity</strong></label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={returnQuantity}
                                    min={1}
                                    max={item?.quantity}
                                    onChange={(e) => setReturnQuantity(e.target.value)}
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label"><strong>Return Reason</strong></label>
                                <textarea
                                    className="form-control"
                                    rows="3"
                                    value={returnReason}
                                    onChange={(e) => setReturnReason(e.target.value)}
                                    placeholder="Enter reason for return"
                                />
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="d-flex justify-content-center gap-2">
                            <button className="custom-btn-primary" onClick={handleConfirmReturn}>
                                Confirm Return
                            </button>
                            <button className="custom-btn-secondary" onClick={onClose}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
