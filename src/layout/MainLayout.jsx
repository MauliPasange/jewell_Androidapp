import { Outlet, Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useEffect, useState } from "react";
import "./Sidebar.css";
import "../components/Footer";
import Footer from "../components/Footer";
import dash from '../assets/img/dash.png'
import ad from '../assets/img/item.png'
import house from '../assets/img/house.png'

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const toggleSidebar = () => setCollapsed(!collapsed);

  useEffect(() => {
    const emId = sessionStorage.getItem("em_id");
    const portalId = sessionStorage.getItem("portal_id");

    if (!emId || portalId !== "1") {
      navigate("/login"); // Redirect if not admin
    }
  }, []);

  const username = sessionStorage.getItem("username") || "Admin";
  const handleMenuClick = () => {
    if (window.innerWidth <= 768) {
      setCollapsed(true);
    }
  };

  useEffect(() => {
    if (window.innerWidth < 768) {
      setCollapsed(true);
    }
  }, []);

  return (
    <div>
      {/* Top Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 sticky-top nav-height">
        <div className="container-fluid">
          <button
            className="btn btn-outline-light me-3"
            onClick={toggleSidebar}
          >
            {/* <i className="bi bi-list"></i> */}
                          <img src={house} height={20} width={20}></img>
            
          </button>

          <Link className="navbar-brand me-auto d-none d-sm-inline" to="/">
            <b>Smart Billing - Jewell ({username})</b>
          </Link>

          <Link className="navbar-brand me-auto d-block d-sm-none" to="/">
            Welcome <b>({username})</b>
          </Link>

          <Link to="/logout" className="btn btn-danger btn-sm">
            Logout
          </Link>
        </div>
      </nav>
      {/* Backdrop Overlay for Mobile */}
      {collapsed === false && window.innerWidth < 768 && (
        <div
          className="sidebar-backdrop"
          onClick={() => setCollapsed(true)}
        ></div>
      )}
      {/* Sidebar + Main Content */}
      <div className="d-flex main-div-height" style={{ overflow: "hidden" }}>
        {/* Sidebar */}
        <aside
          className={`bg-dark text-white border-end sidebar ${
            collapsed ? "sidebar-collapsed" : ""
          }`}
          style={{ height: "88vh" }}
        >
          <div className="list-group list-group-flush">
            <Link

              to="/"
              onClick={handleMenuClick}
              className="list-group-item list-group-item-action bg-dark text-white"
            > 
              {/* <i className="bi bi-speedometer2 me-2"></i>Dashboard */}
              <img src={dash} height={20} width={20} className="me-2"></img>Dashboard
            </Link>
            {/* <Link to="/admin" className="list-group-item list-group-item-action bg-dark text-white">
              <i className="bi bi-person me-2"></i>Admin
            </Link>
            <Link to="/masters" className="list-group-item list-group-item-action bg-dark text-white">
              <i className="bi bi-hdd-stack me-2"></i>Masters
            </Link>
            <Link to="/orders" className="list-group-item list-group-item-action bg-dark text-white">
              <i className="bi bi-gear me-2"></i>Orders
            </Link>
            <Link to="/inventory" className="list-group-item list-group-item-action bg-dark text-white">
              <i className="bi bi-box-seam me-2"></i>Inventory
            </Link>
            <Link to="/reports" className="list-group-item list-group-item-action bg-dark text-white">
              <i className="bi bi-bar-chart-line me-2"></i>Reports
            </Link>
            <Link to="/billing" className="list-group-item list-group-item-action bg-dark text-white">
              <i className="bi bi-receipt me-2"></i>Billing
            </Link>
            <Link to="/quotation" className="list-group-item list-group-item-action bg-dark text-white">
              <i className="bi bi-file-earmark-text me-2"></i>Quotation
            </Link>
            <Link to="/item-name-master" className="list-group-item list-group-item-action bg-dark text-white">
              <i className="bi bi-box me-2"></i> Item Name Master
            </Link>
            <Link to="/item-shape-master" className="list-group-item list-group-item-action bg-dark text-white">
              <i className="bi bi-box me-2"></i> Item Shape Master
            </Link>
            <Link to="/item-color-master" className="list-group-item list-group-item-action bg-dark text-white">
              <i className="bi bi-box me-2"></i> Item Color Master
            </Link> */}   
            {/* <Link
              to="/item-inward"
              onClick={handleMenuClick}
              className="list-group-item list-group-item-action bg-dark text-white"
            >
              <i className="bi bi-hdd-stack me-2"></i> Item Inward
            </Link> */}

            <Link
              to="/addItemInward"
              onClick={handleMenuClick}
              className="list-group-item list-group-item-action bg-dark text-white"
            >
             <img src={ad} height={24} width={24} className="me-2"></img> Item Inward New
            </Link>

            {/* <Link
              to="/add_delChallan"
              onClick={handleMenuClick}
              className="list-group-item list-group-item-action bg-dark text-white"
            >
              <i className="bi bi-hdd-stack me-2"></i> Delivery Challan
            </Link> */}
            {/* <Link to="/supplier-master" onClick={handleMenuClick} className="list-group-item list-group-item-action bg-dark text-white">
              <i className="bi bi-hdd-stack me-2"></i>  Supplier Master
            </Link>
            <Link to="/customer-master" onClick={handleMenuClick} className="list-group-item list-group-item-action bg-dark text-white">
              <i className="bi bi-hdd-stack me-2"></i>  Customer Master
            </Link> */}
            {/* <Link
              to="/add-voucher"
              className="list-group-item list-group-item-action bg-dark text-white"
            >
              <i className="bi bi-receipt me-2"></i> Add Voucher
            </Link> */}
          </div>
        </aside>

        {/* Main Content */}
        <div className="p-2 p-sm-3 flex-grow-1">
          <Outlet />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
