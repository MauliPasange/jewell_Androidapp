import { Outlet, Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useEffect, useState } from "react";
import "./Sidebar.css"; // Custom CSS for sidebar behavior
import Footer from "../../components/Footer";

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const navigate = useNavigate();

  // Toggle the sidebar collapse state
  const toggleSidebar = () => setCollapsed(!collapsed);

  // Redirect to login if not authorized
  useEffect(() => {
    const emId = sessionStorage.getItem("em_id");
    const portalId = sessionStorage.getItem("portal_id");

    if (!emId || portalId !== "2") {
      navigate("/login"); // Redirect if not agent
    }
  }, []);

  const username = sessionStorage.getItem("username") || "Agent";

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
            <i className="bi bi-list"></i>
          </button>

          <Link
            className="navbar-brand me-auto d-none d-sm-inline"
            to="/agenthome"
          >
            <b>Smart Billing - Jewell ({username})</b>
          </Link>
          <Link
            className="navbar-brand me-auto d-block d-sm-none"
            to="/agenthome"
          >
            Welcome<b> ({username})</b>
          </Link>

          <Link to="/logout" className="btn btn-danger btn-sm">
            Logout
          </Link>
        </div>
      </nav>

      {/* Sidebar + Main Content Container */}
      <div className="d-flex main-div-height" style={{ overflow: "hidden" }}>
        {/* Sidebar */}
        <aside
          className={`bg-dark text-white border-end sidebar ${
            collapsed ? "sidebar-collapsed" : ""
          }`}
        >
          <div className="list-group list-group-flush">
            <Link
              to="/agenthome"
              className="list-group-item list-group-item-action bg-dark text-white"
            >
              <i className="bi bi-speedometer2 me-2"></i>
              <span>Dashboard</span>
            </Link>
            <Link
              to="/agenthome/add-voucher"
              className="list-group-item list-group-item-action bg-dark text-white"
            >
              <i className="bi bi-receipt me-2"></i>
              <span>Add Voucher</span>
            </Link>
            {/* <Link
              to="/agenthome/all-vouchers"
              className="list-group-item list-group-item-action bg-dark text-white"
            >
              <i className="bi bi-receipt me-2"></i>
              <span>All Voucher</span>
            </Link> */}
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
            </Link>
            <Link to="/item-inward" className="list-group-item list-group-item-action bg-dark text-white">
              <i className="bi bi-hdd-stack me-2"></i> Item Inward 
            </Link>
            <Link to="/supplier-master" className="list-group-item list-group-item-action bg-dark text-white">
              <i className="bi bi-hdd-stack me-2"></i>  Supplier Master
            </Link> */}
          </div>
        </aside>

        {/* Main Content - Expands automatically */}
        {/* <div className="p-4" style={{ flex: 1, overflowY: "auto" }}>
          <Outlet />
        </div> */}

        <div
          className="p-2 p-sm-3"
          style={{
            flex: 1,
            overflowY: "auto",
            marginLeft: window.innerWidth >= 768 && !collapsed ? "0px" : "0", // margin only on large screen when sidebar open
            transition: "margin-left 0.3s ease",
          }}
        >
          <Outlet />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
