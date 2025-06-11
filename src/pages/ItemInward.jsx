import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// Sample supplier and voucher data (replace with API later)
const suppliersData = [
  {
    supplierName: "ABC Jewellers",
    vouchers: [
      {
        voucherNo: "VCH-001",
        itemName: "Pearls",
        itemShape: "Round",
        itemColor: "Green",
      },
      {
        voucherNo: "VCH-002",
        itemName: "Gems",
        itemShape: "Square",
        itemColor: "Royal Blue",
      },
    ],
  },
  {
    supplierName: "XYZ Traders",
    vouchers: [
      {
        voucherNo: "VCH-003",
        itemName: "Diamond",
        itemShape: "Oval",
        itemColor: "Red",
      },
    ],
  },
];

export default function ItemInward() {
  const [form, setForm] = useState({
    date: "",
    supplierName: "",
    voucherNo: "",
    itemName: "",
    itemShape: "",
    itemColor: "",
    subItemName: "",
    number: "",
    length: "",
    breadth: "",
    height: "",
    quantity: "",
    unit: "",
    hsnCode: "",
    gst: "",
    purchasePrice: "",
    purchaseCode: "",
    salePrice: "",
    saleCode: "",
    remarks: "",
    img: [],
  });

  const [voucherList, setVoucherList] = useState([]);
  const [suppliers] = useState(suppliersData);
  const [msg, setMsg] = useState("");
  const [imagePreview, setImagePreview] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSupplierChange = (e) => {
    const supplierName = e.target.value;
    const selectedSupplier = suppliers.find(
      (s) => s.supplierName === supplierName
    );

    setForm((prev) => ({
      ...prev,
      supplierName,
      voucherNo: "",
      itemName: "",
      itemShape: "",
      itemColor: "",
    }));

    setVoucherList(selectedSupplier ? selectedSupplier.vouchers : []);
  };

  const handleVoucherChange = (e) => {
    const voucherNo = e.target.value;
    const selectedVoucher = voucherList.find((v) => v.voucherNo === voucherNo);

    setForm((prev) => ({
      ...prev,
      voucherNo,
      itemName: selectedVoucher?.itemName || "",
      itemShape: selectedVoucher?.itemShape || "",
      itemColor: selectedVoucher?.itemColor || "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Item Inward submitted:", form);
    setMsg("Saved successfully!");
    setForm({
      date: "",
      supplierName: "",
      voucherNo: "",
      itemName: "",
      itemShape: "",
      itemColor: "",
      subItemName: "",
      number: "",
      length: "",
      breadth: "",
      height: "",
      quantity: "",
      unit: "",
      hsnCode: "",
      gst: "",
      purchasePrice: "",
      purchaseCode: "",
      salePrice: "",
      saleCode: "",
      remarks: "",
      image: null,
    });
    setVoucherList([]);
    setTimeout(() => setMsg(""), 3000);
  };

  // Handle "Back" button click
  const handleBackClick = () => {
    navigate(-1); // This will navigate to the previous page
  };

  return (
    <div className="add-supplier-container">
      <div style={{ padding: "0px", marginTop: "-15px" }}>
        <Link to={"/"} className="link-style">
          <span className="link-text">Home</span>
        </Link>
        <Link to={"/all-inward"} className="link-style">
          <i className="bi bi-dot link-icon"></i>
          <span className="link-text">All Inwards</span>
        </Link>
        <span style={{ color: "gray" }}>
          <i className="bi bi-dot"></i>Inward Master
        </span>
      </div>

      <p className="ComponentHeading">
        <i className="bi bi-plus-circle" />
        &nbsp; Item Inward
      </p>
      <hr />

      <div className="form-container" style={{ padding: "10px" }}>
        <form className="scrollable-form" onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-12 col-md-3">
              <label className="labelText">Select Date </label>
              <span className="required-star">*</span>
              <input
                type="date"
                name="date"
                className="form-control"
                value={form.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-12 col-md-3">
              <label className="labelText">Select Supplier</label>
              <span className="required-star">*</span>
              <select
                name="supplierName"
                className="form-control"
                value={form.supplierName}
                onChange={handleSupplierChange}
                required
              >
                <option value="">-- Select Supplier --</option>
                {suppliers.map((s, i) => (
                  <option key={i} value={s.supplierName}>
                    {s.supplierName}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-12 col-md-3">
              <label className="labelText">Select Voucher No.</label>
              <span className="required-star">*</span>
              <select
                name="voucherNo"
                className="form-control"
                value={form.voucherNo}
                onChange={handleVoucherChange}
                required
              >
                <option value="">-- Select Voucher --</option>
                {voucherList.map((v, i) => (
                  <option key={i} value={v.voucherNo}>
                    {v.voucherNo}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-12 col-md-3">
              <label className="labelText">Item Name</label>
              <input
                name="itemName"
                className="form-control"
                value={form.itemName}
                readOnly
              />
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-md-3">
              <label className="labelText">Item Shape</label>
              <input
                name="itemShape"
                className="form-control"
                value={form.itemShape}
                readOnly
              />
            </div>

            <div className="col-12 col-md-3">
              <label className="labelText">Item Color</label>
              <input
                name="itemColor"
                className="form-control"
                value={form.itemColor}
                readOnly
              />
            </div>

            {[
              ["subItemName", "Enter Sub‑Item Name"],
              ["number", "Number"],
              ["length", "Length"],
              ["breadth", "Breadth"],
              ["height", "Height"],
              ["quantity", "Quantity"],
            ].map(([name, label]) => (
              <div className="col-12 col-md-3 mb-3" key={name}>
                <label className="labelText">{label}</label>
                <input
                  name={name}
                  type="text"
                  className="form-control"
                  value={form[name]}
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>

          <div className="row">
            {[
              ["unit", "Unit"],
              ["hsnCode", "HSN Code"],
              ["gst", "GST (%)"],
              ["purchasePrice", "Purchase Price"],
            ].map(([name, label]) => (
              <div className="col-12 col-md-3 mb-3" key={name}>
                <label className="labelText">{label}</label>
                <input
                  name={name}
                  type={
                    name === "quantity" ||
                      name === "gst" ||
                      name.toLowerCase().includes("price")
                      ? "number"
                      : "text"
                  }
                  className="form-control"
                  value={form[name]}
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>

          <div className="row">
            {[
              ["purchaseCode", "Purchase Code"],
              ["salePrice", "Sale Price"],
              ["saleCode", "Sale Code"],
              ["remarks", "Remarks"],
            ].map(([name, label]) => (
              <div className="col-12 col-md-3 mb-3" key={name}>
                <label className="labelText">{label}</label>
                <input
                  name={name}
                  type={name === "salePrice" ? "number" : "text"}
                  className="form-control"
                  value={form[name]}
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>
          <div className="row ">
            <div className="col-12 col-md-3 ">
              <label className="labelText">Upload Image</label>
              <input
                type="file"
                accept="image/*"
                multiple
                className="form-control"
                onChange={(e) => {
                  const files = Array.from(e.target.files).slice(0, 3); // limit to 3
                  setForm((prev) => ({ ...prev, image: files }));
                  setImagePreview(files.map((file) => URL.createObjectURL(file)));
                }}
              />

            </div>
            {imagePreview.length > 0 && (
              <div className="row mt-2">
                {imagePreview.map((src, index) => (
                  <div className="col-4 col-md-2 mb-3" key={index}>
                    <img
                      src={src}
                      alt={`Preview ${index + 1}`}
                      className="img-thumbnail"
                      style={{
                        width: "150px",
                        height:"150px",
                       
                        objectFit: "contain",
                      }}
                    />
                  </div>
                ))}
              </div>
            )}

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
          {msg && <p className="ShowMsg text-center">{msg}</p>}
        </form>
      </div>
    </div>
  );
}
