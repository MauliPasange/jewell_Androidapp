import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function SupplierMaster() {
  const [formData, setFormData] = useState({
    supplierName: "",
    contact: "",
    alternateContact: "",
    gstNo: "",
    landlineNo: "",
    email: "",
    contactPersonName: "",
    contactPersonContact: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    pancard: "",
    extraInfo: "",
  });

  const [msg, setMsg] = useState("");
  const Base_URL = sessionStorage.getItem("Base_URL");
  const authApiKey = sessionStorage.getItem("authApiKey");
  const emId = sessionStorage.getItem("em_id");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // supplier name
      if (!formData.supplierName.trim()) {
        setMsg("Supplier name is mandatory");
        return;
      }
      const nameRegex = /^[A-Za-z\s]+$/;
      if (!nameRegex.test(formData.supplierName.trim())) {
        setMsg("Supplier name must contain letters only.");
        return;
      }
      // contact
      const phoneRegex = /^\d{10}$/;
      if (!formData.contact.trim()) {
        setMsg("Contact is mandatory");
        return;
      }
      if (!phoneRegex.test(formData.contact.trim())) {
        setMsg("contact must be 10 digits only");
        return;
      }
      //pancard
      const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
      if (formData.pancard && !panRegex.test(formData.pancard.toUpperCase())) {
        setMsg("Invalid Pancard Pattern!");
        return;
      }
      //email
      const emailRegex = /^[A-Za-z_][^\s@]*@[A-Za-z]+\.[A-Za-z]{2,}$/;
      if (formData.email && !emailRegex.test(formData.email.trim())) {
        setMsg("Invalid email format.");
        return;
      }
      // gst
      const gstRegex =
        /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

      if (formData.gstNo && !gstRegex.test(formData.gstNo.trim())) {
        setMsg("Invalid gst format.");
        return;
      }
      // const payload_2 = {
      //   one: formData.supplierName  || null,
      //   two: formData.contact  || null,
      //   three: formData.alternateContact || null,
      //   four: formData.gstNo || null,
      //   five: formData.landlineNo || null,
      //   six: formData.email || null,
      //   seven: formData.contactPersonName || null,
      //   eight: formData.contactPersonContact || null,
      //   nine: formData.address || null,
      //   ten: formData.city || null,
      //   eleven: formData.state || null,
      //   twelve: formData.country || null,
      //   thirteen: formData.pincode || null,
      //   fourteen: formData.pancard || null,
      //   fifteen: formData.extraInfo || null,
      //   sixteen: emId  || null
      // };
      const payload = {
        one: formData.supplierName || "",
        two: formData.contact || "",
        three: formData.alternateContact || "",
        four: formData.gstNo || "",
        five: formData.landlineNo || "",
        six: formData.email || "",
        seven: formData.contactPersonName || "",
        eight: formData.contactPersonContact || "",
        nine: formData.address || "",
        ten: formData.city || "",
        eleven: formData.state || "",
        twelve: formData.country || "",
        thirteen: formData.pincode || "",
        fourteen: formData.pancard || "",
        fifteen: formData.extraInfo || "",
        sixteen: emId,
      };
      console.log(payload);
      const response = await axios.post(
        `${Base_URL}/inward/addSupplier`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": authApiKey,
          },
        }
      );

      console.log("response", response.data);

      if (response.status == "200") {
        setMsg(`${formData.supplierName} Supplier Added Successfully.`);
        setFormData({
          supplierName: "",
          contact: "",
          alternateContact: "",
          gstNo: "",
          landlineNo: "",
          email: "",
          contactPersonName: "",
          contactPersonContact: "",
          address: "",
          city: "",
          state: "",
          country: "",
          pincode: "",
          pancard: "",
          extraInfo: "",
        });
        navigate('/all-suppliers');
      } else {
        setMsg("Failed to add supplier. Please try again.");
      }
    } catch (error) {
      // console.error("Error during supplier submission:", error);
      // setMsg("Error occurred. Please try again later.");
      if (error.response) {
        console.error("Backend response error data:", error.response.data);
        setMsg(`Error: ${error.response.data.message || "Bad Request"}`);
      } else {
        console.error("Error:", error.message);
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
      <div style={{ padding: "0px", marginTop: "-15px" }}>
        <Link to={"/"} className="link-style">
          <span className="link-text">Home</span>
        </Link>
        <Link to={"/all-suppliers"} className="link-style">
          <i className="bi bi-dot link-icon"></i>
          <span className="link-text">All Suppliers</span>
        </Link>
        <span style={{ color: "gray" }}>
          <i className="bi bi-dot"></i>Supplier Master
        </span>
      </div>

      <p className="ComponentHeading">
        <i className="bi bi-plus-circle"></i>&nbsp; Add New Supplier
      </p>
      <hr />
      <div className="form-container" style={{ padding: "10px" }}>
        <form className="scrollable-form " onSubmit={handleSubmit}>
          <p className="ShowMsg text-center">{msg}</p>
          {/* 1. Supplier Name */}
          <div className="row mb-3">
            <div className="col-12">
              <label htmlFor="supplierName" className="labelText">
                Supplier Name<span className="required-star">*</span>
              </label>
              <input
                type="text"
                id="supplierName"
                name="supplierName"
                className="form-control"
                placeholder="Supplier Name"
                value={formData.supplierName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          {/* 2. Contact Info */}
          <div className="row mb-3">
            <div className="col-12 col-md-4">
              <label className="labelText" htmlFor="contact">
                Contact<span className="required-star">*</span>
              </label>
              <input
                type="text"
                id="contact"
                name="contact"
                className="form-control"
                placeholder="Contact"
                value={formData.contact}
                onChange={handleInputChange}
                maxLength={10}
              />
            </div>
            <div className="col-12 col-md-4">
              <label className="labelText" htmlFor="alternateContact">
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
              />
            </div>
            <div className="col-12 col-md-4">
              <label className="labelText" htmlFor="landlineNo">
                Landline No
              </label>
              <input
                type="text"
                id="landlineNo"
                name="landlineNo"
                className="form-control"
                placeholder="Landline No"
                value={formData.landlineNo}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* 3. GST & PAN */}
          <div className="row mb-3">
            <div className="col-12 col-md-6">
              <label className="labelText" htmlFor="gstNo">
                GST No
              </label>
              <input
                type="text"
                id="gstNo"
                name="gstNo"
                className="form-control"
                placeholder="GST No"
                value={formData.gstNo}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-12 col-md-6">
              <label className="labelText" htmlFor="pancard">
                PAN Card
              </label>
              <input
                type="text"
                id="pancard"
                name="pancard"
                className="form-control"
                placeholder="PAN Card"
                value={formData.pancard}
                onChange={handleInputChange}
                maxLength={10}
              />
            </div>
          </div>

          {/* 4. Contact Person */}
          {/* <div className="row mb-3">
            <div className="col-12 col-md-6">
              <label className="labelText" htmlFor="contactPersonName">
                Contact Person Name
              </label>
              <input
                type="text"
                id="contactPersonName"
                name="contactPersonName"
                className="form-control"
                placeholder="Contact Person Name"
                value={formData.contactPersonName}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-12 col-md-6">
              <label className="labelText" htmlFor="contactPersonContact">
                Contact Person Contact
              </label>
              <input
                type="text"
                id="contactPersonContact"
                name="contactPersonContact"
                className="form-control"
                placeholder="Contact Person Contact"
                value={formData.contactPersonContact}
                onChange={handleInputChange}
              />
            </div>
          </div> */}

          {/* 5. Address */}
          <div className="row mb-3">
            <div className="col-12">
              <label className="labelText" htmlFor="address">
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

          {/* 6. Country, State, City, Pincode */}
          {/* <div className="row mb-3">
            <div className="col-12 col-md-3">
              <label className="labelText" htmlFor="country">
                Country
              </label>
              <select
                id="country"
                name="country"
                className="form-control"
                value={formData.country}
                onChange={handleInputChange}
                disabled
              >
                <option value="India">India</option>
              </select>
            </div>
            <div className="col-12 col-md-3">
              <label className="labelText" htmlFor="state">
                State
              </label>
              <select
                id="state"
                name="state"
                className="form-control"
                value={formData.state}
                onChange={handleInputChange}
              >
                <option value="">Select State</option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                <option value="Assam">Assam</option>
                <option value="Bihar">Bihar</option>
                <option value="Chhattisgarh">Chhattisgarh</option>
                <option value="Goa">Goa</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Haryana">Haryana</option>
                <option value="Himachal Pradesh">Himachal Pradesh</option>
                <option value="Jharkhand">Jharkhand</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Kerala">Kerala</option>
                <option value="Madhya Pradesh">Madhya Pradesh</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Manipur">Manipur</option>
                <option value="Meghalaya">Meghalaya</option>
                <option value="Mizoram">Mizoram</option>
                <option value="Nagaland">Nagaland</option>
                <option value="Odisha">Odisha</option>
                <option value="Punjab">Punjab</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Sikkim">Sikkim</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Telangana">Telangana</option>
                <option value="Tripura">Tripura</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Uttarakhand">Uttarakhand</option>
                <option value="West Bengal">West Bengal</option>
                <option value="Andaman and Nicobar Islands">
                  Andaman and Nicobar Islands
                </option>
                <option value="Chandigarh">Chandigarh</option>
                <option value="Dadra and Nagar Haveli and Daman and Diu">
                  Dadra and Nagar Haveli and Daman and Diu
                </option>
                <option value="Delhi">Delhi</option>
                <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                <option value="Ladakh">Ladakh</option>
                <option value="Lakshadweep">Lakshadweep</option>
                <option value="Puducherry">Puducherry</option>
              </select>
            </div>
            <div className="col-12 col-md-3">
              <label className="labelText" htmlFor="city">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                className="form-control"
                placeholder="City"
                value={formData.city}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-12 col-md-3">
              <label className="labelText" htmlFor="pincode">
                Pincode
              </label>
              <input
                type="text"
                id="pincode"
                name="pincode"
                className="form-control"
                placeholder="Pincode"
                value={formData.pincode}
                onChange={handleInputChange}
              />
            </div>
          </div> */}

          {/* 7. Extra Info & Email */}
          <div className="row mb-3">
            <div className="col-12 col-md-6">
              <label className="labelText" htmlFor="extraInfo">
                Other Details
              </label>
              <textarea
                id="extraInfo"
                name="extraInfo"
                className="form-control"
                placeholder="Other Details"
                value={formData.extraInfo}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className="col-12 col-md-6">
              <label className="labelText" htmlFor="email">
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
