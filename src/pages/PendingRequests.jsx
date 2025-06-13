import React, { useState } from 'react';
import purchase from '../assets/img/purchase.png';
import d from '../assets/img/d.png'
import ReturnModal from './ReturnModal';

export default function PendingRequest() {
    const [selectedStatus, setSelectedStatus] = useState('Pending');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showReturnModal, setShowReturnModal] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);




    const handleApprove = (item) => {
        // ✅ You can also call an API here if needed
        console.log("Approved:", item.voucherNo);

        // Hide the first modal
        const bootstrapModalEl = document.getElementById('detailsModal');
        const modal = bootstrap.Modal.getInstance(bootstrapModalEl);
        if (modal) modal.hide();

        // Show success modal
        setTimeout(() => {
            setShowSuccessModal(true);
        }, 500); // delay to avoid modal conflict
    };

    const handleReject = (item) => {
        console.log("Rejected:", item.voucherNo);

        // Hide the first modal
        const bootstrapModalEl = document.getElementById('detailsModal');
        const modal = bootstrap.Modal.getInstance(bootstrapModalEl);
        if (modal) modal.hide();

        // Show reject success modal after short delay
        setTimeout(() => {
            setShowRejectModal(true);
        }, 500);
    };


    const data = {
        Pending: [
            {
                voucherNo: 'VOUJE001',
                itemName: 'Gold Ring',
                quantity: 2,
                status: 'Pending',
                date: '2025-06-09',
                supplierName: 'Shree Jewellers',
                itemColor: 'Yellow',
                itemShape: 'Round',
                purchasePrice: 12000,
                remark: 'Urgent delivery'
            },
            {
                voucherNo: 'VOUJE002',
                itemName: 'Silver Chain',
                quantity: 1,
                status: 'Pending',
                date: '2025-06-08',
                supplierName: 'Om Silver',
                itemColor: 'White',
                itemShape: 'Oval',
                purchasePrice: 4000,
                remark: 'Custom length'
            }
        ],
        Approved: [
            {
                voucherNo: 'VOUJE003',
                itemName: 'Diamond Pendant',
                quantity: 1,
                status: 'Approved',
                date: '2025-06-07',
                supplierName: 'Raj Diamonds',
                itemColor: 'Clear',
                itemShape: 'Teardrop',
                purchasePrice: 25000,
                remark: 'Premium quality'
            },
            {
                voucherNo: 'VOUJE001',
                itemName: 'Gold Ring',
                quantity: 2,
                status: 'Approved',
                date: '2025-06-06',
                supplierName: 'Shree Jewellers',
                itemColor: 'Yellow',
                itemShape: 'Round',
                purchasePrice: 12000,
                remark: 'Repeat order'
            }
        ],
        Rejected: [
            {
                voucherNo: 'VOUJE004',
                itemName: 'Gold Necklace',
                quantity: 1,
                status: 'Rejected',
                date: '2025-06-05',
                supplierName: 'Sona Jewels',
                itemColor: 'Gold',
                itemShape: 'Crescent',
                purchasePrice: 18000,
                remark: 'Incorrect weight'
            },
            {
                voucherNo: 'VOUJE002',
                itemName: 'Silver Chain',
                quantity: 1,
                status: 'Rejected',
                date: '2025-06-04',
                supplierName: 'Om Silver',
                itemColor: 'White',
                itemShape: 'Oval',
                purchasePrice: 4000,
                remark: 'Customer returned'
            }
        ]
    };


    // 🧠 Function to handle search
    const searchReport = (e) => {
        setSearchTerm(e.target.value);
    };

    // 🧠 Filtered list based on search term and selected status
    const filteredData = data[selectedStatus].filter(item =>
        item.voucherNo.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                                <td>{item.voucherNo}</td>
                                <td>{item.supplierName}</td>
                                <td className="d-none d-md-table-cell">{item.quantity}</td>
                                <td className="d-none d-md-table-cell">{item.date}</td>
                                <td>
                                    <span className={`voucher-badge ${item.status === 'Approved' ? 'bg-success' :
                                        item.status === 'Rejected' ? 'bg-danger' : 'bg-warning text-dark'}`}>
                                        {item.status}
                                    </span>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>


                {/* Bootstrap Modal */}
                <div className="modal fade" id="detailsModal" tabIndex="-1" aria-labelledby="detailsModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" style={{ marginTop: "-15px" }}>
                        <div className="modal-content">
                            {selectedItem && (
                                <>
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="detailsModalLabel" style={{ color: "#0986a7" }}><img src={d} height={30} width={30}></img> &nbsp;{selectedItem.supplierName}-{selectedItem.voucherNo}</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <p><strong>Voucher No:</strong> {selectedItem.voucherNo}</p>
                                        <p><strong>Item Name:</strong> {selectedItem.itemName}</p>
                                        <p><strong>Supplier Name:</strong> {selectedItem.supplierName}</p>
                                        <p><strong>Item Color:</strong> {selectedItem.itemColor}</p>
                                        <p><strong>Item Shape:</strong> {selectedItem.itemShape}</p>
                                        <p><strong>Purchase Price:</strong> ₹{selectedItem.purchasePrice}</p>
                                        <p><strong>Quantity:</strong> {selectedItem.quantity}</p>
                                        <p><strong>Date:</strong> {selectedItem.date}</p>
                                        <p><strong>Status:</strong> {selectedItem.status}</p>
                                        <p><strong>Remark:</strong> {selectedItem.remark}</p>

                                        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                                            {selectedItem.status === "Pending" && (
                                                <>
                                                    <button className="custom-btn-primary" onClick={() => handleApprove(selectedItem)}>
                                                        Approve
                                                    </button>
                                                    <button className="custom-btn-secondary" onClick={() => handleReject(selectedItem)}>
                                                        Reject
                                                    </button>
                                                    <button className="custom-btn-primary" onClick={() => {
                                                        const modal = bootstrap.Modal.getInstance(document.getElementById('detailsModal'));
                                                        if (modal) modal.hide();
                                                        setShowReturnModal(true);
                                                    }}>
                                                        Return
                                                    </button>
                                                </>
                                            )}
                                            <button className="custom-btn-secondary" data-bs-dismiss="modal">Close</button>
                                        </div>

                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </table>

            {/* ✅ Success Modal */}
            <div
                className={`modal fade ${showSuccessModal ? 'show d-block' : ''}`}
                tabIndex="-1"
                style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            >
                <div className="modal-dialog" style={{ marginTop: "100px" }}>
                    <div className="modal-content">
                        <div className="modal-header justify-content-center position-relative">
                            <h5 className="modal-title text-center w-100" style={{ color: "#28a745", fontSize: "22px", fontWeight: "600" }}>
                                {selectedItem ? `${selectedItem.supplierName} - ${selectedItem.voucherNo}` : ''}
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
                                onClick={() => setShowSuccessModal(false)}

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
                                {selectedItem ? `${selectedItem.supplierName} - ${selectedItem.voucherNo}` : ''}
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
                                onClick={() => setShowRejectModal(false)}
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
