import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import report from '../assets/img/report.png';
import DeliveryChallanModal from './DeliveryChallanModal';

export default function AllDeliveryChallan() {
  const inwardItems = [
    {
      customer: "Ganesh Jewellers",
      itemName: "Diamond Ring",
      color: "White",
      shape: "Round",
      quantity: 2,
      saleRate: 5000,
      totalAmount: 10000,
      advance: 3000,
      remainingPayment: 7000,
      date: "2025-06-12",
      timePeriod: "7 Days",
      remark: "Urgent delivery",
      status:"Active"
    },
    {
      customer: "Shivam Traders",
      itemName: "Ruby Pendant",
      color: "Red",
      shape: "Oval",
      quantity: 1,
      saleRate: 2500,
      totalAmount: 2500,
      advance: 1000,
      remainingPayment: 1500,
      date: "2025-06-11",
      timePeriod: "3 Days",
      remark: "",
      status:"Inactive"
    },
    {
      customer: "Mahadev Exports",
      itemName: "Emerald Earrings",
      color: "Green",
      shape: "Square",
      quantity: 3,
      saleRate: 3000,
      totalAmount: 9000,
      advance: 5000,
      remainingPayment: 4000,
      date: "2025-06-10",
      timePeriod: "10 Days",
      remark: "Partial payment done",
      status:"Active"
    }
  ];

  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const [searchTerm, setSearchTerm] = useState('');
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

  const filteredItems = inwardItems.filter(item =>
    item.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredItems.length / rowsPerPage);
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentItems = filteredItems.slice(indexOfFirst, indexOfLast);

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className='MainGridContainer'>
      {/* Header */}
      <div
        className="GridContainerHeading"
        style={{
          display: "flex",
          flexDirection: isSmallScreen ? "column" : "row",
          alignItems: isSmallScreen ? "stretch" : "center",
          justifyContent: "space-between",
          gap: "10px",
          marginBottom: "20px"
        }}
      >
        <p className="GridReportHeader-inward" style={{ display: "flex", alignItems: "center", fontSize: isSmallScreen ? "20px" : "22px", color: "#0986a7", fontWeight: "600" }}>
          <img src={report} height={30} width={30} alt="report" />
          &nbsp; All Delivery Challan Report
        </p>

        <div className="search-container" style={{ display: "flex", width: isSmallScreen ? "100%" : "auto", gap: "5px" }}>
          <input
            type="text"
            placeholder="Search by Name"
            className="search-input-Field"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ flex: 1, padding: "6px 40px", fontSize: "14px" }}
          />
          <button
            className="clear-icon"
            onClick={() => setSearchTerm('')}
            style={{ background: "none", border: "none", fontSize: "18px", cursor: "pointer", color: "#555" }}
          >
            <i className="bi bi-x-circle"></i>
          </button>
        </div>

        <Link to={'/add_delChallan'} style={{ width: isSmallScreen ? "100%" : "auto" }}>
          <button className="AddNewButton" style={{ width: "100%", padding: "8px 12px", fontSize: "14px" }}>
            <i className="bi bi-plus-lg"></i> Add New
          </button>
        </Link>
      </div>

      {/* Table */}
      <div className='scroll_inward'>
        <div className='TableContainer' style={{ maxHeight: '450px', overflowY: 'auto', scrollbarWidth: "none" }}>
          <table className="table table-bordered GridReport-table-inward">
            <thead style={{ position: "sticky", top: 0, backgroundColor: "#fff", zIndex: 2 }}>
              <tr>
                <th>No.</th>
                <th>Customer</th>
                <th>Item</th>
                <th className="d-none d-sm-table-cell">Qty</th>
                <th className="d-none d-sm-table-cell">Total</th>
                <th className="d-none d-sm-table-cell">Advance</th>
                <th className="d-none d-sm-table-cell">Date</th>
                <th className="d-none d-sm-table-cell">Time Period</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={index}>
                  <td>{indexOfFirst + index + 1}</td>
                  <td>
                    <span
                      className="item-name-link"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleItemClick(item)}
                    >
                      {item.customer}
                    </span>
                  </td>
                  <td>{item.itemName}</td>
                  <td className="d-none d-sm-table-cell">{item.quantity}</td>
                  <td className="d-none d-sm-table-cell">{item.totalAmount}</td>
                  <td className="d-none d-sm-table-cell">{item.advance}</td>
                  <td className="d-none d-sm-table-cell">{item.date}</td>
                  <td className="d-none d-sm-table-cell">{item.timePeriod}</td>
                  <td>
                    <span className={`badge ${item.status==='Active' ? "bg-success" : "bg-danger"}`}>
                      {item.status || "No Status"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="pagination-controls">
          <button onClick={() => goToPage(1)} disabled={currentPage === 1}>First</button>
          <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>&lt;</button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>&gt;</button>
          <button onClick={() => goToPage(totalPages)} disabled={currentPage === totalPages}>Last</button>
        </div>
      </div>

      {/* Modal */}
      <DeliveryChallanModal
        show={showModal}
        item={selectedItem}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
}
