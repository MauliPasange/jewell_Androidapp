import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import report from "../assets/img/report.png";
import SupplierDetailsModal from "./SupplierDetailsModal";
import Supermodal from "../modal/Supermodal";


export default function AllSuppliers() {
  const supplierList = [
    {
      name: "Riddhi Jewellery",
      contact: "9876543210",
      address: "Kharghar, Maharashtra",
      gstNo: "27AAECR1234F1Z5",
      email: "riddhi@jewels.com",
      status: "Active",
    },
    {
      name: "Shree Jewels",
      contact: "9123456789",
      address: "Kalamboli, Maharashtra",
      gstNo: "24BBZPM2345K1Z2",
      email: "shree@jewels.com",
      status: "Inactive",
    },
    {
      name: "Navkar Exports",
      contact: "9988776655",
      address: "Surat, Gujarat",
      gstNo: "24AACCN1234P1Z8",
      email: "navkar@exports.com",
      status: "Active",
    },
  ];
    const [selectedSupplier ,setSelectedSupplier ] =useState("");
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

  const filteredSuppliers = supplierList.filter((supplier) =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredSuppliers.length / rowsPerPage);
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentSuppliers = filteredSuppliers.slice(indexOfFirst, indexOfLast);

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
          &nbsp; All Supplier Report
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
            placeholder="Search by Supplier Name"
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
          to={"/add_supplier"}
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
                <th>Name</th>
                <th className="d-none d-sm-table-cell">Contact</th>
                <th className="d-none d-sm-table-cell">Address</th>
                <th className="d-none d-sm-table-cell">GST No</th>
                <th className="d-none d-sm-table-cell">Email</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentSuppliers.map((supplier, index) => (
                <tr key={index}>
                  <td>{indexOfFirst + index + 1}</td>
                  <td 
                    className="text-primary text-decoration-underline"
                    style={{cursor:"pointer"}}
                    onClick={()=>{

                        setSelectedSupplier(supplier);
                        setShowModal(true);
                    }}
                  >{supplier.name}</td>
                  <td className="d-none d-sm-table-cell">{supplier.contact}</td>
                  <td className="d-none d-sm-table-cell">{supplier.address}</td>
                  <td className="d-none d-sm-table-cell">{supplier.gstNo}</td>
                  <td className="d-none d-sm-table-cell">{supplier.email}</td>
                  <td>
                    <span
                      className={`badge ${
                        supplier.status === "Active"
                          ? "bg-success"
                          : "bg-danger"
                      }`}
                    >
                      {supplier.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* <SupplierDetailsModal
            show={showModal}
            supplier={selectedSupplier}
            onClose={() => setShowModal(false)}
          /> */}

          <Supermodal
            show={showModal}
            supplier={selectedSupplier}
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
