import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import report from '../assets/img/report.png'
import axios from 'axios';
import { apiConfig } from "../../src/config";
import ItemDetailsModal from '../modal/ItemDetailsModal';

export default function AllInward() {
  const Base_URL = apiConfig.getBaseURL();
  const authApiKey = apiConfig.getApiKey();
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const [searchTerm, setSearchTerm] = useState('');
  const [inwardItems, setInwardItems] = useState([])

  const filteredItems = inwardItems.filter(item =>
    item.jai_sub_item_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredItems.length / rowsPerPage);
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentItems = filteredItems.slice(indexOfFirst, indexOfLast);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);


  useEffect(() => {
    fetchInward();
  }, []);

  const fetchInward = async () => {
    try {
      const response = await axios.get(`${Base_URL}/inward/getAllInwardItems`, {
        headers: {
          "x-api-key": authApiKey,
        }
      }); // 🔁 Replace with your actual API
      setInwardItems(response.data.data); // Adjust if your API wraps data differently
      console.log(response.data.data);

    } catch (error) {
      console.error('Error fetching vouchers:', error);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  //to open modal
  const handleItemClick = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);


  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };




  return (
    <div className='MainGridContainer'>
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
        <p
          className="GridReportHeader-inward"
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: isSmallScreen ? "20px" : "22px", color: "#0986a7", fontWeight: "600"
          }}
        >
          <img src={report} height={30} width={30} alt="report" />
          &nbsp; All Item Inward Report
        </p>

        <div
          className="search-container"
          style={{
            display: "flex",
            width: isSmallScreen ? "100%" : "auto",
            flex: isSmallScreen ? "1" : "none",
            gap: "5px"
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
              fontSize: "14px"
            }}
          />
          <button
            className="clear-icon"
            onClick={() => setSearchTerm('')}
            style={{
              background: "none",
              border: "none",
              fontSize: "18px",
              cursor: "pointer",
              color: "#555"
            }}
          >
            <i className="bi bi-x-circle"></i>
          </button>
        </div>

        <Link to={'/item-inward'} style={{ width: isSmallScreen ? "100%" : "auto" }}>
          <button
            className="AddNewButton"
            style={{
              width: "100%",
              padding: "8px 12px",
              fontSize: "14px"
            }}
          >
            <i className="bi bi-plus-lg"></i> Add New
          </button>
        </Link>
      </div>

      <div className='scroll_inward'>
        <div className='TableContainer' style={{ maxHeight: '450px', overflowY: 'auto', scrollbarWidth: "none" }}>
          <table className="table table-bordered GridReport-table-inward">
            <thead style={{ position: "sticky", top: 0, backgroundColor: "#fff", zIndex: 2 }}>
              <tr>
                <th>No.</th>
                <th>Item Name</th>
                <th>Voucher No.</th>
                <th className="d-none d-sm-table-cell">Date</th>
                <th className="d-none d-sm-table-cell">Supplier Name</th>
                <th className="d-none d-sm-table-cell">Quantity</th>
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
                      {item.jai_sub_item_name}
                    </span>
                  </td>
                  <td >{item.jew_voucher}</td>
                  <td className="d-none d-sm-table-cell">{item.jai_sdate.split(' ')[0]}</td>

                  <td className="d-none d-sm-table-cell">{item.jew_sup_supplier_name}</td>

                  <td className="d-none d-sm-table-cell">{item.jai_quantity}</td>
                  <td>
                    <span className={`badge ${item.jai_status === "Active" ? "bg-success" : "bg-danger"}`}>
                      {item.jai_status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pagination-controls">
          <button onClick={() => goToPage(1)} disabled={currentPage === 1}>First</button>
          <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>&lt;</button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>&gt;</button>
          <button onClick={() => goToPage(totalPages)} disabled={currentPage === totalPages}>Last</button>
        </div>

      </div>
      {/* Modal Component */}
      <ItemDetailsModal
        show={showModal}
        item={selectedItem}
        onClose={() => setShowModal(false)}
      />


    </div>
  );
}
