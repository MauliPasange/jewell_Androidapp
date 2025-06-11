import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import VoucherDetailModal from "../modal/VoucherDetailModal";

export default function AllVouchers() {
  const [formData, setFormData] = useState({
    itemName: "",
    itemShape: "",
    itemColor: "",
    quantity: "",
    purchasePrice: "",
    remark: "",
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState(null);

  const vouchers = [
    {
      id: "v001",
      voucherNo: "VC001",
      itemName: "Gems",
      shape: "Round",
      color: "Black",
      quantity: 10,
      purchasePrice: 1500,
      status: "Active",
      remark: "Urgent delivery",
    },
    {
      id: "v002",
      voucherNo: "VC002",
      itemName: "Pearls",
      shape: "Oval",
      color: "Yellow",
      quantity: 5,
      purchasePrice: 2000,
      status: "Active",
      remark: "Regular delivery",
    },
    {
      id: "v003",
      voucherNo: "VC003",
      itemName: "Stones",
      shape: "Square",
      color: "Blue",
      quantity: 7,
      purchasePrice: 1750,
      status: "Inactive",
      remark: "High priority",
    },
    {
      id: "v004",
      voucherNo: "VC004",
      itemName: "Gems",
      shape: "Round",
      color: "Green",
      quantity: 12,
      purchasePrice: 2200,
      status: "Active",
      remark: "High priority",
    },
    {
      id: "v005",
      voucherNo: "VC005",
      itemName: "Pearls",
      shape: "Square",
      color: "White",
      quantity: 8,
      purchasePrice: 1600,
      status: "Inactive",
      remark: "Urgent delivery",
    },
    {
      id: "v006",
      voucherNo: "VC006",
      itemName: "Stones",
      shape: "Oval",
      color: "Gray",
      quantity: 6,
      purchasePrice: 1900,
      status: "Active",
      remark: "Regular delivery",
    },
    {
      id: "v007",
      voucherNo: "VC007",
      itemName: "Diamonds",
      shape: "Princess",
      color: "Clear",
      quantity: 3,
      purchasePrice: 5000,
      status: "Active",
      remark: "Special order",
    },
    {
      id: "v008",
      voucherNo: "VC008",
      itemName: "Emeralds",
      shape: "Octagon",
      color: "Green",
      quantity: 4,
      purchasePrice: 4500,
      status: "Active",
      remark: "Client meeting",
    },
    {
      id: "v009",
      voucherNo: "VC009",
      itemName: "Rubies",
      shape: "Heart",
      color: "Red",
      quantity: 2,
      purchasePrice: 6000,
      status: "Inactive",
      remark: "On hold",
    },
    {
      id: "v010",
      voucherNo: "VC010",
      itemName: "Sapphires",
      shape: "Pear",
      color: "Blue",
      quantity: 9,
      purchasePrice: 3000,
      status: "Active",
      remark: "New arrival",
    },
  ];

  const [msg, setMsg] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // You can adjust this number
  const totalPages = Math.ceil(vouchers.length / itemsPerPage);

  const navigate = useNavigate();

  // Handle window resize to determine mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust breakpoint as needed
    };
    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/addVoucher", formData);

      if (response.data === "Success") {
        setMsg("Voucher Added Successfully.");
      } else {
        setMsg("Failed to add voucher. Please try again.");
      }
    } catch (error) {
      console.error("Error during voucher submission:", error);
      setMsg("Error occurred. Please try again later.");
    }

    setFormData({
      itemName: "",
      itemShape: "",
      itemColor: "",
      quantity: "",
      purchasePrice: "",
      remark: "",
    });

    setTimeout(() => {
      setMsg("");
    }, 5000);
  };

  // Calculate vouchers to display on the current page
  const indexOfLastVoucher = currentPage * itemsPerPage;
  const indexOfFirstVoucher = indexOfLastVoucher - itemsPerPage;
  const currentVouchers = vouchers.slice(indexOfFirstVoucher, indexOfLastVoucher);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
   <div className="add-supplier-container">
  <div className="d-flex justify-content-between" style={{ height: "36px" }}>
    <p className="ComponentHeading">
      <i className="bi bi-plus-circle"></i>&nbsp; All Vouchers
    </p>
    <button
      className="btn btn-primary"
      onClick={() => navigate("/agenthome/add-voucher")}
    >
      Add Vouchers
    </button>
  </div>

  <hr />

  <div className="bg-white rounded-lg shadow-sm overflow-hidden relative">
    {/* Removed the isMobile conditional rendering */}
    {/* Always render the table structure */}
    <div
      className="table-responsive text-center"
      style={{ overflowX: "hidden", height: "60vh" }}
    >
      <div
        className="row fw-bold border-bottom py-2 sticky-top"
        style={{
          top: 0,
          zIndex: 10,
          color: "black",
          backgroundColor: "#c8cbcf",
        }}
      >
        <div className="col">Voucher No</div>
        <div className="col">Item Name</div>
        {/* You might want to adjust these classes for smaller screens if they become too cramped */}
        <div className="col d-none d-sm-flex justify-content-center">Shape</div>
        <div className="col d-none d-sm-flex justify-content-center">Color</div>
        <div className="col">Quantity</div>
        <div className="col">Purchase Price</div>
        <div className="col">Status</div>
      </div>

      {currentVouchers.map((voucher, index) => (
        <div
          key={index}
          className="voucher-row row py-2 mx-0 align-items-center"
          onClick={() => {
            setSelectedVoucher(voucher);
            setModalOpen(true);
          }}
        >
          <div className="col">{voucher.voucherNo}</div>
          <div className="col">{voucher.itemName}</div>
          {/* Consider making these always visible or adjusting column widths */}
          <div className="col d-none d-sm-flex justify-content-center">{voucher.shape}</div>
          <div className="col d-none d-sm-flex justify-content-center">{voucher.color}</div>
          <div className="col">{voucher.quantity}</div>
          <div className="col">₹{voucher.purchasePrice}</div>
          <div className="col">{voucher.status}</div>
        </div>
      ))}
    </div>

    {/* Pagination Controls (already updated in previous conversation) */}
    <div className="d-flex justify-content-center align-items-center py-3">
      <button
        className="btn btn-outline-secondary btn-sm me-2"
        onClick={() => paginate(1)}
        disabled={currentPage === 1}
      >
        First
      </button>
      <button
        className="btn btn-outline-secondary btn-sm me-2"
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &larr;
      </button>
      <span className="me-2">
        Page {currentPage} of {totalPages}
      </span>
      <button
        className="btn btn-outline-secondary btn-sm me-2"
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &rarr;
      </button>
      <button
        className="btn btn-outline-secondary btn-sm"
        onClick={() => paginate(totalPages)}
        disabled={currentPage === totalPages}
      >
        Last
      </button>
    </div>
  </div>
  {/* Voucher modal */}
  <VoucherDetailModal
    show={modalOpen}
    onClose={() => setModalOpen(false)}
    voucher={selectedVoucher}
  />
</div>
  );
}