import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import VoucherDetailModal from "../modal/VoucherDetailModal";

import report from "../../assets/img/report.png";

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

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

  const [searchTerm, setSearchTerm] = useState("");
  const vouchers = [
    {
      number: 1,
      id: "v001",
      voucherNo: "VCH-001",
      itemName: "Gems",
      shape: "Round",
      color: "Black",
      quantity: 10,
      purchasePrice: 1500,
      status: "Accept",
      remark: "Urgent delivery",
      returnQuantity: 1,
      reason: "Faulty piece",
      actualQuantityDelivered: 9
    },
    {
      number: 2,
      id: "v002",
      voucherNo: "VCH-002",
      itemName: "Pearls",
      shape: "Oval",
      color: "Yellow",
      quantity: 5,
      purchasePrice: 2000,
      status: "Accept",
      remark: "Regular delivery",
      returnQuantity: 2,
      reason: "Damaged Piece",
      actualQuantityDelivered: 3
    },
    {
      number: 3,
      id: "v003",
      voucherNo: "VCH-003",
      itemName: "Stones",
      shape: "Square",
      color: "Blue",
      quantity: 7,
      purchasePrice: 1750,
      status: "Reject",
      remark: "High priority",
      returnQuantity: 5,
      reason: "Not like",
      actualQuantityDelivered: 2
    },
    {
      number: 4,
      id: "v004",
      voucherNo: "VCH-004",
      itemName: "Gems",
      shape: "Round",
      color: "Green",
      quantity: 12,
      purchasePrice: 2200,
      status: "Accept",
      remark: "High priority",
      returnQuantity: 0,
      reason: "",
      actualQuantityDelivered: 12
    },
    {
      number: 5,
      id: "v005",
      voucherNo: "VCH-005",
      itemName: "Pearls",
      shape: "Square",
      color: "White",
      quantity: 8,
      purchasePrice: 1600,
      status: "Reject",
      remark: "Urgent delivery",
      returnQuantity: 0,
      reason: "",
      actualQuantityDelivered: 8
    },
    {
      number: 6,
      id: "v006",
      voucherNo: "VCH-006",
      itemName: "Stones",
      shape: "Oval",
      color: "Gray",
      quantity: 6,
      purchasePrice: 1900,
      status: "Return",
      remark: "Regular delivery",
      returnQuantity: 4,
      reason: "Faulty Piece",
      actualQuantityDelivered: 2
    },
    {
      number: 7,
      id: "v007",
      voucherNo: "VCH-007",
      itemName: "Diamonds",
      shape: "Princess",
      color: "Clear",
      quantity: 3,
      purchasePrice: 5000,
      status: "Accept",
      remark: "Special order",
      returnQuantity: 0,
      reason: "",
      actualQuantityDelivered: 3
    },
    {
      number: 8,
      id: "v008",
      voucherNo: "VCH-008",
      itemName: "Emeralds",
      shape: "Octagon",
      color: "Green",
      quantity: 4,
      purchasePrice: 4500,
      status: "Accept",
      remark: "Client meeting",
      returnQuantity: 0,
      reason: "",
      actualQuantityDelivered: 4
    },
    {
      number: 9,
      id: "v009",
      voucherNo: "VCH-009",
      itemName: "Rubies",
      shape: "Heart",
      color: "Red",
      quantity: 2,
      purchasePrice: 6000,
      status: "Reject",
      remark: "On hold",
      returnQuantity: 0,
      reason: "",
      actualQuantityDelivered: 2
    },
    {
      number: 10,
      id: "v010",
      voucherNo: "VCH-010",
      itemName: "Sapphires",
      shape: "Pear",
      color: "Blue",
      quantity: 9,
      purchasePrice: 3000,
      status: "Return",
      remark: "New arrival",
      returnQuantity: 3,
      reason: "Shapes are not proper",
      actualQuantityDelivered: 6
    }
  ];


  const [msg, setMsg] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(
    window.innerWidth <= 768 ? 8 : 10
  );
  const totalPages = Math.ceil(vouchers.length / itemsPerPage);

  const navigate = useNavigate();

  // Handle window resize to determine mobile view
  // useEffect(() => {
  //   const handleResize = () => {
  //     setIsMobile(window.innerWidth <= 768);
  //   };
  //   handleResize();
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 768;
      setIsMobile(isMobile);
      setItemsPerPage(isMobile ? 10 : 10);
    };

    handleResize(); // Initial call
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
  // const indexOfLastVoucher = currentPage * itemsPerPage;
  // const indexOfFirstVoucher = indexOfLastVoucher - itemsPerPage;
  // const currentVouchers = vouchers.slice(
  //   indexOfFirstVoucher,
  //   indexOfLastVoucher
  // );
  // Filter vouchers based on searchTerm (e.g., by itemName or remark or any field you prefer)
  const filteredVouchers = vouchers.filter((voucher) =>
    voucher.itemName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Apply pagination after filtering
  const indexOfLastVoucher = currentPage * itemsPerPage;
  const indexOfFirstVoucher = indexOfLastVoucher - itemsPerPage;
  const currentVouchers = filteredVouchers.slice(
    indexOfFirstVoucher,
    indexOfLastVoucher
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="add-supplier-container">
      {/* <div
        className="d-flex justify-content-between"
        style={{ height: "36px" }}
      >
        <p className="ComponentHeading">
          <i className="bi bi-plus-circle"></i>&nbsp; All Vouchers
        </p>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/agenthome/add-voucher")}
        >
          Add Vouchers
        </button>
      </div> */}
      <div
        className="GridContainerHeading"
        style={{
          display: "flex",
          flexDirection: isSmallScreen ? "column" : "row",
          alignItems: isSmallScreen ? "stretch" : "center",
          justifyContent: "space-between",
          gap: "5px",
          marginBottom: "20px",
          cursor: "default"
        }}
      >
        <p
          className="GridReportHeader-inward"
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: isSmallScreen ? "20px" : "22px",
            color: "#0986a7",
            fontWeight: "600",
            cursor: "default"
          }}
        >
          <img src={report} height={30} width={30} alt="report" />
          &nbsp; All Vouchers
        </p>

        <div
          className="search-container"
          style={{
            display: "flex",
            width: isSmallScreen ? "100%" : "auto",
            flex: isSmallScreen ? "1" : "none",
            gap: "5px",
          }}
        >
          <input
            type="text"
            placeholder="Search by Item Name"
            className="search-input-Field"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flex: 1,
              padding: "6px 40px",
              fontSize: "14px",
            }}
          />
          <button
            className="clear-icon"
            onClick={() => setSearchTerm("")}
            style={{
              background: "none",
              border: "none",
              fontSize: "18px",
              cursor: "pointer",
              color: "#555",
            }}
          >
            <i className="bi bi-x-circle"></i>
          </button>
        </div>

        <Link
          to={"/agenthome/add-voucher"}
          style={{ width: isSmallScreen ? "100%" : "auto" }}
        >
          <button
            className="AddNewButton"
            style={{
              width: "100%",
              padding: "8px 12px",
              fontSize: "14px",
            }}
          >
            <i className="bi bi-plus-lg"></i> Add New
          </button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden relative">
        {/* Always render the table structure */}
        {/* <div
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
            <div className="col d-none d-sm-flex justify-content-center">
              Shape
            </div>
            <div className="col d-none d-sm-flex justify-content-center">
              Color
            </div>
            <div className="col d-none d-sm-flex justify-content-center">
              Quantity
            </div>
            <div className="col d-none d-sm-flex justify-content-center">
              Purchase Price
            </div>
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
              <div className="col d-none d-sm-flex justify-content-center">
                {voucher.shape}
              </div>
              <div className="col d-none d-sm-flex justify-content-center">
                {voucher.color}
              </div>
              <div className="col d-none d-sm-flex justify-content-center">
                {voucher.quantity}
              </div>
              <div className="col d-none d-sm-flex justify-content-center">
                ₹{voucher.purchasePrice}
              </div>
              <div className="col">{voucher.status}</div>
            </div>
          ))}
        </div> */}
        <div
          className="table-responsive "
        // style={{ overflowX: "hidden", height: "60vh" }}
        >
          <table className="table table-bordered table-hover mb-0">
            <thead
              className="sticky-top"
              style={{
                top: 0,
                zIndex: 10,
                backgroundColor: "#c8cbcf",
                color: "black",
              }}
            >
              <tr className="fw-bold">
                <th>No</th>
                <th>Voucher No</th>
                <th>Item Name</th>
                <th className="d-none d-sm-table-cell">Shape</th>
                <th className="d-none d-sm-table-cell">Color</th>
                <th className="d-none d-sm-table-cell">Quantity</th>
                <th className="d-none d-sm-table-cell">Purchase Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentVouchers.map((voucher, index) => (
                <tr key={index} className="">
                  <td>{voucher.number}</td>
                  <td>{voucher.voucherNo}</td>
                  <td
                    className="text-primary text-decoration-underline"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setSelectedVoucher(voucher);
                      setModalOpen(true);
                    }}
                  >
                    {voucher.itemName}
                  </td>
                  <td className="d-none d-sm-table-cell">{voucher.shape}</td>
                  <td className="d-none d-sm-table-cell">{voucher.color}</td>
                  <td className="d-none d-sm-table-cell">{voucher.quantity}</td>
                  <td className="d-none d-sm-table-cell">
                    ₹{voucher.purchasePrice}
                  </td>
                  <td>
                    <span
                      className={`badge ${voucher.status === "Accept"
                          ? "bg-success"
                          : voucher.status === "Return"
                            ? "bg-warning"
                            : "bg-danger"
                        }`}
                    >
                      {voucher.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
