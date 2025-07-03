import React , { useState } from 'react';
import d from '../assets/img/d.png';
import { apiConfig } from "../config";

export default function ItemDetailsModal({ show, item, onClose }) {
    if (!show || !item) return null;
    const Base_URL = apiConfig.getBaseURL();

const [previewImage, setPreviewImage] = useState(null);

    const imageFields = ['jit_photo_path'];

    // ✅ Custom labels for each key
    const displayFields = {
        jit_stone_name: "Stone Name",
        jit_shape_name: "Shape Name",
        jit_sku_code: "SKU code",
        jit_year: "Year",
        jit_color: "Color",
        jit_description: "Description",
        jit_label_description: "Lable Description",
        jit_size: "Stone Size",
        jit_units: "Stone Unit",
        jit_quantity: "Quantity",        
        jit_location: "Location",
        jit_cost_code: "Cost Code",
        jit_sale_code: "Sale Code",     
        jit_inward_date: "Date",     
    };

    return (
        <div
            className="modal show fade d-block"
            tabIndex="-1"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
            <div className="modal-dialog" style={{
                width: window.innerWidth >= 992 ? '50%' : '100%',
                maxWidth: '100%'
            }}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" style={{ color: "#0986a7", fontSize: "22px", fontWeight: "600" }}>
                            <img src={d} height={30} width={30} alt="icon" />&nbsp;
                            Item Details - {item.jit_stone_name}({item.jit_sku_code})
                        </h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>

                    <div className="modal-body">
                        {/* ✅ First Row: 3 Images */}
                        <div className="row mb-4 text-center">
                            {imageFields.map((imgKey, idx) =>
                                item[imgKey] ? (
                                    <div className="col-md-4" key={idx}>
                                        <img
                                            src={`${Base_URL}${item[imgKey]}`}
                                            alt={`img-${idx}`}
                                            className="img-thumbnail"
                                            style={{ width: '80%', height: '150px', objectFit: 'cover' }}
                                            onClick={() => setPreviewImage(`${Base_URL}${item[imgKey]}`)}
                                        />
                                    </div>
                                ) : null
                            )}
                        </div>

                        {/* ✅ Custom-labeled Key-Value Pair Grid */}
                        <div className="row">
                            {Object.entries(displayFields).map(([key, label], index) => {
                                let value = item[key];

                                // 🔍 Format date-only for 'jai_sdate'
                                if (key === "jit_inward_date" && typeof value === "string") {
                                    value = value.split(' ')[0]; // Extracts "YYYY-MM-DD"
                                }

                                return (
                                    <div className="col-md-6 mb-2" key={index}>
                                        <strong>{label}:</strong> {value}
                                    </div>
                                );
                            })}
                        </div>


                        <div className="text-center mt-3">
                            <button className="custom-btn-primary" onClick={onClose}>Close</button>
                        </div>
                        {previewImage && (
  <div
    className="modal show fade d-block"
    tabIndex="-1"
    style={{ backgroundColor: 'rgba(15, 15, 15, 0.56)' }}
    onClick={() => setPreviewImage(null)} // Close on click
  >
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <img
        src={previewImage}
        alt="Preview"
        style={{
          maxHeight: '95%',
          maxWidth: '95%',
          boxShadow: '0 0 10px white',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
        onClick={(e) => e.stopPropagation()} // Prevent closing on image click
      />
    </div>
  </div>
)}

                    </div>
                </div>
            </div>
        </div>
    );
}
