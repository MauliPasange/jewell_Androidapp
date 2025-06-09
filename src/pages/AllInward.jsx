import React, { useState , useEffect} from 'react';
import { Link } from 'react-router-dom';
import report from '../assets/img/report.png'

export default function AllInward() {
  const inwardItems = [
    { supplierName: "ABC Jewellers", voucherNo: "VCH-001", date: "2025-06-01", itemName: "Diamond Ring", quantity: 10, status: "Active" },
    { supplierName: "XYZ Traders", voucherNo: "VCH-002", date: "2025-06-03", itemName: "Gold Necklace", quantity: 5, status: "Inactive" },
    { supplierName: "Sparkle Ltd.", voucherNo: "VCH-003", date: "2025-06-05", itemName: "Pearl Earrings", quantity: 8, status: "Active" },
    { supplierName: "Royal Gems", voucherNo: "VCH-004", date: "2025-06-06", itemName: "Emerald Pendant", quantity: 3, status: "Active" },
    { supplierName: "Sunshine Metals", voucherNo: "VCH-005", date: "2025-06-07", itemName: "Platinum Chain", quantity: 7, status: "Inactive" },
    { supplierName: "Elite Ornaments", voucherNo: "VCH-006", date: "2025-06-08", itemName: "Silver Anklet", quantity: 15, status: "Active" },
    { supplierName: "Golden Touch", voucherNo: "VCH-007", date: "2025-06-09", itemName: "Gold Bangles", quantity: 12, status: "Inactive" },
    { supplierName: "Shiny Stones", voucherNo: "VCH-008", date: "2025-06-10", itemName: "Ruby Bracelet", quantity: 4, status: "Active" },
    { supplierName: "Luxe Gems", voucherNo: "VCH-009", date: "2025-06-11", itemName: "Sapphire Brooch", quantity: 2, status: "Active" },
    { supplierName: "Royal Jewel Co.", voucherNo: "VCH-010", date: "2025-06-12", itemName: "Opal Ring", quantity: 6, status: "Inactive" },
    { supplierName: "Trendy Traders", voucherNo: "VCH-011", date: "2025-06-13", itemName: "Turquoise Pendant", quantity: 9, status: "Active" },
    { supplierName: "Fine Finds", voucherNo: "VCH-012", date: "2025-06-14", itemName: "Amethyst Earrings", quantity: 11, status: "Active" }
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = inwardItems.filter(item =>
  item.supplierName.toLowerCase().includes(searchTerm.toLowerCase())
);

const totalPages = Math.ceil(filteredItems.length / rowsPerPage);
const indexOfLast = currentPage * rowsPerPage;
const indexOfFirst = indexOfLast - rowsPerPage;
const currentItems = filteredItems.slice(indexOfFirst, indexOfLast);




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
      <div className='GridContainerHeading'>
        <p className='GridReportHeader-inward'>
          <img src={report} height={30} width={30}></img>&nbsp; All Item Inward Report
        </p>

              <div className="search-container">
                  <input
                      type="text"
                      placeholder="Search by Supplier Name"
                      className="search-input-Field"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button className="clear-icon" onClick={() => setSearchTerm('')}>
                      <i className="bi bi-x-circle"></i>
                  </button>
              </div>


              <Link to={'/item-inward'}>
          <button className='AddNewButton'>
            <i className="bi bi-plus-lg"></i> Add New
          </button>
        </Link>
      </div>

      <div className='TableContainer' style={{ maxHeight: '450px', overflowY: 'auto', scrollbarWidth: "none" }}>
        <table className="table table-bordered GridReport-table-inward">
          <thead style={{ position: "sticky", top: 0, backgroundColor: "#fff", zIndex: 2 }}>
            <tr>
              <th>No.</th>
              <th>Supplier Name</th>
              <th>Voucher No.</th>
              <th>Date</th>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={index}>
                <td>{indexOfFirst + index + 1}</td>
                <td>{item.supplierName}</td>
                <td>{item.voucherNo}</td>
                <td>{item.date}</td>
                <td>{item.itemName}</td>
                <td>{item.quantity}</td>
                <td>
                  <span className={`badge ${item.status === "Active" ? "bg-success" : "bg-danger"}`}>
                    {item.status}
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
  );
}
