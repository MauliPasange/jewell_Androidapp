import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AddVoucher() {
    const [formData, setFormData] = useState({
        itemName: '',
        itemShape: '',
        itemColor: '',
        quantity: '',
        purchasePrice: '',
        remark: ''
    });

    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // const payload = {
            //     one: 1,                                        // p_supplier_id
            //     two: formData.itemName,                                      // p_item_name_id
            //     three: formData.itemShape,                                      // p_shape_id
            //     four: formData.quantity,                                      // p_quantity
            //     five: formData.purchasePrice,                                 // p_purchase_price
            //     six: formData.itemColor,                                        // p_color_id
            //     seven: formData.remark || "Test voucher remark",                  // p_remark
            //     eight: 1
            // }
            // const response = await axios.post('/inward/addVoucher', payload);

            // if (response.data === "Success") {
            //     setMsg("Voucher Added Successfully.");
            //     setFormData({
            //         itemName: '',
            //         itemShape: '',
            //         itemColor: '',
            //         quantity: '',
            //         purchasePrice: '',
            //         remark: ''
            //     });
            //     navigate('/all-vouchers');
            // } else {
            //     setMsg("Failed to add voucher. Please try again.");
            // }
        } catch (error) {
            console.error('Error during voucher submission:', error);
            setMsg("Error occurred. Please try again later.");
        }


        setTimeout(() => {
            setMsg('');
        }, 5000);
    };

    const handleBackClick = () => {
        navigate(-1);
    };

    return (
        <div className='add-supplier-container'>
            <div style={{ padding: "0px", marginTop: "-15px" }}>
                <Link to={'/'} className="link-style" ><span className="link-text">Home</span></Link>
                <Link to={'/all-vouchers'} className="link-style"><i className="bi bi-dot link-icon"></i><span className="link-text">All Vouchers</span></Link>
                <span style={{ color: "gray" }}><i className="bi bi-dot"></i>Voucher Master</span>
            </div>

            <p className='ComponentHeading'><i className="bi bi-plus-circle"></i>&nbsp; Add New Voucher</p>
            <hr />
           
            <div className="form-container" style={{ padding: "10px" }}>
                <form className='scrollable-form' onSubmit={handleSubmit}>

                    <div className="row mb-3">
                        <div className="col-12 col-md-4">
                            <label htmlFor="itemName" className='labelText'>
                                Item Name<span className="required-star">*</span>
                            </label>
                            <select
                                id="itemName"
                                name="itemName"
                                className="form-control"
                                value={formData.itemName}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select Item</option>
                                <option value="Pearl">Pearl</option>
                                <option value="Gems">Gems</option>
                                <option value="Diamond">Diamond</option>
                            </select>
                        </div>
                        <div className="col-12 col-md-4">
                            <label className='labelText' htmlFor="itemShape">Item Shape<span className="required-star">*</span></label>
                            <select
                                id="itemShape"
                                name="itemShape"
                                className="form-control"
                                value={formData.itemShape}
                                onChange={handleInputChange}
                            >
                                <option value="">Select Shape</option>
                                <option value="Round">Round</option>
                                <option value="Square">Square</option>
                                <option value="Oval">Oval</option>
                            </select>
                        </div>

                        <div className="col-12 col-md-4">
                            <label className='labelText' htmlFor="itemColor">Item Color<span className="required-star">*</span></label>
                            <select
                                id="itemColor"
                                name="itemColor"
                                className="form-control"
                                value={formData.itemColor}
                                onChange={handleInputChange}
                            >
                                <option value="">Select Color</option>
                                <option value="Red">Red</option>
                                <option value="Blue">Blue</option>
                                <option value="Green">Green</option>
                            </select>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-12 col-md-6">
                            <label className='labelText' htmlFor="quantity">Quantity<span className="required-star">*</span></label>
                            <input
                                type="text"
                                id="quantity"
                                name="quantity"
                                className="form-control"
                                placeholder="Quantity"
                                value={formData.quantity}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="col-12 col-md-6">
                            <label className='labelText' htmlFor="purchasePrice">Purchase Price<span className="required-star">*</span></label>
                            <input
                                type="text"
                                id="purchasePrice"
                                name="purchasePrice"
                                className="form-control"
                                placeholder="Purchase Price"
                                value={formData.purchasePrice}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-12">
                            <label className='labelText' htmlFor="remark">Remark</label>
                            <textarea
                                id="remark"
                                name="remark"
                                className="form-control"
                                placeholder="Remark"
                                value={formData.remark}
                                onChange={handleInputChange}
                            ></textarea>
                        </div>
                    </div>

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
