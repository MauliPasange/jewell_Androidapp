import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// Sample static data
const customers = ["Ganesh Jewellers", "Shivam Traders", "Mahadev Exports"];
const items = [
  { itemName: "Diamond Ring", color: "White", shape: "Round", saleRate: 5000 },
  { itemName: "Ruby Pendant", color: "Red", shape: "Oval", saleRate: 2500 },
  { itemName: "Emerald Earrings", color: "Green", shape: "Square", saleRate: 3000 },
];


export default function AddDeliveryChallan() {
  const [form, setForm] = useState({
    customer: "",
    itemName: "",
    color: "",
    shape: "",
    quantity: "",
    saleRate: "",
    totalAmount: "",
    advance: "",
    remainingPayment: "",
    remark: "",
  });

  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

 const handleChange = (e) => {
  const { name, value } = e.target;

  setForm((prev) => {
    const updatedForm = { ...prev, [name]: value };

    const quantity = parseFloat(name === "quantity" ? value : prev.quantity) || 0;
    const saleRate = parseFloat(name === "saleRate" ? value : prev.saleRate) || 0;
    const totalAmount = quantity * saleRate;

    updatedForm.totalAmount = totalAmount.toFixed(2);

    const advance = parseFloat(name === "advance" ? value : prev.advance) || 0;
    updatedForm.remainingPayment = (totalAmount - advance).toFixed(2);

    return updatedForm;
  });
};


const handleItemChange = (e) => {
  const selectedItemName = e.target.value;
  const selectedItem = items.find((item) => item.itemName === selectedItemName);

  const quantity = parseFloat(form.quantity) || 0;
  const saleRate = selectedItem?.saleRate || 0;
  const totalAmount = quantity * saleRate;
  const advance = parseFloat(form.advance) || 0;

  setForm((prev) => ({
    ...prev,
    itemName: selectedItemName,
    color: selectedItem?.color || "",
    shape: selectedItem?.shape || "",
    saleRate: saleRate,
    totalAmount: totalAmount.toFixed(2),
    remainingPayment: (totalAmount - advance).toFixed(2),
  }));
};

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Delivery Challan Submitted:", form);
    setMsg("Delivery Challan saved successfully!");
    setForm({
      customer: "",
      itemName: "",
      color: "",
      shape: "",
      quantity: "",
      saleRate: "",
      totalAmount: "",
      advance: "",
      remark: "",
    });
    setTimeout(() => setMsg(""), 3000);
  };

    const handleBackClick = () => {
    navigate(-1); // This will navigate to the previous page
  };

  return (
   <>
    <div className="add-supplier-container">
      <div style={{ padding: "0px", marginTop: "-15px" }}>
        <Link to={"/"} className="link-style">
          <span className="link-text">Home</span>
        </Link>
        <Link to={"/all_delChallan"} className="link-style">
          <i className="bi bi-dot link-icon"></i>
          <span className="link-text">All Challans</span>
        </Link>
        <span style={{ color: "gray" }}>
          <i className="bi bi-dot"></i>Delivery Challan
        </span>
      </div>

      <p className="ComponentHeading">
        <i className="bi bi-plus-circle" />
        &nbsp; Delivery Challan
      </p>
      <hr />

      <div className="form-container" style={{ padding: "10px" }}>
        <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-4 mb-1">
            <label>Customer <span className="required-star">*</span></label>
            <select
              name="customer"
              className="form-control"
              value={form.customer}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Customer --</option>
              {customers.map((c, i) => (
                <option key={i} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="col-md-4 mb-1">
            <label>Item Name <span className="required-star">*</span></label>
            <select
              name="itemName"
              className="form-control"
              value={form.itemName}
              onChange={handleItemChange}
              required
            >
              <option value="">-- Select Item --</option>
              {items.map((item, i) => (
                <option key={i} value={item.itemName}>
                  {item.itemName}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-4 mb-1">
            <label>Color</label>
            <input
              type="text"
              name="color"
              className="form-control"
              value={form.color}
              readOnly
            />
          </div>

          <div className="col-md-4 mb-1">
            <label>Shape</label>
            <input
              type="text"
              name="shape"
              className="form-control"
              value={form.shape}
              readOnly
            />
          </div>

          <div className="col-md-4 mb-1">
            <label>Quantity <span className="required-star">*</span></label>
            <input
              type="number"
              name="quantity"
              className="form-control"
              value={form.quantity}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-4 mb-1">
            <label>Sale Rate <span className="required-star">*</span></label>
            <input
              type="number"
              name="saleRate"
              className="form-control"
              value={form.saleRate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-4 mb-1">
            <label>Total Amount</label>
            <input
              type="number"
              name="totalAmount"
              className="form-control"
              value={form.totalAmount}
              readOnly
            />
          </div>

          <div className="col-md-4 mb-1">
            <label>Advance</label>
            <input
              type="number"
              name="advance"
              className="form-control"
              value={form.advance}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4 mb-1">
  <label>Remaining Payment</label>
  <input
    type="number"
    name="remainingPayment"
    className="form-control"
    value={form.remainingPayment}
    readOnly
  />
</div>


          <div className="col-md-8 mb-1">
            <label>Remark</label>
            <textarea
              name="remark"
              className="form-control"
              value={form.remark}
              onChange={handleChange}
            />
          </div>
        </div>
        <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <button className="custom-btn-primary">Submit</button>
            <button
              type="button"
              onClick={handleBackClick}
              className="custom-btn-secondary"
            >
              Back
            </button>
          </div>
       
        {msg && <p className="text-success text-center mt-3">{msg}</p>}
      </form>
      </div>
    </div>
   </>
  );
}
