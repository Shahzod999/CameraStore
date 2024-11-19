import { useState } from "react";
import "./addnew.scss";
import { useGetAllCategoryQuery } from "../../app/api/categoryApiSlice";
import { useForm } from "react-hook-form";
import { useAddNewProductMutation } from "../../app/api/productsApiSlice";
import Loading from "../../components/loading/Loading";

const Addnew = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [choosenCategory, setChoosenCategory] = useState("");
  const [commonError, setCommonError] = useState("");
  const [imagePreview, setImagePreview] = useState<string>("");
  const { data: category, isLoading, isFetching } = useGetAllCategoryQuery();
  const [addNewProduct, { data, isLoading: addDataLoading }] = useAddNewProductMutation();

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

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("category", choosenCategory);
    formData.append("quantity", data.quantity);
    formData.append("brand", data.brand);
    formData.append("image", imagePreview);

    if (!imagePreview) {
      return setCommonError("ImageRequired");
    }
    let res = await addNewProduct(formData).unwrap();
    console.log(res);
  };

  return (
    <div className="add-product">
      <h1>Add New Product</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="form-container">
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
            <input type="text" placeholder="Product Title" {...register("name", { required: "Name Required" })} />
            <span className="errorText">{errors.name?.message}</span>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea placeholder="Product Description" {...register("description", { required: "Description Required" })} />
          </div>
          <span className="errorText">{errors.description?.message}</span>
          <div className="form-group">
            <label>Price</label>
            <input type="number" placeholder="Price" {...register("price", { required: "Price Required" })} />
            <span className="errorText">{errors.price?.message}</span>
          </div>
          <div className="form-group">
            <label>Category</label>
            <select onChange={(e) => setChoosenCategory(e.target.value)}>
              {(isFetching || isLoading) && (
                <option value="">
                  <Loading/>
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
            <input type="text" placeholder="Brand" {...register("brand", { required: "Brand Required" })} />
            <span className="errorText">{errors.brand?.message}</span>
          </div>
          <div className="form-group">
            <label>Quantity</label>
            <input type="number" placeholder="1, 2, 3..." {...register("quantity", { required: "Quantity Required" })} />
            <span className="errorText">{errors.quantity?.message}</span>
          </div>
          <span className="errorText">{commonError}</span>
          <button className="submit-button" disabled={addDataLoading}>
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
};

export default Addnew;
