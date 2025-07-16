import React, { useState } from 'react';
import d from '../assets/img/d.png';
import { apiConfig } from "../config";
import { jsPDF } from "jspdf";

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
       // jit_color: "Color",
       
        jit_label_description: "Lable Description",
        jit_size: "Stone Size",
        jit_units: "Stone Unit",
        jit_quantity: "Quantity",
        jit_location: "Location",
        jit_cost_code: "Cost Code",
        jit_sale_code: "Sale Code",
        jit_inward_date: "Date",
         jit_description: "Description"
    };


const handleDownloadPdf = () => {
  const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });

  const imageUrl = `${Base_URL}${item.jit_photo_path}`;
  const marginX = 10;
  let currentY = 15;
  const pageWidth = 210;
  const imageWidth = 100;
  const imageHeight = 80;
  const lineHeight = 9;

  const drawContent = (imageLoaded) => {
    // Border
    doc.setDrawColor(74, 130, 150);
    doc.setLineWidth(0.3);
    doc.rect(5, 5, 200, 287); // Full A4 with margin

    // Header Text Centered
    const headerText = `Stone Name: ${item.jit_stone_name}  |  SKU Code: ${item.jit_sku_code}`;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(74, 130, 150);
    const textWidth = doc.getTextWidth(headerText);
    const centerX = (pageWidth - textWidth) / 2;
    doc.text(headerText, centerX, currentY);
    currentY += 6;

    // Reset font color
    doc.setTextColor(0, 0, 0);

    // Draw image
    if (imageLoaded) {
      doc.addImage(img, 'JPEG', (pageWidth - imageWidth) / 2, currentY, imageWidth, imageHeight);
      currentY += imageHeight + 10;
    }

    // Text content — one field per line
    doc.setFontSize(12);
    const fields = {
      "Stone Name": item.jit_stone_name,
      "SKU Code": item.jit_sku_code,
      "Date": item.jit_inward_date?.split(" ")[0],
      "Shape Name": item.jit_shape_name,
    //   "Color": item.jit_color,
      "Stone Size": item.jit_size,
      "Stone Unit": item.jit_units,
      "Quantity": item.jit_quantity,
      "Cost Code": item.jit_cost_code,
      "Sale Code": item.jit_sale_code,
      "Description": item.jit_description,
      "Label Description": item.jit_label_description,
      "Location": item.jit_location,
    };

    Object.entries(fields).forEach(([label, value]) => {
      if (value) {
        doc.text(`${label}: ${value}`, marginX, currentY);
        currentY += lineHeight;
      }
    });

    // Optional footer
    doc.setFontSize(10);
    doc.setTextColor(120);
    const now = new Date().toLocaleDateString();
    doc.text(`Generated on: ${now}`, marginX, 287 - 10);

    // Save file
    doc.save(`Item-${item.jit_sku_code}.pdf`);
  };

  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.src = imageUrl;
  img.onload = () => drawContent(true);
  img.onerror = () => {
    console.warn("Image failed to load, continuing without it.");
    drawContent(false);
  };
};

// ------------------------------------------------------------------------



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

                            <button className="custom-btn-primary" onClick={handleDownloadPdf}>
                                Download PDF
                            </button>
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
