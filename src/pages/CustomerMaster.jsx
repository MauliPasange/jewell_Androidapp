import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { apiConfig } from "../config";

export default function CustomerMaster() {
  const [formData, setFormData] = useState({
    fullName: "",
    shopName: "",
    email: "",
    contact: "",
    alternateContact: "",
    address: "",
  });

  const [msg, setMsg] = useState("");
//   const Base_URL = sessionStorage.getItem("Base_URL");
//   const authApiKey = sessionStorage.getItem("authApiKey");
  const Base_URL = apiConfig.getBaseURL();
  const authApiKey = apiConfig.getApiKey();
  const emId = sessionStorage.getItem("em_id");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const phoneRegex = /^\d{10}$/;
        const emailRegex = /^[A-Za-z_][^\s@]*@[A-Za-z]+\.[A-Za-z]{2,}$/;

        if (!formData.fullName.trim()) {
        setMsg("Full name is required");
        return;
        }
        if (!formData.contact || !phoneRegex.test(formData.contact)) {
        setMsg("Valid contact number is required");
        return;
        }
        if (formData.alternateContact && !phoneRegex.test(formData.alternateContact)) {
        setMsg("Alternate contact must be 10 digits");
        return;
        }
        if (formData.email && !emailRegex.test(formData.email)) {
        setMsg("Invalid email format");
        return;
        }
      const payload = {
        one: formData.fullName || "",
        two: formData.shopName || "",
        three: formData.email || "",
        four: formData.contact || "",
        five: formData.alternateContact || "",
        six: formData.address || "",
        seven: emId || "",
      };

      const response = await axios.post(
        `${Base_URL}/inward/addCustomer`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": authApiKey,
          },
        }
      );

      if (response.status === 200) {
        setMsg(`${formData.fullName} Customer Added Successfully.`);
        setFormData({
          fullName: "",
          shopName: "",
          email: "",
          contact: "",
          alternateContact: "",
          address: "",
        });
        navigate("/all-customers");
      } else {
        setMsg("Failed to add customer. Please try again.");
      }
    } catch (error) {
      console.error(error);
      if (error.response) {
        setMsg(`Error: ${error.response.data.message || "Bad Request"}`);
      } else {
        setMsg("Network or unexpected error.");
      }
    }

    setTimeout(() => {
      setMsg("");
    }, 5000);
  };
    useEffect(() => {
        if (msg) {
        const timer = setTimeout(() => {
            setMsg("");
        }, 5000);
        return () => clearTimeout(timer);
        }
    }, [msg]);

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="add-supplier-container">
      {/* <div style={{ padding: "0px", marginTop: "-15px" }}>
        <Link to={"/"} className="link-style">
          <span className="link-text">Home</span>
        </Link>
        <Link to={"/all-customers"} className="link-style">
          <i className="bi bi-dot link-icon"></i>
          <span className="link-text">All Customers</span>
        </Link>
        <span style={{ color: "gray" }}>
          <i className="bi bi-dot"></i>Customer Master
        </span>
      </div> */}
        <div style={{ padding: "0px"}}>
            <Link to={"/"} className="link-style">
                <span className="link-text">Home</span>
                <i className="bi bi-chevron-right"></i>
            </Link>
            <Link to={"/all-customers"} className="link-style">
                <span className="link-text">All Customers</span>
                <i className="bi bi-chevron-right"></i>
            </Link>
            <span  className="link-text  custom-breadcrum-link">
                Customer Master
            </span>
        </div>

      <p className="ComponentHeading">
        <i className="bi bi-plus-circle"></i>&nbsp; Add New Customer
      </p>
      <hr />
      <div className="form-container" style={{ padding: "10px" }}>
        <form className="scrollable-form" onSubmit={handleSubmit}>
          <p className="ShowMsg text-center">{msg}</p>

          {/* Full Name */}
          <div className="row mb-3">
            <div className="col-12">
              <label htmlFor="fullName" className="labelText">
                Full Name<span className="required-star">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                className="form-control"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Shop Name  & email */}
          <div className="row mb-3">
            <div className="col-6">
              <label htmlFor="shopName" className="labelText">
                Shop Name
              </label>
              <input
                type="text"
                id="shopName"
                name="shopName"
                className="form-control"
                placeholder="Shop Name"
                value={formData.shopName}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-6">
              <label htmlFor="email" className="labelText">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Contact & Alternate Contact */}
          <div className="row mb-3">
            <div className="col-12 col-md-6">
              <label htmlFor="contact" className="labelText">
                Contact No<span className="required-star">*</span>
              </label>
              <input
                type="text"
                id="contact"
                name="contact"
                className="form-control"
                placeholder="Contact Number"
                value={formData.contact}
                onChange={handleInputChange}
                maxLength={10}
              />
            </div>
            <div className="col-12 col-md-6">
              <label htmlFor="alternateContact" className="labelText">
                Alternate Contact
              </label>
              <input
                type="text"
                id="alternateContact"
                name="alternateContact"
                className="form-control"
                placeholder="Alternate Contact"
                value={formData.alternateContact}
                onChange={handleInputChange}
                maxLength={10}
              />
            </div>
          </div>

          {/* Address */}
          <div className="row mb-3">
            <div className="col-12">
              <label htmlFor="address" className="labelText">
                Address
              </label>
              <textarea
                id="address"
                name="address"
                className="form-control"
                placeholder="Address"
                value={formData.address}
                onChange={handleInputChange}
              ></textarea>
            </div>
          </div>

          {/* Buttons */}
          <div className="row mb-3">
            <div className="col text-center">
              <button type="submit" className="btn btn-primary me-3">
                Submit
              </button>
              <button
                type="button"
                onClick={handleBackClick}
                className="btn btn-secondary"
              >
                Back
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
