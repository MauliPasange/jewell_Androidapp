import React, { useEffect, useState } from 'react';
import purchase from '../assets/img/purchase.png';
import d from '../assets/img/d.png';
import axios from 'axios';
import ReturnModal from './ReturnModal';
import { apiConfig } from "../../src/config";

export default function PendingRequest() {
    const [selectedStatus, setSelectedStatus] = useState('Pending');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showReturnModal, setShowReturnModal] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [allVouchers, setAllVouchers] = useState([]); // ✅ State for fetched vouchers
    const Base_URL = apiConfig.getBaseURL();
    const authApiKey = apiConfig.getApiKey();
    const [showApproveConfirm, setShowApproveConfirm] = useState(false);
    const [voucherToApprove, setVoucherToApprove] = useState(null);
    const [showRejectConfirm, setShowRejectConfirm] = useState(false);
    const [voucherToReject, setVoucherToReject] = useState(null);

    useEffect(() => {
        fetchVouchers();
    }, []);

    const fetchVouchers = async () => {
        try {
            const response = await axios.get(`${Base_URL}/inward/getAllVouchers`, {
                headers: {
                    "x-api-key": authApiKey,
                }
            }); // 🔁 Replace with your actual API
            setAllVouchers(response.data.data); // Adjust if your API wraps data differently
            console.log(response.data.data);

        } catch (error) {
            console.error('Error fetching vouchers:', error);
        }
    };

    const searchReport = (e) => {
        setSearchTerm(e.target.value);
    };

    // 🧠 Filtered list based on search term and selected status
    const filteredData = allVouchers
        .filter(item => item.jew_vou_appr_status === selectedStatus)
        .filter(item => item.jew_voucher.toLowerCase().includes(searchTerm.toLowerCase()));

    const openModal = (item) => {
        setSelectedItem(item);
        const modal = new bootstrap.Modal(document.getElementById('detailsModal'));
        modal.show();
    };
    return (
        <div className='add-dashboard-container p-3'>
            {/* Header with Search */}
            <div className="row align-items-center mb-3">
                {/* Icon + Title */}
                <div className="col-12 col-md-4 d-flex align-items-center justify-content-center justify-content-md-start mb-2 mb-md-0">
                    <img src={purchase} height={40} width={40} alt="icon" />
                    <span
                        style={{
                            fontSize: "22px",
                            fontWeight: "700",
                            color: "#0986a7",
                            marginLeft: "8px"
                        }}
                    >
                        All Voucher's Details
                    </span>
                </div>

                {/* Search Field */}
                <div className="col-12 col-md-4 d-flex justify-content-center mt-3 mb-md-0">
                    <div className="search-container position-relative w-100" style={{ maxWidth: "300px" }}>
                        <input
                            type="text"
                            placeholder="Search by Voucher No"
                            value={searchTerm}
                            onChange={searchReport}
                            className="form-control search-input-Field"
                        />
                        {searchTerm && (
                            <button
                                className="clear-icon position-absolute top-50 end-0 translate-middle-y me-2 border-0 bg-transparent"
                                onClick={() => setSearchTerm('')}
                            >
                                <i className="bi bi-x-circle"></i>
                            </button>
                        )}
                    </div>
                </div>

                {/* Status Buttons */}
                <div className="col-12 col-md-4 d-flex justify-content-center justify-content-md-end gap-2">
                    {['Pending', 'Approved', 'Rejected'].map((status) => (
                        <button
                            key={status}
                            className={`voucher-custom-btn ${selectedStatus === status ? 'selected' : ''}`}
                            onClick={() => setSelectedStatus(status)}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table View */}
            <table className="table voucher-table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>Sr.No.</th>
                        <th>Voucher No</th>
                        <th>Supplier Name</th>
                        <th className="d-none d-md-table-cell">Quantity</th>
                        <th className="d-none d-md-table-cell">Date</th>
                        <th>Status</th>

                    </tr>
                </thead>
                <tbody>
                    {filteredData.length === 0 ? (
                        <tr>
                            <td colSpan="6" className="text-center">No matching records found</td>
                        </tr>
                    ) : (
                        filteredData.map((item, idx) => (
                            <tr key={idx} style={{ cursor: 'pointer' }} onClick={() => openModal(item)}>
                                <td>{idx + 1}</td>
                                <td>{item.jew_voucher}</td>
                                <td>{item.supplier_name}</td>
                                <td className="d-none d-md-table-cell">{item.jew_vou_quantity}</td>
                                <td className="d-none d-md-table-cell">{item.jew_vou_sdate}</td>
                                <td>
                                    <span className={`voucher-badge ${item.jew_vou_appr_status === 'Approved' ? 'bg-success' :
                                        item.jew_vou_appr_status === 'Rejected' ? 'bg-danger' : 'bg-warning text-dark'}`}>
                                        {item.jew_vou_appr_status}
                                    </span>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>



            </table>
            {/* Bootstrap Modal */}
            <div className="modal fade" id="detailsModal" tabIndex="-1" aria-labelledby="detailsModalLabel" aria-hidden="true">
                <div className="modal-dialog" style={{ marginTop: "5%" }}>
                    <div className="modal-content">
                        {selectedItem && (
                            <>
                                <div className="modal-header">
                                    <h5 className="modal-title" id="detailsModalLabel" style={{ color: "#0986a7" }}><img src={d} height={30} width={30}></img> &nbsp;{selectedItem.supplier_name}-{selectedItem.jew_voucher}</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <p><strong>Voucher No:</strong> {selectedItem.jew_voucher}</p>
                                    <p><strong>Item Name:</strong> {selectedItem.item_name}</p>
                                    <p><strong>Supplier Name:</strong> {selectedItem.supplier_name}</p>
                                    <p><strong>Item Color:</strong> {selectedItem.color_name}</p>
                                    <p><strong>Item Shape:</strong> {selectedItem.shape_name}</p>
                                    <p><strong>Purchase Price:</strong> ₹{selectedItem.jew_vou_purchase_price}</p>
                                    <p><strong>Quantity:</strong> {selectedItem.jew_vou_quantity}</p>
                                    <p><strong>Date:</strong> {selectedItem.jew_vou_sdate}</p>
                                    <p><strong>Status:</strong> {selectedItem.jew_vou_appr_status}</p>
                                    <p><strong>Remark:</strong> {selectedItem.jew_vou_remark}</p>

                                    <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                                        {selectedItem.jew_vou_appr_status === "Pending" && (
                                            <>
                                                <button
                                                    className="custom-btn-primary req-btn"
                                                    onClick={() => {
                                                        setVoucherToApprove(selectedItem);
                                                        setShowApproveConfirm(true);
                                                    }}
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    className="custom-btn-secondary req-btn"
                                                    onClick={() => {
                                                        setVoucherToReject(selectedItem);
                                                        setShowRejectConfirm(true);
                                                    }}
                                                >
                                                    Reject
                                                </button>
                                                <button className="custom-btn-primary req-btn" onClick={() => {
                                                    const modal = bootstrap.Modal.getInstance(document.getElementById('detailsModal'));
                                                    if (modal) modal.hide();
                                                    setShowReturnModal(true);
                                                }}>
                                                    Return
                                                </button>
                                            </>
                                        )}
                                        <button className="custom-btn-secondary req-btn" data-bs-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {showApproveConfirm && (
                <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <div className="modal-dialog" style={{ marginTop: "150px" }}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirm Approval</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowApproveConfirm(false)}
                                ></button>
                            </div>
                            <div className="modal-body text-center">
                                <p>Are you sure you want to approve this voucher?</p>
                                <button
                                    className="btn btn-success me-2"
                                    onClick={async () => {
                                        // ✅ CALL the web service here
                                        try {
                                            const response = await axios.post(`${Base_URL}/inward/approveVoucherByAdmin`, {
                                                voucherId: voucherToApprove.jew_vou_id,
                                                adminId: 1// Replace with actual admin ID
                                            }, {
                                                headers: { "x-api-key": authApiKey }
                                            });

                                            console.log("API Success:", response.data);
                                            setShowApproveConfirm(false);
                                            setShowSuccessModal(true);
                                            fetchVouchers(); // Refresh data
                                        } catch (error) {
                                            console.error("Approval failed:", error);
                                            alert("Something went wrong during approval.");
                                        }
                                    }}
                                >
                                    Yes, Approve
                                </button>
                                <button className="btn btn-secondary" onClick={() => setShowApproveConfirm(false)}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showRejectConfirm && (
                <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <div className="modal-dialog" style={{ marginTop: "150px" }}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirm Rejection</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowRejectConfirm(false)}
                                ></button>
                            </div>
                            <div className="modal-body text-center">
                                <p>Are you sure you want to reject this voucher?</p>
                                <button
                                    className="btn btn-success me-2"
                                    onClick={async () => {
                                        // ✅ CALL the web service here
                                        try {
                                            const response = await axios.post(`${Base_URL}/inward/rejectVoucherByAdmin`, {
                                                voucherId: voucherToReject.jew_vou_id,
                                                adminId: 1// Replace with actual admin ID
                                            }, {
                                                headers: { "x-api-key": authApiKey }
                                            });

                                            console.log("API Success:", response.data);
                                            setShowRejectConfirm(false);
                                            setShowRejectModal(true);
                                            fetchVouchers(); // Refresh data
                                        } catch (error) {
                                            console.error("Rejection failed:", error);
                                            alert("Something went wrong during Reject the request.");
                                        }
                                    }}
                                >
                                    Yes, Reject
                                </button>
                                <button className="btn btn-secondary" onClick={() => setShowApproveConfirm(false)}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}


            {/* ✅ Success Modal */}
            <div
                className={`modal fade ${showSuccessModal ? 'show d-block' : ''}`}
                tabIndex="-1"
                style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            >
                <div className="modal-dialog" style={{ marginTop: "150px" }}>
                    <div className="modal-content">
                        <div className="modal-header justify-content-center position-relative">
                            <h5 className="modal-title text-center w-100" style={{ color: "#28a745", fontSize: "22px", fontWeight: "600" }}>
                                {selectedItem ? `${selectedItem.supplier_name} - ${selectedItem.jew_voucher}` : ''}
                            </h5>
                            <button
                                type="button"
                                className="btn-close position-absolute end-0 me-3"
                                onClick={() => setShowSuccessModal(false)}
                            ></button>
                        </div>

                        <div className="modal-body text-center">
                            <p><strong>Request approved successfully!</strong></p>
                            <button
                                className="btn btn-success"
                                onClick={() => {
                                    setShowSuccessModal(false); // Hide success modal

                                    // Close the detailsModal if open
                                    const bootstrapModalEl = document.getElementById('detailsModal');
                                    const modal = bootstrap.Modal.getInstance(bootstrapModalEl);
                                    if (modal) modal.hide();
                                }}
                            >
                                OK
                            </button>

                        </div>
                    </div>
                </div>
            </div>
            {/* ❌ Reject Success Modal */}
            <div
                className={`modal fade ${showRejectModal ? 'show d-block' : ''}`}
                tabIndex="-1"
                style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            >
                <div className="modal-dialog" style={{ marginTop: "100px" }}>
                    <div className="modal-content">
                        <div className="modal-header justify-content-center position-relative">
                            <h5 className="modal-title text-center w-100" style={{ color: "#dc3545", fontSize: "22px", fontWeight: "600" }}>
                                {selectedItem ? `${selectedItem.supplier_name} - ${selectedItem.jew_voucher}` : ''}
                            </h5>
                            <button
                                type="button"
                                className="btn-close position-absolute end-0 me-3"
                                onClick={() => setShowRejectModal(false)}
                            ></button>
                        </div>

                        <div className="modal-body text-center">
                            <p><strong>Request rejected successfully!</strong></p>
                            <button
                                className="btn btn-danger"

                                onClick={() => {
                                    setShowSuccessModal(false)
                                     setShowRejectModal(false)
                                    // Close the detailsModal if open
                                    const bootstrapModalEl = document.getElementById('detailsModal');
                                    const modal = bootstrap.Modal.getInstance(bootstrapModalEl);
                                    if (modal) modal.hide();
                                }}
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <ReturnModal
                show={showReturnModal}
                onClose={() => setShowReturnModal(false)}
                item={selectedItem}
            />


        </div>

    );
}
