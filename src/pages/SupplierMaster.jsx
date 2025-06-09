import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function SupplierMaster() {
  const [formData, setFormData] = useState({
    supplierName: '',
    contact: '',
    alternateContact: '',
    gstNo: '',
    landlineNo: '',
    email: '',
    contactPersonName: '',
    contactPersonContact: '',
    address: '',
    city: '',
    state: '',
    country: '',
    pincode: '',
    pancard: '',
    extraInfo: ''
  });

  const [msg, setMsg] = useState('');
  const Base_URL = sessionStorage.getItem('Base_URL');
  const authApiKey = sessionStorage.getItem('authApiKey');
  const emId = sessionStorage.getItem("em_id");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${Base_URL}/addSupplier`, {
        formData,
        emId,
        authApiKey
      });

      console.log('response', response.data);

      if (response.data === "Success") {
        setMsg(`${formData.supplierName} Supplier Added Successfully.`);
      } else {
        setMsg("Failed to add supplier. Please try again.");
      }
    } catch (error) {
      console.error('Error during supplier submission:', error);
      setMsg("Error occurred. Please try again later.");
    }

    setFormData({
      supplierName: '',
      contact: '',
      alternateContact: '',
      gstNo: '',
      landlineNo: '',
      email: '',
      contactPersonName: '',
      contactPersonContact: '',
      address: '',
      city: '',
      state: '',
      country: '',
      pincode: '',
      pancard: '',
      extraInfo: ''
    });

    setTimeout(() => {
      setMsg('');
    }, 5000);
  };

  useEffect(() => {
    if (msg) {
      const timer = setTimeout(() => {
        setMsg('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [msg]);

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className='add-supplier-container'>
      <div style={{ padding: "0px", marginTop: "-15px" }}>
        <Link to={'/'} className="link-style"><span className="link-text">Home</span></Link>
        <Link to={'/all-suppliers'} className="link-style"><i className="bi bi-dot link-icon"></i><span className="link-text">All Suppliers</span></Link>
        <span style={{ color: "gray" }}><i className="bi bi-dot"></i>Supplier Master</span>
      </div>

      <p className='ComponentHeading'><i className="bi bi-plus-circle"></i>&nbsp; Add New Supplier</p>
      <hr />
      <div className="form-container" style={{ padding: "10px" }}>
        <form className='scrollable-form ' onSubmit={handleSubmit}>
          {/* 1. Supplier Name */}
          <div className="row mb-3">
            <div className="col-12">
              <label htmlFor="supplierName" className='labelText'>Supplier Name<span className="required-star">*</span></label>
              <input type="text" id="supplierName" name="supplierName" className="form-control" placeholder="Supplier Name" value={formData.supplierName} onChange={handleInputChange} required />
            </div>
          </div>

          {/* 2. Contact Info */}
          <div className="row mb-3">
            <div className="col-12 col-md-4">
              <label className='labelText' htmlFor="contact">Contact<span className="required-star">*</span></label>
              <input type="text" id="contact" name="contact" className="form-control" placeholder="Contact" value={formData.contact} onChange={handleInputChange} />
            </div>
            <div className="col-12 col-md-4">
              <label className='labelText' htmlFor="alternateContact">Alternate Contact</label>
              <input type="text" id="alternateContact" name="alternateContact" className="form-control" placeholder="Alternate Contact" value={formData.alternateContact} onChange={handleInputChange} />
            </div>
            <div className="col-12 col-md-4">
              <label className='labelText' htmlFor="landlineNo">Landline No</label>
              <input type="text" id="landlineNo" name="landlineNo" className="form-control" placeholder="Landline No" value={formData.landlineNo} onChange={handleInputChange} />
            </div>
          </div>

          {/* 3. GST & PAN */}
          <div className="row mb-3">
            <div className="col-12 col-md-6">
              <label className='labelText' htmlFor="gstNo">GST No<span className="required-star">*</span></label>
              <input type="text" id="gstNo" name="gstNo" className="form-control" placeholder="GST No" value={formData.gstNo} onChange={handleInputChange} />
            </div>
            <div className="col-12 col-md-6">
              <label className='labelText' htmlFor="pancard">PAN Card<span className="required-star">*</span></label>
              <input type="text" id="pancard" name="pancard" className="form-control" placeholder="PAN Card" value={formData.pancard} onChange={handleInputChange} />
            </div>
          </div>

          {/* 4. Contact Person */}
          <div className="row mb-3">
            <div className="col-12 col-md-6">
              <label className='labelText' htmlFor="contactPersonName">Contact Person Name</label>
              <input type="text" id="contactPersonName" name="contactPersonName" className="form-control" placeholder="Contact Person Name" value={formData.contactPersonName} onChange={handleInputChange} />
            </div>
            <div className="col-12 col-md-6">
              <label className='labelText' htmlFor="contactPersonContact">Contact Person Contact</label>
              <input type="text" id="contactPersonContact" name="contactPersonContact" className="form-control" placeholder="Contact Person Contact" value={formData.contactPersonContact} onChange={handleInputChange} />
            </div>
          </div>

          {/* 5. Address */}
          <div className="row mb-3">
            <div className="col-12">
              <label className='labelText' htmlFor="address">Address</label>
              <textarea id="address" name="address" className="form-control" placeholder="Address" value={formData.address} onChange={handleInputChange}></textarea>
            </div>
          </div>

          {/* 6. Country, State, City, Pincode */}
          <div className="row mb-3">
            <div className="col-12 col-md-3">
              <label className='labelText' htmlFor="country">Country</label>
              <select id="country" name="country" className="form-control" value={formData.country} onChange={handleInputChange}>
                <option value="">Select Country</option>
                <option value="India">India</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
              </select>
            </div>
            <div className="col-12 col-md-3">
              <label className='labelText' htmlFor="state">State</label>
              <select id="state" name="state" className="form-control" value={formData.state} onChange={handleInputChange}>
                <option value="">Select State</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Gujarat">Gujarat</option>
              </select>
            </div>
            <div className="col-12 col-md-3">
              <label className='labelText' htmlFor="city">City</label>
              <input type="text" id="city" name="city" className="form-control" placeholder="City" value={formData.city} onChange={handleInputChange} />
            </div>
            <div className="col-12 col-md-3">
              <label className='labelText' htmlFor="pincode">Pincode</label>
              <input type="text" id="pincode" name="pincode" className="form-control" placeholder="Pincode" value={formData.pincode} onChange={handleInputChange} />
            </div>
          </div>

          {/* 7. Extra Info & Email */}
          <div className="row mb-3">
            <div className="col-12 col-md-6">
              <label className='labelText' htmlFor="extraInfo">Other Details</label>
              <textarea id="extraInfo" name="extraInfo" className="form-control" placeholder="Other Details" value={formData.extraInfo} onChange={handleInputChange}></textarea>
            </div>
            <div className="col-12 col-md-6">
              <label className='labelText' htmlFor="email">Email</label>
              <input type="email" id="email" name="email" className="form-control" placeholder="Email" value={formData.email} onChange={handleInputChange} />
            </div>
          </div>

          {/* Buttons */}
          <div className="row mb-3">
            <div className="col text-center">
              <button type="submit" className="btn btn-primary me-3">Submit</button>
              <button type="button" onClick={handleBackClick} className="btn btn-secondary">Back</button>
            </div>
          </div>

          <p className='ShowMsg text-center'>{msg}</p>
        </form>
      </div>

    </div>
  );
}
