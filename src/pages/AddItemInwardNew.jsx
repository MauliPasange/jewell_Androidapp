import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { apiConfig } from "../../src/config";

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

  const generateBaseDescription = (stoneId, shapeId, skuCode) => {
  const stone = stones.find((s) => s.jit_stone_id === parseInt(stoneId));
  const shape = shapes.find((s) => s.jit_shape_id === parseInt(shapeId));

  const stoneName = stone?.jit_stone_name || '';
  const shapeName = shape?.jit_shape_name || '';

  return ` stone-${stoneName} in ${shapeName} shape ${skuCode ? ` SKU: ${skuCode}` : ''}`.trim();
};


  const handleChange = (e) => {
    const { name, value, files } = e.target;

     if (name === "photo_path" && files?.length > 0) {
    const file = files[0];
    setPhotoPreview(URL.createObjectURL(file));
    setForm((prev) => ({ ...prev, [name]: file }));
    return;
  }

  const updatedForm = { ...form, [name]: value };
  setForm(updatedForm);

  // 🔁 Automatically generate SKU when year, stone, or shape is selected
  if (["year", "stone_id", "shape_id"].includes(name)) {
    autoGenerateSKUIfReady(updatedForm);
  }


    //Description Field logic
    if (["stone_id", "shape_id", "sku_code"].includes(name)) {
  const updatedForm = { ...form, [name]: value };
  const autoDescription = generateBaseDescription(
    name === "stone_id" ? value : updatedForm.stone_id,
    name === "shape_id" ? value : updatedForm.shape_id,
    name === "sku_code" ? value : updatedForm.sku_code
  );

  // Only update if user hasn't modified the description manually
  if (
    form.description === "" ||
    form.description === generateBaseDescription(form.stone_id, form.shape_id, form.sku_code)
  ) {
    updatedForm.description = autoDescription;
  }

  setForm(updatedForm);
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
      // 💡 Fixed canvas size for consistency (resize all images)
      const fixedWidth = 500;
      const aspectRatio = img.height / img.width;
      const fixedHeight = fixedWidth * aspectRatio;

      const canvas = document.createElement("canvas");
      canvas.width = fixedWidth;
      canvas.height = fixedHeight;

      const ctx = canvas.getContext("2d");

      // Draw resized image
      ctx.drawImage(img, 0, 0, fixedWidth, fixedHeight);

      // 📌 Fixed font size and padding
      const fontSize = 16;
      const paddingX = 10;
      const paddingY = 10;
      const lineSpacing = fontSize + 6;

      ctx.font = `${fontSize}px Arial`;
      ctx.textAlign = "right";
      ctx.textBaseline = "bottom";
      ctx.shadowColor = "rgba(0,0,0,0.7)";
      ctx.shadowBlur = 3;

      // Text lines
      const lines = [];
      if (form.sku_code) lines.push(form.sku_code);
      if (form.size) lines.push(`${form.size} mm`);
      if (form.quantity) lines.push(`${parseFloat(form.quantity).toFixed(2)} ${form.units}`);

      const totalHeight = lines.length * lineSpacing;
      const maxTextWidth = Math.max(...lines.map(line => ctx.measureText(line).width));

      // 🧱 Draw background box
      ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
      ctx.fillRect(
        fixedWidth - maxTextWidth - paddingX * 2,
        fixedHeight - totalHeight - paddingY * 2,
        maxTextWidth + paddingX * 2,
        totalHeight + paddingY * 2
      );

      // ✍️ Draw each line of text
      ctx.fillStyle = "white";
      lines.forEach((line, i) => {
        ctx.fillText(
          line,
          fixedWidth - paddingX,
          fixedHeight - totalHeight + i * lineSpacing
        );
      });

      const finalImage = canvas.toDataURL("image/jpeg");
      setOverlayedImage(finalImage);
      setPhotoPreview(finalImage);

      const blob = await fetch(finalImage).then((res) => res.blob());
      const file = new File([blob], `${form.sku_code || "preview"}.jpg`, {
        type: "image/jpeg",
      });
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
      const res = await axios.post(`${Base_URL}/img/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-api-key": `${authApiKey}`
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

  ///Genearte SKU number
const autoGenerateSKUIfReady = async (updatedForm) => {
  const yearEntry = years.find((y) => y.year === parseInt(updatedForm.year));
  const selectedStone = stones.find((s) => s.jit_stone_id === parseInt(updatedForm.stone_id));
  const selectedShape = shapes.find((s) => s.jit_shape_id === parseInt(updatedForm.shape_id));

  if (!yearEntry || !selectedStone || !selectedShape) return; // Wait until all 3 are selected

  const payload = {
    year: updatedForm.year,
    year_code: yearEntry.code,
    stone_id: selectedStone.jit_stone_id,
    stone_code: selectedStone.jit_stone_code,
    shape_id: selectedShape.jit_shape_id,
    shape_code: selectedShape.jit_shape_code,
    quantity: updatedForm.quantity || 0,
    manual_flag: "No",
    addedby: updatedForm.addedby,
  };

  try {
    const res = await axios.post(`${Base_URL}/stone/generateSKU`, payload, {
      headers: { "x-api-key": authApiKey },
    });

    const { sku_code, message } = res.data;
    setForm((prev) => ({
      ...prev,
      sku_code,
      label_description: `${selectedStone.jit_stone_abbr} ${selectedShape.jit_shape_abbr}`.trim(),
    }));
    if (message) setMsg(message);
  } catch (err) {
    console.error("Auto SKU generation failed", err);
    setMsg("Auto SKU generation failed");
  }
};


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imagePath = form.photo_path; // Already set if uploaded earlier
      const finalPayload = {
        "sku_code": form.sku_code,
        "stone_id": form.stone_id,
        "shape_id": form.shape_id,
        "year": form.year,
        "color": form.color,
        "description": form.description,
        "label_description": form.label_description,
        "size": form.size,
        "units": form.units,
        "quantity": form.quantity,
        "location": form.location,
        "cost_code": form.cost_code,
        "sale_code": form.sale_code,
        "photo_path": imagePath,
        "addedby": 1
      }

      // 🔁 Call your Item Inward API (example URL below)
      const res = await axios.post(`${Base_URL}/stone/addItemInward`, finalPayload, {
        headers: {
          "x-api-key": `${authApiKey}`
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
          imagePath: ""
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
        <Link to="/allProduct" className="link-style">
          <i className="bi bi-dot link-icon"></i>
          <span className="link-text"> All Items</span>
        </Link>
        <span style={{ color: "gray" }}>
          <i className="bi bi-dot"></i> Item Inward
        </span>
      </div>

      <p className="ComponentHeading">
        <i className="bi bi-plus-circle" />
        &nbsp; Add Item Inward
      </p>
      <hr />

      <div className="form-container" style={{ padding: "0px" }}>
        <form className="scrollable-form" onSubmit={handleSubmit}>

          <div className="row">
            <div className="col-6 mb-1">
              <label>Year of Purchase  <span className="required-star">*</span></label>
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

            <div className="col-6 mb-1">
              <label>Stone Name <span className="required-star">*</span></label>
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
          </div>           {/*  First row ends here */}


          <div className="row">
            <div className="col-6 mb-1">
              <label>Shape  <span className="required-star">*</span></label>
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

            <div className="col-6 mb-1">
              <label>SKU Code</label>
              <input
                type="text"
                name="sku_code"
                className="form-control"
                value={form.sku_code}
                readOnly
              />
              
            </div>
          </div>           {/*  Second row ends here */}

          <div className="col-md-4 mb-1">
            <label>Description</label>
            <input
              type="text"
              name="description"
              className="form-control"
              value={form.description}
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

          <div className="row">
          <div className="col-6 mb-1">
            <label>Size</label>
            <input
              type="text"
              name="size"
              className="form-control"
              value={form.size}
              onChange={handleChange}
            />
          </div>

          <div className="col-6 mb-1">
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
          </div>           {/*  Second row ends here */}
          
          <div className="row">
          <div className="col-6 mb-1">
            <label>Quantity  <span className="required-star">*</span></label>
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

          <div className="col-6 mb-1">
            <label>Location</label>
            <input
              type="text"
              name="location"
              className="form-control"
              value={form.location}
              onChange={handleChange}
            />
          </div>
           </div>           {/*  Second row ends here */}

          <div className="row">
          <div className="col-6 mb-1">
            <label>Cost Code</label>
            <input
              type="text"
              name="cost_code"
              className="form-control"
              value={form.cost_code}
              onChange={handleChange}
            />
          </div>

          <div className="col-6 mb-1">
            <label>Sale Code</label>
            <input
              type="text"
              name="sale_code"
              className="form-control"
              value={form.sale_code}
              onChange={handleChange}
            />
          </div>
           </div>           {/*  Second row ends here */}

          <div className="col-md-4 mb-1">
            <label>Upload Photo  <span className="required-star">*</span></label>
            <input
              type="file"
              name="photo_path"
              accept="image/*"
              className="form-control"
              required
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
