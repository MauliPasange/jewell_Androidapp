import React from 'react';
import d from '../assets/img/d.png';
import { apiConfig } from "../../src/config";

export default function ItemDetailsModal({ show, item, onClose }) {
    if (!show || !item) return null;
    const Base_URL = apiConfig.getBaseURL();


    const imageFields = ['jai_image1', 'jai_image2', 'jai_image3'];

    // ✅ Custom labels for each key
    const displayFields = {
        jai_sub_item_name: "Sub Item Name",
        jew_voucher: "Voucher Number",
        jai_sdate: "Date",
        jew_sup_supplier_name: "Supplier Name",
        jai_quantity: "Quantity",
        jai_status: "Status",
        jit_name: "Item Name",
        jit_shape: "Item Shape",
        jit_color: "Item Color",
        jai_unit: "Item Unit",
        jai_remark: "Remark",
        jai_quantity: "Quantity",
        jai_purchase_price: "Purchase Price",
        jai_purchase_code: "Purchase Code",
        jai_sale_price: "Sale Price",
        jai_sale_code: "Sale Code",
        jai_height: "Height",
        jai_breadth: "Breadth",
        jai_length: "Length"
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
                            Item Details - {item.jai_sub_item_name}
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
                                            style={{ width: '200px', height: '150px', objectFit: 'cover' }}
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
                                if (key === "jai_sdate" && typeof value === "string") {
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
                    </div>
                </div>
            </div>
        </div>
    );
}
