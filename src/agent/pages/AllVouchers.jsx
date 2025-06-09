import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import VoucherDetailModal from "../../modal/VoucherDetailModal";

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
  // const [vouchers,setVouchers] = useState([]);
  const vouchers = [
    {
      id: "v001",
      itemName: "Gems",
      shape: "Round",
      color: "Black",
      quantity: 10,
      purchasePrice: 1500,
      status: "Active",
      voucherNo: "73846",
    },
    {
      id: "v002",
      itemName: "Pearls",
      shape: "Oval",
      color: "Yellow",
      quantity: 5,
      purchasePrice: 2000,
      status: "Completed",
      voucherNo: "73847",
    },
    {
      id: "v003",
      itemName: "Stones",
      shape: "Square",
      color: "Blue",
      quantity: 7,
      purchasePrice: 1750,
      status: "Inactive",
      voucherNo: "73848",
    },
    {
      id: "v004",
      itemName: "Gems",
      shape: "Round",
      color: "Green",
      quantity: 12,
      purchasePrice: 2200,
      status: "Active",
      voucherNo: "73849",
    },
    {
      id: "v005",
      itemName: "Pearls",
      shape: "Square",
      color: "White",
      quantity: 8,
      purchasePrice: 1600,
      status: "Completed",
      voucherNo: "73850",
    },
    {
      id: "v006",
      itemName: "Stones",
      shape: "Oval",
      color: "Gray",
      quantity: 6,
      purchasePrice: 1900,
      status: "Active",
      voucherNo: "73851",
    },
  ];
  const sampleVoucher = {
    itemName: "Gems",
    shape: "Oval",
    color: "Blue",
    quantity: 24,
    purchasePrice: 15000,
    remark: "None",
    voucherNo: "73846",
    status: "Active",
  };
  const [msg, setMsg] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  const navigate = useNavigate();
//   const Base_URL = sessionStorage.getItem("Base_URL");
//   const authApiKey = sessionStorage.getItem("authApiKey");
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

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="add-supplier-container">
      {/* <div style={{ padding: "0px", marginTop: "-15px" }}>
        <Link to={"/"} className="link-style">
          <span className="link-text">Home</span>
        </Link>
        <Link to={"#"} className="link-style">
          <i className="bi bi-dot link-icon"></i>
          <span className="link-text">All Vouchers</span>
        </Link>
      </div> */}
      <div className="d-flex justify-content-between">
        <p className="ComponentHeading">
          <i className="bi bi-plus-circle"></i>&nbsp; All Vouchers
        </p>
        {/* <button
          className="btn btn-primary"
          onClick={() => navigate("/add-voucher")}
        >
          Add Vouchers
        </button> */}
      </div>

      <hr />

      <div className="bg-white rounded-lg shadow-sm overflow-hidden relative">
        {/* Mobile View - Simplified Card Layout */}
        {isMobile ? (
          <div className="max-h-[60vh] overflow-y-auto">
            {/* {vouchers.map((voucher, index) => (
                            <div key={index} className="voucher-row-wrapper">
                                <div className="voucher-row p-3 border-b border-gray-200 hover:bg-gray-50 transition-all duration-200">
                                    <div className="flex justify-between items-center">
                                        <div className="flex flex-col cursor-pointer" onClick={() => navigate(`/voucher/${voucher.id}`)}>
                                            <span className="font-medium text-gray-800">
                                                {voucher.itemName}
                                            </span>
                                            <span className="text-sm text-gray-500">
                                                Shape: {voucher.shape}, Color: {voucher.color}
                                            </span>
                                        </div>
                                        <select
                                            value={voucher.status}
                                            onChange={(e) => handleStatusChange(index, e.target.value)}
                                            className={`px-2 py-1 rounded text-xs ${getStatusColor(voucher.status)} border border-gray-300`}
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            {['Active', 'Inactive', 'Completed'].map((status) => (
                                                <option key={status} value={status}>
                                                    {status}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        ))} */}
          </div>
        ) : (
          <>
            <div
              className="table-responsive text-center"
              style={{ overflowX: "hidden", height: "66vh" }}
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
                <div className="col">Shape</div>
                <div className="col">Color</div>
                <div className="col">Quantity</div>
                <div className="col">Purchase Price</div>
                <div className="col">Status</div>
              </div>
              {/* <button className="btn btn-primary" onClick={() => setModalOpen(true)}>
                                Show Voucher Details
                            </button> */}

              {vouchers.map((voucher, index) => (
                <div
                  key={index}
                  className="voucher-row row py-2 mx-0 align-items-center"
                  // onClick={() => navigate(`/voucher/${voucher.id}`)}
                  onClick={() => setModalOpen(true)}
                >
                  <div className="col">{voucher.voucherNo}</div>
                  <div className="col">{voucher.itemName}</div>
                  <div className="col">{voucher.shape}</div>
                  <div className="col">{voucher.color}</div>
                  <div className="col">{voucher.quantity}</div>
                  <div className="col">₹{voucher.purchasePrice.toFixed(2)}</div>
                  <div className="col">{voucher.status}</div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Hover + Buffer Styling */}
      </div>
      {/* Voucher modal */}
      <VoucherDetailModal
        show={modalOpen}
        onClose={() => setModalOpen(false)}
        voucher={sampleVoucher}
      />
    </div>
  );
}
