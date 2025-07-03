import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { apiConfig } from "../../src/config";
const shapes = [
  { id: 1, name: "Oval", code: "O", abbr: "OVL" },
  { id: 2, name: "Round", code: "R", abbr: "RND" },
];

const years = [
  { year: 2020, code: "A" },
  { year: 2021, code: "B" },
  { year: 2022, code: "C" },
  { year: 2023, code: "D" },
  { year: 2024, code: "E" },
  { year: 2025, code: "F" },
  { year: 2026, code: "G" },
  { year: 2027, code: "H" },
  { year: 2028, code: "I" },
  { year: 2029, code: "J" },
  { year: 2030, code: "K" },
  { year: 2031, code: "L" },
  { year: 2032, code: "M" },
  { year: 2033, code: "N" },
  { year: 2034, code: "O" },
  { year: 2035, code: "P" },
  
];

export default function AddItemInward() {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [photoPreview, setPhotoPreview] = useState(null);
  const [overlayedImage, setOverlayedImage] = useState(null); // Final image with text
  const Base_URL = apiConfig.getBaseURL();
  const authApiKey = apiConfig.getApiKey();
  const [stones, setStones] = useState([]);
  const [shapes, setShapes] = useState([]);


  const [form, setForm] = useState({
    year: "",
    stone_id: "",
    shape_id: "",
    sku_code: "",
    color: "",
    description: "",
    label_description: "",
    size: "",
    units: "Cts",
    quantity: "",
    location: "",
    cost_code: "",
    sale_code: "",
    photo_path: "",
    addedby: 1,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "photo_path" && files && files.length > 0) {
      const file = files[0];
      setPhotoPreview(URL.createObjectURL(file));
      setForm((prev) => ({ ...prev, [name]: file }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  //Web service to get stone names
  useEffect(() => {
    const fetchStones = async () => {
      try {
        const res = await axios.get(`${Base_URL}/stone/getAllStoneNames`, {
          headers: {
            "x-api-key": `${authApiKey}`
          }
        });
        if (res.data?.data) {
          setStones(res.data.data); // Use res.data.data because of your structure
        }
      } catch (err) {
        console.error("Failed to fetch stones:", err);
      }
    };

    fetchStones();
  }, []);

//web service to get stone shapes
useEffect(() => {
    const fetchStones = async () => {
      try {
        const res = await axios.get(`${Base_URL}/stone/getAllStoneShapes`, {
          headers: {
            "x-api-key": `${authApiKey}`
          }
        });
        if (res.data?.data) {
          setShapes(res.data.data); // Use res.data.data because of your structure
        }
      } catch (err) {
        console.error("Failed to fetch shapes:", err);
        setMsg("Failed to fetch shapes", err)
      }
    };

    fetchStones();
  }, []);

  //For embedded image
  const drawOverlay = (imageFile) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = async () => {
        // Set canvas size = image size
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        const fontSize = Math.max(10, Math.floor(canvas.height * 0.008));
        ctx.font = `${fontSize}px Arial`;
        ctx.textAlign = "right";
        ctx.textBaseline = "top";
        ctx.shadowColor = "rgba(0,0,0,0.6)";
        ctx.shadowBlur = 4;

        // Build text lines dynamically
        const lines = [];
        if (form.sku_code) lines.push(form.sku_code);
        if (form.size) lines.push(`${form.size} mm`);
        if (form.quantity) lines.push(`${parseFloat(form.quantity).toFixed(2)} ${form.units}`);

        const paddingX = 5;
        const paddingY = 5;
        const lineSpacing = fontSize + 2;
        const totalHeight = lines.length * lineSpacing - 2;

        // Align to right-center
        const startX = canvas.width - paddingX;
        const startY = (canvas.height - totalHeight) / 2;

        // Draw semi-transparent black box
        const maxTextWidth = Math.max(...lines.map(line => ctx.measureText(line).width));
        ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        ctx.fillRect(
          startX - maxTextWidth - paddingX,
          startY - paddingY,
          maxTextWidth + paddingX * 2,
          totalHeight + paddingY * 2
        );

        // Draw each line
        ctx.fillStyle = "white";
        lines.forEach((line, i) => {
          ctx.fillText(line, startX, startY + i * lineSpacing);
        });

        const finalImage = canvas.toDataURL("image/jpeg");
        setOverlayedImage(finalImage);
        setPhotoPreview(finalImage);

        const blob = await fetch(finalImage).then(res => res.blob());
        const file = new File([blob], `${form.sku_code || "preview"}.jpg`, { type: "image/jpeg" });
        handleImageUpload(file);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(imageFile);
  };


  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("files", file);

    try {
      const res = await axios.post("http://localhost:5000/img/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-api-key": "b986ce110c4e7c523882db76b5rft124"
        },
      });

      if (res.data.paths && res.data.paths.length > 0) {
        const imagePath = res.data.paths[0]; // Get uploaded path
        setForm((prev) => ({ ...prev, photo_path: imagePath }));
      }
    } catch (err) {
      console.error("Image upload failed:", err);
    }
  };



  const handleAutoGenerate = () => {
    const yearCode =
      years.find((y) => y.year === parseInt(form.year))?.code || "";

      const selectedStone = stones.find(
      (s) => s.jit_stone_id === parseInt(form.stone_id)
    );
    const stoneCode = selectedStone?.jit_stone_code || "";
    const stoneAbbr = selectedStone?.jit_stone_abbr || "";
    console.log("Stone",stoneCode , stoneAbbr);

      const selectedShape = shapes.find(
      (s) => s.jit_shape_id === parseInt(form.shape_id)
    );
    const shapeCode = selectedShape?.jit_shape_code || "";
    const shapeAbbr = selectedShape?.jit_shape_abbr || "";
    console.log("Shape",shapeCode , shapeAbbr);

  
    const serial = "001"; // You can replace this by calling backend to get next serial
    const sku = `${yearCode}${stoneCode}${shapeCode}-${serial}`;

    const labelDesc = `${stoneAbbr} ${shapeAbbr}`.trim();

    setForm((prev) => ({
      ...prev,
      sku_code: sku,
      label_description: labelDesc,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imagePath = form.photo_path; // Already set if uploaded earlier

      // If overlayed image is not yet uploaded
      if (!imagePath && overlayedImage) {
        const blob = await fetch(overlayedImage).then(res => res.blob());
        const file = new File([blob], `${form.sku_code}.jpg`, { type: "image/jpeg" });

        const uploadForm = new FormData();
        uploadForm.append("files", file);

        const uploadRes = await axios.post("http://localhost:5000/img/upload", uploadForm, {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-api-key": "b986ce110c4e7c523882db76b5rft124"
          }
        });

        if (uploadRes.data.paths && uploadRes.data.paths.length > 0) {
          imagePath = uploadRes.data.paths[0];
        } else {
          throw new Error("Image upload failed");
        }
      }

      // Prepare final form data with uploaded image path
      const finalForm = new FormData();
      for (let key in form) {
        if (key !== "photo_path") finalForm.append(key, form[key]);
      }
      finalForm.append("photo_path", imagePath);

      // 🔁 Call your Item Inward API (example URL below)
      const res = await axios.post("http://localhost:5000/api/item-inward", finalForm, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-api-key": "b986ce110c4e7c523882db76b5rft124"
        }
      });

      if (res.status === 200) {
        setMsg("Item inward saved successfully!");
        setForm({
          year: "",
          stone_id: "",
          shape_id: "",
          sku_code: "",
          color: "",
          description: "",
          label_description: "",
          size: "",
          units: "Cts",
          quantity: "",
          location: "",
          cost_code: "",
          sale_code: "",
          photo_path: "",
          addedby: 1,
        });
        setPhotoPreview(null);
        setOverlayedImage(null);

        setTimeout(() => setMsg(""), 3000);
      }

    } catch (err) {
      console.error("Submission failed:", err);
      setMsg("Submission failed. Please try again.");
    }
  };


  return (
    <div className="add-supplier-container">
      <div style={{ padding: "0px", marginTop: "-15px" }}>
        <Link to="/" className="link-style">
          <span className="link-text">Home</span>
        </Link>
        <Link to="/item-inward-list" className="link-style">
          <i className="bi bi-dot link-icon"></i>
          <span className="link-text">All Items</span>
        </Link>
        <span style={{ color: "gray" }}>
          <i className="bi bi-dot"></i>Item Inward
        </span>
      </div>

      <p className="ComponentHeading">
        <i className="bi bi-plus-circle" />
        &nbsp; Add Item Inward
      </p>
      <hr />

      <div className="form-container" style={{ padding: "10px" }}>
        <form className="scrollable-form" onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-4 mb-1">
              <label>Year of Purchase *</label>
              <select
                name="year"
                className="form-control"
                value={form.year}
                onChange={handleChange}
                required
              >
                <option value="">-- Select Year --</option>
                {years.map((y, i) => (
                  <option key={i} value={y.year}>
                    {y.year}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-4 mb-1">
              <label>Stone Name *</label>
              <select
                name="stone_id"
                className="form-control"
                value={form.stone_id}
                onChange={handleChange}
                required
              >
                <option value="">-- Select Stone --</option>
                {stones.map((s) => (
                  <option key={s.jit_stone_id} value={s.jit_stone_id}>
                    {s.jit_stone_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-4 mb-1">
              <label>Shape *</label>
              <select
                name="shape_id"
                className="form-control"
                value={form.shape_id}
                onChange={handleChange}
                required
              >
                <option value="">-- Select Shape --</option>
                {shapes.map((s) => (
                  <option key={s.jit_shape_id} value={s.jit_shape_id}>
                    {s.jit_shape_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-4 mb-1">
              <label>SKU Code</label>
              <input
                type="text"
                name="sku_code"
                className="form-control"
                value={form.sku_code}
                readOnly
              />
              <button
                type="button"
                className="btn btn-sm btn-secondary mt-1"
                onClick={handleAutoGenerate}
              >
                Generate SKU
              </button>
            </div>

            <div className="col-md-4 mb-1">
              <label>Color</label>
              <input
                type="text"
                name="color"
                className="form-control"
                value={form.color}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4 mb-1">
              <label>Label Description</label>
              <input
                type="text"
                name="label_description"
                className="form-control"
                value={form.label_description}
                readOnly
              />
            </div>

            <div className="col-md-4 mb-1">
              <label>Description</label>
              <textarea
                name="description"
                className="form-control"
                value={form.description}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4 mb-1">
              <label>Size</label>
              <input
                type="text"
                name="size"
                className="form-control"
                value={form.size}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4 mb-1">
              <label>Units</label>
              <select
                name="units"
                className="form-control"
                value={form.units}
                onChange={handleChange}
              >
                <option value="Cts">Cts</option>
                <option value="Gms">Gms</option>
                <option value="Pcs">Pcs</option>
              </select>
            </div>

            <div className="col-md-4 mb-1">
              <label>Quantity *</label>
              <input
                type="number"
                step="0.01"
                name="quantity"
                className="form-control"
                value={form.quantity}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-4 mb-1">
              <label>Location</label>
              <input
                type="text"
                name="location"
                className="form-control"
                value={form.location}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4 mb-1">
              <label>Cost Code</label>
              <input
                type="text"
                name="cost_code"
                className="form-control"
                value={form.cost_code}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4 mb-1">
              <label>Sale Code</label>
              <input
                type="text"
                name="sale_code"
                className="form-control"
                value={form.sale_code}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4 mb-1">
              <label>Upload Photo</label>
              <input
                type="file"
                name="photo_path"
                accept="image/*"
                className="form-control"
                // onChange={handleChange}
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setForm((prev) => ({ ...prev, photo_path: file }));
                    drawOverlay(file);
                    //  handleImageUpload(file); 
                  }
                }}
              />
              {photoPreview && (
                <img
                  src={photoPreview}
                  alt="Preview"
                  className="mt-2"
                  style={{

                    height: "auto",
                    width: "100%",
                    maxHeight: "200px",
                    maxWidth: '250px',
                    border: "0px",
                  }}
                />
              )}
            </div>
          </div>

          <div className="d-flex justify-content-center">
            <button className="custom-btn-primary">Submit</button>
            <button
              type="button"
              className="custom-btn-secondary ms-2"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
          </div>

          {msg && (
            <p
              className="text-success text-center mt-3"
              style={{ fontWeight: "bold" }}
            >
              {msg}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
