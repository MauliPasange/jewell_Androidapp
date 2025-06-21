import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import report from "../assets/img/report.png";
import axios from "axios";
import CustomerDetailsModal from "../modal/CustomerDetailsModal";

export default function AllCustomers() {
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

  const [customers, setCustomers] = useState([]);
  const Base_URL = sessionStorage.getItem("Base_URL");
  const authApiKey = sessionStorage.getItem("authApiKey");

  const filteredCustomers = customers.filter((customer) =>
    customer.cust_full_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCustomers.length / rowsPerPage);
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentCustomers = filteredCustomers.slice(indexOfFirst, indexOfLast);

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getAllCustomers = async () => {
    try {
      const response = await axios.get(`${Base_URL}/inward/getAllCustomers`, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": authApiKey,
        },
      });
      if (response?.data) {
        setCustomers(response.data.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getAllCustomers();
  }, []);

  return (
    <div className="MainGridContainer">
      {/* Header */}
      <div
        className="GridContainerHeading"
        style={{
          display: "flex",
          flexDirection: isSmallScreen ? "column" : "row",
          alignItems: isSmallScreen ? "stretch" : "center",
          justifyContent: "space-between",
          gap: "10px",
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
          &nbsp; All Customer Report
        </p>

        <div
          className="search-container"
          style={{
            display: "flex",
            width: isSmallScreen ? "100%" : "auto",
            gap: "5px",
          }}
        >
          <input
            type="text"
            placeholder="Search by Customer Name"
            className="search-input-Field"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ flex: 1, padding: "6px 40px", fontSize: "14px" }}
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
          to={"/customer-master"}
          style={{ width: isSmallScreen ? "100%" : "auto" }}
        >
          <button
            className="AddNewButton"
            style={{ width: "100%", padding: "8px 12px", fontSize: "14px" }}
          >
            <i className="bi bi-plus-lg"></i> Add New
          </button>
        </Link>
      </div>

      {/* Table */}
      <div className="scroll_inward">
        <div
          className="TableContainer"
          style={{
            maxHeight: "450px",
            overflowY: "auto",
            scrollbarWidth: "none",
          }}
        >
          <table className="table table-bordered GridReport-table-inward">
            <thead
              style={{
                position: "sticky",
                top: 0,
                backgroundColor: "#fff",
                zIndex: 2,
              }}
            >
              <tr>
                <th>No.</th>
                <th>Full Name</th>
                <th className="d-none d-sm-table-cell">Shop Name</th>
                <th className="d-none d-sm-table-cell">Email</th>
                <th className="d-none d-sm-table-cell">Contact No</th>
                <th className="d-none d-sm-table-cell">Alternate No</th>
                <th className="d-none d-sm-table-cell">Address</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentCustomers.map((customer, index) => (
                <tr key={index}>
                  <td>{indexOfFirst + index + 1}</td>
                  <td
                    className="text-primary text-decoration-underline"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setSelectedCustomer(customer);
                      setShowModal(true);
                    }}
                  >
                    {customer.cust_full_name}
                  </td>
                  <td className="d-none d-sm-table-cell">{customer.cust_shop_name}</td>
                  <td className="d-none d-sm-table-cell">{customer.cust_email}</td>
                  <td className="d-none d-sm-table-cell">{customer.cust_contact}</td>
                  <td className="d-none d-sm-table-cell">{customer.cust_alt_contact}</td>
                  <td className="d-none d-sm-table-cell">{customer.cust_address}</td>
                  <td>
                    <span
                      className={`badge ${
                        customer.cust_status === "Active"
                          ? "bg-success"
                          : "bg-danger"
                      }`}
                    >
                      {customer.cust_status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <CustomerDetailsModal
            show={showModal}
            customer={selectedCustomer}
            onClose={() => setShowModal(false)}
          />
        </div>

        {/* Pagination */}
        <div className="pagination-controls">
          <button onClick={() => goToPage(1)} disabled={currentPage === 1}>
            First
          </button>
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt;
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
          <button
            onClick={() => goToPage(totalPages)}
            disabled={currentPage === totalPages}
          >
            Last
          </button>
        </div>
      </div>
    </div>
  );
}
