import React, { useState, useEffect } from "react";
import axios from "axios"; // make sure axios is installed
import { Link, useNavigate } from "react-router-dom";
import { apiConfig } from "../../src/config";


// Sample supplier and voucher data (replace with API later)
export default function ItemInward() {
  const [form, setForm] = useState({
    date: "",
    supplierId: "",
    supplierName: "",
    voucherNo: "",
    itemName: "",
    itemId: "",
    itemShape: "",
    shapeId: "",
    itemColor: "",
    colorId: "",
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
  const [suppliers, setSuppliers] = useState([]);
  const [msg, setMsg] = useState("");
  const [imagePreview, setImagePreview] = useState([]);
  const Base_URL = apiConfig.getBaseURL();
  const authApiKey = apiConfig.getApiKey();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {

    const fetchSuppliers = async () => {
      try {
        const response = await axios.get(`${Base_URL}/inward/getActiveSuppliers`, {
          headers: {
            "x-api-key": authApiKey,
          },
        });
        setSuppliers(response.data.data); // adjust this if your API response shape is different
        console.log(response.data.data);

      } catch (error) {
        console.error("Failed to fetch suppliers:", error);
      }
    };

    fetchSuppliers();
  }, []);



  const handleSupplierChange = async (e) => {
    const supplierId = e.target.value;
    const selectedSupplier = suppliers.find((s) => s.jew_sup_id == supplierId);

    setForm((prev) => ({
      ...prev,
      supplierId,
      supplierName: selectedSupplier?.supplierName || "",
      voucherNo: "",
      itemName: "",
      itemId: "",
      itemShape: "",
      shapeId: "",
      itemColor: "",
      colorId: ""
    }));

    try {
      const response = await axios.post(
        `${Base_URL}/inward/getVouchersBySupplierId`, { id: supplierId },
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": authApiKey,
          },
        }
      );

      setVoucherList(response.data.data); // adjust this based on your actual API response jew_voucher
    } catch (error) {
      console.error("Error fetching vouchers:", error);
      setVoucherList([]);
    }
  };

  const handleVoucherChange = (e) => {
    const voucherId = e.target.value;
    const selectedVoucher = voucherList.find((v) => v.jew_vou_id == voucherId);

    setForm((prev) => ({
      ...prev,
      voucherNo: voucherId, // this fixes the selected option display
      itemName: selectedVoucher?.item_name || "",
      itemShape: selectedVoucher?.shape_name || "",
      itemColor: selectedVoucher?.color_name || "",
      itemId: selectedVoucher?.item_id || "",
      shapeId: selectedVoucher?.shape_id || "",
      colorId: selectedVoucher?.color_id || "",
    }));
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let uploadedImagePaths = [];

      if (form.img && form.img.length > 0) {
        const imageFormData = new FormData();
        form.img.forEach((file) => imageFormData.append("files", file));

        const imageUploadResponse = await axios.post(
          `${Base_URL}/img/upload`,
          imageFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              "x-api-key": authApiKey,
            },
          }
        );

        uploadedImagePaths = imageUploadResponse.data.paths; // e.g., ["img1.jpg", "img2.jpg"]
      }

      const payload = {
        one: form.itemId || "",
        two: form.shapeId || "",
        three: form.colorId || "",
        four: form.subItemName || "",
        five: form.voucherNo || "",
        six: form.length || "",
        seven: form.breadth || "",
        eight: form.height || "",
        nine: form.quantity || "",
        ten: form.unit || "",
        eleven: form.hsnCode || "",
        twelve: "null",
        thirteen: parseFloat(form.purchasePrice) || "",
        fourteen: form.purchaseCode || "",
        fifteen: parseFloat(form.salePrice) || "",
        sixteen: form.saleCode || "",
        seventeen: form.supplierId || "",
        eighteen: form.remarks || "",
        nineteen: uploadedImagePaths[0] || "",
        twenty: uploadedImagePaths[1] || "",
        twentyone: uploadedImagePaths[2] || "",
        twentytwo: 1
      };

      await axios.post(`${Base_URL}/inward/addInwardItem`, payload, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": authApiKey,
        },
      });

      setMsg(" Item Inward Saved successfully!");
      setForm({
        date: "",
        supplierId: "",
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
        shapeId: "",
        itemId: "",
        colorId: ""
      });
      setImagePreview([]);
      setVoucherList([]);
      setTimeout(() => setMsg(""), 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit.");
    }
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
                name="supplierId"
                className="form-control"
                value={form.supplierId}
                onChange={handleSupplierChange}
                required
              >
                <option value="">-- Select Supplier --</option>
                {suppliers.map((s) => (
                  <option key={s.jew_sup_id} value={s.jew_sup_id}>
                    {s.jew_sup_supplier_name}
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
                  <option key={i} value={v.jew_vou_id}>
                    {v.jew_voucher}
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
                  const files = Array.from(e.target.files).slice(0, 3);
                  setForm((prev) => ({ ...prev, img: files })); // ✅ correct property
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
                        height: "150px",

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
