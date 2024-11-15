import React, { useState } from 'react';
import "./addnew.scss";

const Addnew = () => {
    const [image, setImage] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setImage(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="add-product">
            <h1>Add New Product</h1>
            <div className="form-container">
                <div className="form-image">
                    <label>Upload Image</label>
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    {image && <img src={image} alt="Product Preview" className="image-preview" />}
                </div>
                <div className="product-form">
                    <div className="form-group">
                        <label>Title</label>
                        <input type="text" placeholder="Product Title" />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea type="text" placeholder="Product Description" />
                    </div>
                    <div className="form-group">
                        <label>Price</label>
                        <input type="number" placeholder="Price" />
                    </div>
                    <div className="form-group">
                        <label>Guarantee</label>
                        <input type="text" placeholder="Guarantee Period" />
                    </div>
                    <div className="form-group">
                        <label>Description Count</label>
                        <input type="number" placeholder="1, 2, 3..." />
                    </div>
                    <button className="submit-button">Confirm</button>
                </div>
            </div>
        </div>
    );
};

export default Addnew