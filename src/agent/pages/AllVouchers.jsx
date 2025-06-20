import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import VoucherDetailModal from "../modal/VoucherDetailModal";
import report from "../../assets/img/report.png";

export default function AllVouchers() {
  const [vouchers, setVouchers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(window.innerWidth <= 768 ? 10 : 10);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState(null);

  const Base_URL = sessionStorage.getItem("Base_URL");
  const authApiKey = sessionStorage.getItem("authApiKey");
  const navigate = useNavigate();

  const fetchVouchers = async () => {
    try {
      const response = await axios.get(`${Base_URL}/inward/getAllVouchers`, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": authApiKey,
        },
      });
      if (response.data?.data) {
        setVouchers(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching vouchers:", error);
    }
  };

  useEffect(() => {
    fetchVouchers();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 768;
      setIsSmallScreen(isMobile);
      setItemsPerPage(isMobile ? 10 : 10);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredVouchers = vouchers.filter((voucher) =>
    voucher.item_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentVouchers = filteredVouchers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredVouchers.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="add-supplier-container">
      <div
        className="GridContainerHeading"
        style={{
          display: "flex",
          flexDirection: isSmallScreen ? "column" : "row",
          alignItems: isSmallScreen ? "stretch" : "center",
          justifyContent: "space-between",
          gap: "5px",
          marginBottom: "20px",
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
          }}
        >
          <img src={report} height={30} width={30} alt="report" />
          &nbsp; All Vouchers
        </p>

        <div
          className="search-container"
          style={{ display: "flex", width: isSmallScreen ? "100%" : "auto", gap: "5px" }}
        >
          <input
            type="text"
            placeholder="Search by Item Name"
            className="search-input-Field"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ flex: 1, padding: "6px 40px", fontSize: "14px" }}
          />
          <button
            className="clear-icon"
            onClick={() => setSearchTerm("")}
            style={{ background: "none", border: "none", fontSize: "18px", cursor: "pointer", color: "#555" }}
          >
            <i className="bi bi-x-circle"></i>
          </button>
        </div>

        <Link to="/agenthome/add-voucher" style={{ width: isSmallScreen ? "100%" : "auto" }}>
          <button className="AddNewButton" style={{ width: "100%", padding: "8px 12px", fontSize: "14px" }}>
            <i className="bi bi-plus-lg"></i> Add New
          </button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden relative">
        <div className="table-responsive">
          <table className="table table-bordered table-hover mb-0">
            <thead className="sticky-top" style={{ top: 0, zIndex: 10, backgroundColor: "#c8cbcf", color: "black" }}>
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
                <tr key={index}>
                  <td>{indexOfFirst + index + 1}</td>
                  <td>{voucher.jew_voucher}</td>
                  <td
                    className="text-primary text-decoration-underline"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setSelectedVoucher(voucher);
                      setModalOpen(true);
                    }}
                  >
                    {voucher.item_name}
                  </td>
                  <td className="d-none d-sm-table-cell">{voucher.shape_name}</td>
                  <td className="d-none d-sm-table-cell">{voucher.color_name}</td>
                  <td className="d-none d-sm-table-cell">{voucher.jew_vou_quantity}</td>
                  <td className="d-none d-sm-table-cell">₹{voucher.jew_vou_purchase_price}</td>
                  <td>
                    <span
                      className={`badge ${
                        voucher.jew_vou_status === "Active"
                          ? "bg-success"
                          : voucher.jew_vou_status === "Return"
                          ? "bg-warning"
                          : "bg-danger"
                      }`}
                    >
                      {voucher.jew_vou_status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="d-flex justify-content-center align-items-center py-3">
          <button className="btn btn-outline-secondary btn-sm me-2" onClick={() => paginate(1)} disabled={currentPage === 1}>
            First
          </button>
          <button
            className="btn btn-outline-secondary btn-sm me-2"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &larr;
          </button>
          <span className="me-2">Page {currentPage} of {totalPages}</span>
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

      <VoucherDetailModal
        show={modalOpen}
        onClose={() => setModalOpen(false)}
        voucher={selectedVoucher}
      />
    </div>
  );
}
