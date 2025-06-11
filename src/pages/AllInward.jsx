import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import report from '../assets/img/report.png'
import ItemDetailsModal from './ItemDetailsModal';

export default function AllInward() {
  const inwardItems = [
    {
      supplierName: "ABC Jewellers",
      voucherNo: "VCH-001",
      date: "2025-06-01",
      itemName: "Diamond Ring",
      subItemName: "Solitaire Ring",
      color: "White",
      shape: "Round",
      number: "D001",
      purchasePrice: 5000,
      purchaseCode: "PUR-001",
      salePrice: 7500,
      saleCode: "SAL-001",
      length: 2,
      breadth: 2,
      height: 1,
      unit: "pcs",
      hsnCode: "71131910",
      gst: "3%",
      image: "https://plus.unsplash.com/premium_photo-1681276170092-446cd1b5b32d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGpld2Vscnl8ZW58MHx8MHx8fDA%3D",
      image1: "https://plus.unsplash.com/premium_photo-1681276169450-4504a2442173?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fHw%3D",
      image2: "https://plus.unsplash.com/premium_photo-1681276168422-ebd2d7e95340?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE4fHx8ZW58MHx8fHx8",
      remark: "Premium quality diamond",
      quantity: 10,
      status: "Active"
    },
    {
      supplierName: "XYZ Traders",
      voucherNo: "VCH-002",
      date: "2025-06-03",
      itemName: "Gold Necklace",
      subItemName: "Choker",
      color: "Yellow",
      shape: "Curved",
      number: "G002",
      purchasePrice: 8000,
      purchaseCode: "PUR-002",
      salePrice: 11000,
      saleCode: "SAL-002",
      length: 15,
      breadth: 4,
      height: 1,
      unit: "gms",
      hsnCode: "71131920",
      gst: "3%",
      image: "https://plus.unsplash.com/premium_photo-1681276170092-446cd1b5b32d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGpld2Vscnl8ZW58MHx8MHx8fDA%3D",
      image1: "https://plus.unsplash.com/premium_photo-1681276169450-4504a2442173?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fHw%3D",
      image2: "https://plus.unsplash.com/premium_photo-1681276168422-ebd2d7e95340?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE4fHx8ZW58MHx8fHx8",
      remark: "Handcrafted traditional design",
      quantity: 5,
      status: "Inactive"
    },
    {
      supplierName: "Sparkle Ltd.",
      voucherNo: "VCH-003",
      date: "2025-06-05",
      itemName: "Pearl Earrings",
      subItemName: "Drop Earrings",
      color: "Cream",
      shape: "Oval",
      number: "P003",
      purchasePrice: 2000,
      purchaseCode: "PUR-003",
      salePrice: 3200,
      saleCode: "SAL-003",
      length: 3,
      breadth: 2,
      height: 1,
      unit: "pcs",
      hsnCode: "71171100",
      gst: "3%",
      image: "https://plus.unsplash.com/premium_photo-1681276170092-446cd1b5b32d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGpld2Vscnl8ZW58MHx8MHx8fDA%3D",
      image1: "https://plus.unsplash.com/premium_photo-1681276169450-4504a2442173?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fHw%3D",
      image2: "https://plus.unsplash.com/premium_photo-1681276168422-ebd2d7e95340?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE4fHx8ZW58MHx8fHx8",
      remark: "Elegant pearls from Japan",
      quantity: 8,
      status: "Active"
    },
    {
      supplierName: "Royal Gems",
      voucherNo: "VCH-004",
      date: "2025-06-06",
      itemName: "Emerald Pendant",
      subItemName: "Oval Pendant",
      color: "Green",
      shape: "Oval",
      number: "E004",
      purchasePrice: 6000,
      purchaseCode: "PUR-004",
      salePrice: 9000,
      saleCode: "SAL-004",
      length: 4,
      breadth: 3,
      height: 1.5,
      unit: "pcs",
      hsnCode: "71131930",
      gst: "3%",
      image: "https://plus.unsplash.com/premium_photo-1681276170092-446cd1b5b32d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGpld2Vscnl8ZW58MHx8MHx8fDA%3D",
      image1: "https://plus.unsplash.com/premium_photo-1681276169450-4504a2442173?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fHw%3D",
      image2: "https://plus.unsplash.com/premium_photo-1681276168422-ebd2d7e95340?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE4fHx8ZW58MHx8fHx8",
      remark: "Colombian emerald centerpiece",
      quantity: 3,
      status: "Active"
    },
    {
      supplierName: "Sunshine Metals",
      voucherNo: "VCH-005",
      date: "2025-06-07",
      itemName: "Platinum Chain",
      subItemName: "Box Chain",
      color: "Silver",
      shape: "Box",
      number: "PL005",
      purchasePrice: 12000,
      purchaseCode: "PUR-005",
      salePrice: 15000,
      saleCode: "SAL-005",
      length: 18,
      breadth: 0.5,
      height: 0.2,
      unit: "gms",
      hsnCode: "71101100",
      gst: "3%",
      image: "https://plus.unsplash.com/premium_photo-1681276170092-446cd1b5b32d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGpld2Vscnl8ZW58MHx8MHx8fDA%3D",
      image1: "https://plus.unsplash.com/premium_photo-1681276169450-4504a2442173?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fHw%3D",
      image2: "https://plus.unsplash.com/premium_photo-1681276168422-ebd2d7e95340?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE4fHx8ZW58MHx8fHx8",
      remark: "Heavy-duty men's chain",
      quantity: 7,
      status: "Inactive"
    }
  ];

  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
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
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

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
      fontSize: isSmallScreen ? "20px" : "22px",color: "#0986a7",fontWeight: "600"
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
      placeholder="Search by Supplier Name"
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


      <div className='TableContainer' style={{ maxHeight: '450px', overflowY: 'auto', scrollbarWidth: "none" }}>
        <table className="table table-bordered GridReport-table-inward">
          <thead style={{ position: "sticky", top: 0, backgroundColor: "#fff", zIndex: 2 }}>
            <tr>
              <th>No.</th>
              <th>Supplier Name</th>
              <th>Voucher No.</th>
              <th className="d-none d-sm-table-cell">Date</th>
              <th className="d-none d-sm-table-cell">Item Name</th>
              <th className="d-none d-sm-table-cell">Quantity</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={index}>
                <td>{indexOfFirst + index + 1}</td>
                <td>{item.supplierName}</td>
                <td >{item.voucherNo}</td>
                <td className="d-none d-sm-table-cell">{item.date}</td>
                <td className="d-none d-sm-table-cell">
                  <span
                    className="text-primary text-decoration-underline"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleItemClick(item)}
                  >
                    {item.itemName}
                  </span>
                </td>

                <td className="d-none d-sm-table-cell">{item.quantity}</td>
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


      {/* Modal Component */}
      <ItemDetailsModal
        show={showModal}
        item={selectedItem}
        onClose={() => setShowModal(false)}
      />


    </div>
  );
}
