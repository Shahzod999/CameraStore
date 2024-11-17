import { useState } from "react";
import { BiTrash } from "react-icons/bi";
import { FaPencilAlt } from "react-icons/fa";
import "./card.scss";
import { MdFavoriteBorder } from "react-icons/md";
import { MdShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import { VscClearAll } from "react-icons/vsc";
import { useDeleteProductsMutation, useUpdateProductMutation } from "../../app/api/productsApiSlice";
import { useGetAllCategoryQuery } from "../../app/api/categoryApiSlice";

const CardBox = ({ item }) => {
  const [product, setProduct] = useState(item);
  const { _id, name, description, brand, price, image, category, quantity } = product;
  const { data: categoryState } = useGetAllCategoryQuery();
  const [deleteProducts, { isLoading: deleteLoading }] = useDeleteProductsMutation();
  const [updateProduct, { isLoading: updateLoading }] = useUpdateProductMutation();
  const [newImage, setNewImage] = useState(image);
  const [commonError, setCommonError] = useState("");
  const [edit, setEdit] = useState(false);
  const [choosenCategory, setChoosenCategory] = useState(category || "");

  const handleDelete = async () => {
    const check = confirm("Rostan Uchiremi?");
    if (!check) return;
    try {
      await deleteProducts(item._id).unwrap();
      alert("Kara lekin uchirvordim");
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = () => {
    setEdit(!edit);
  };


  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("description", product.description);
      formData.append("brand", product.brand);
      formData.append("price", product.price);
      formData.append("quantity", product.quantity);
      formData.append("category", choosenCategory);
      formData.append("image", newImage);

      let res = await updateProduct({ _id, data: formData }).unwrap();
      console.log(res);

      setEdit(false);
      alert("Product updated successfully!");
    } catch (error) {
      setCommonError("Failed to update product.");
      console.error(error);
    }
  };

  const handleImagePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommonError("");
    const file = e.target.files && e.target.files[0];
    if (file) {
      if (file.size > 1 * 1024 * 1024) {
        setNewImage("");
        setCommonError("Please upload an image that is 1MB or smaller.");
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setNewImage(reader.result as string);
        console.log(reader.result);
      };
      reader.onerror = (error) => {
        console.log("Error: ", error);
      };
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: name === "price" || name === "quantity" ? Number(value) : value,
    }));
  };

  const handleEditClear = () => {
    setProduct(item);
    setChoosenCategory(category || "");
    setEdit(false);
  };

  return (
    <div className="cardBox">
      <div className={`cardBox__div ${updateLoading || deleteLoading ? "loading" : ""}`}>
        <div>
          {edit ? <VscClearAll onClick={handleEditClear} size={25} /> : <FaPencilAlt onClick={handleEdit} size={25} />}
          <BiTrash onClick={handleDelete} size={25} />
        </div>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            handleImagePreview(e);
          }}
        />
        <Link className="cardbox__Link" to="/1">
          <img src={newImage} alt={name} className="cardBox__img" />
        </Link>

        <input type="text" name="name" value={name} className="cardBox__title" readOnly={!edit} onChange={handleEditChange} />

        <textarea rows={5} name="description" value={description} className="cardbox__text" readOnly={!edit} onChange={handleEditChange} />

        <input type="text" name="brand" value={brand} className="cardbox__txt" readOnly={!edit} onChange={handleEditChange} />

        {edit ? (
          <select value={choosenCategory} onChange={(e) => setChoosenCategory(e.target.value)} className="cardbox__select">
            {categoryState?.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        ) : (
          <span className="cardbox__txt">{choosenCategory.name}</span>
        )}

        <input type="number" name="quantity" value={quantity} className="cardbox__input" readOnly={!edit} onChange={handleEditChange} />

        <div className="cardbox_line"></div>

        <div className="cardbox__price-div">
          <input type="number" name="price" step={1000} value={price} className="cardbox__price" readOnly={!edit} onChange={handleEditChange} />

          <a href="" className="cardbox__fv">
            <MdFavoriteBorder />
          </a>
        </div>
        <button className="cardbox__link" onClick={edit ? handleSave : undefined}>
          {edit ? "Save" : "Add to Basket"}

          <span className="cardbox__span">
            <MdShoppingCart />
          </span>
        </button>
        <span className="errorText">{commonError}</span>
      </div>
    </div>
  );
};

export default CardBox;
