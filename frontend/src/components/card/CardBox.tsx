import { useState } from "react";
import { BiTrash } from "react-icons/bi";
import { FaPencilAlt } from "react-icons/fa";
import "./card.scss";
import { FcMoneyTransfer } from "react-icons/fc";
import { Link, useLocation } from "react-router-dom";
import { VscClearAll } from "react-icons/vsc";
import { IoMdImages } from "react-icons/io";
import { useDeleteProductsMutation, useUpdateProductMutation } from "../../app/api/productsApiSlice";
import { useGetAllCategoryQuery } from "../../app/api/categoryApiSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks/hooks";
import { addProductsToBasket, deleteFromBasket } from "../../app/features/basketSlice";
import Button from "./Button";
import { Product } from "../../app/types/ProductTypes";
import { selecteduserInfo } from "../../app/features/useInfoSlice";

interface CardBoxProps {
  item: Product;
}

const CardBox = ({ item }: CardBoxProps) => {
  const userInfo = useAppSelector(selecteduserInfo);
  const { pathname } = useLocation();
  const isBasketPage = pathname === "/basket";
  const dispatch = useAppDispatch();
  const [originalProduct, setOriginalProduct] = useState(item);
  const [product, setProduct] = useState(item);
  const { _id, name, description, brand, price, image, category, quantity } = product;

  const { data: categoryState } = useGetAllCategoryQuery();
  const [deleteProducts, { isLoading: deleteLoading }] = useDeleteProductsMutation();
  const [updateProduct, { isLoading: updateLoading }] = useUpdateProductMutation();
  const [newImage, setNewImage] = useState(image);
  const [commonError, setCommonError] = useState("");
  const [edit, setEdit] = useState(false);
  const [choosenCategory, setChoosenCategory] = useState(item.category?._id || "");

  const handleDelete = async () => {
    const check = confirm("Are you sure for delete this product?");
    if (!check) return;
    try {
      await deleteProducts(item._id).unwrap();
      alert("Product deleted");
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = () => {
    setEdit(!edit);
  };

  const getChangedFields = (original: Product, updated: Product) => {
    const changes: Partial<typeof item> = {};

    Object.keys(updated).forEach((key) => {
      if ((original as any)[key] !== (updated as any)[key]) {
        (changes as any)[key] = (updated as any)[key];
      }
    });

    if (original.category?._id !== choosenCategory) {
      changes.category = { _id: choosenCategory, name: "" } as Product["category"];
    }

    if (newImage !== original.image) {
      changes.image = newImage;
    }
    return changes;
  };

  const handleSave = async () => {
    try {
      const changedFields = getChangedFields(originalProduct, product);

      if (Object.keys(changedFields).length === 0) {
        alert("No changes to save.");
        return;
      }

      const payload = { id: _id, data: changedFields };
      console.log(payload);

      let res = await updateProduct(payload).unwrap();
      console.log(res);

      setOriginalProduct(product);
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

  const handleEditChange = (e: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: name === "price" || name === "quantity" ? Number(value) : value,
    }));
  };

  const handleEditClear = () => {
    setProduct(item);
    setChoosenCategory(item.category._id || "");
    setEdit(false);
    console.log(item);
    console.log(choosenCategory);
  };

  const handleAddToBasket = () => {
    dispatch(addProductsToBasket(item._id));
  };
  const handleDeleteFromBasket = () => {
    dispatch(deleteFromBasket(item._id));
    console.log("basleerwerF");
  };


  console.log(item);

  return (
    <div className="cardBox">
      <div className={`cardBox__div ${updateLoading || deleteLoading ? "loading" : ""}`}>
        <div className="changeImageHolder">
          {userInfo && (
            <div className="actionButtons">
              {edit ? <VscClearAll className="actionClear" onClick={handleEditClear} size={25} /> : <FaPencilAlt className="actionTrash" onClick={handleEdit} size={25} />}
              <BiTrash onClick={handleDelete} size={28} />
            </div>
          )}

          {edit && (
            <>
              <label htmlFor="image">
                <IoMdImages size={55} />
              </label>
              <input
                id="image"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => {
                  handleImagePreview(e);
                }}
              />
            </>
          )}
          <Link className="cardbox__Link" to={`/${item._id}`}>
            <img src={newImage} alt={name} className="cardBox__img" />
          </Link>
        </div>

        <input type="text" name="name" value={name} className="cardBox__title" readOnly={!edit} onChange={handleEditChange} />

        <textarea rows={1} name="description" value={description} className="cardbox__text" readOnly={!edit} onChange={handleEditChange} />

        <input type="text" name="brand" value={brand} className="cardbox__txt" readOnly={!edit} onChange={handleEditChange} />

        {edit ? (
          <select onChange={(e) => setChoosenCategory(e.target.value)} className="cardbox__select" value={choosenCategory}>
            {categoryState?.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
        ) : (
          <span className="cardbox__txt">{item.category.name}</span>
        )}

        <input type="number" name="quantity" value={quantity} className="cardbox__input" readOnly={!edit} onChange={handleEditChange} />

        <div className="cardbox_line"></div>

        <div className="cardbox__price-div">
          <input type="number" name="price" step={1000} value={price} className="cardbox__price" readOnly={!edit} onChange={handleEditChange} />
          <FcMoneyTransfer size={30} />
        </div>

        <Button edit={edit} isBasketPage={isBasketPage} handleSave={handleSave} handleDeleteFromBasket={handleDeleteFromBasket} handleAddToBasket={handleAddToBasket} />

        {commonError && <span className="errorText">{commonError}</span>}
      </div>
    </div>
  );
};

export default CardBox;
