import { useState } from "react";
import "./addnew.scss";
import { useGetAllCategoryQuery } from "../../app/api/categoryApiSlice";

const Addnew = () => {
  const [choosenCategory, setChoosenCategory] = useState("");
  const [commonError, setCommonError] = useState("");
  const [imagePreview, setImagePreview] = useState<string>("");
  const { data: category, isLoading, isFetching } = useGetAllCategoryQuery();

  const handleImagePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommonError("");
    const file = e.target.files && e.target.files[0];
    if (file) {
      if (file.size > 1 * 1024 * 1024) {
        setImagePreview("");
        setCommonError("Please upload an image that is 1MB or smaller.");
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImagePreview(reader.result as string);
        console.log(reader.result);
      };
      reader.onerror = (error) => {
        console.log("Error: ", error);
      };
    }
  };

  return (
    <div className="add-product">
      <h1>Add New Product</h1>
      <div className="form-container">
        <div className="form-image">
          <label>Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              handleImagePreview(e);
            }}
          />
          {imagePreview && <img src={imagePreview} alt="Product Preview" className="image-preview" />}
        </div>
        <div className="product-form">
          <div className="form-group">
            <label>Title</label>
            <input type="text" placeholder="Product Title" />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea placeholder="Product Description" />
          </div>
          <div className="form-group">
            <label>Price</label>
            <input type="number" placeholder="Price" />
          </div>
          <div className="form-group">
            <label>Category</label>
            <select onChange={(e) => setChoosenCategory(e.target.value)}>
              {(isFetching || isLoading) && (
                <option value="">
                  <>Loading...</>
                </option>
              )}
              {category?.map((item) => (
                <option value={item._id} key={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Brand</label>
            <input type="text" placeholder="Brand" />
          </div>
          <div className="form-group">
            <label>Quantity</label>
            <input type="number" placeholder="1, 2, 3..." />
          </div>
          <div>{commonError}</div>
          <button className="submit-button">Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default Addnew;
