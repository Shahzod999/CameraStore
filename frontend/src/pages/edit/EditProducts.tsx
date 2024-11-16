import { useAddNewCategoryMutation, useDeleteCategoryMutation, useGetAllCategoryQuery } from "../../app/api/categoryApiSlice";
import { BiTrash } from "react-icons/bi";
import { useState } from "react";
import "./editProducts.scss";

const EditProducts = () => {
  const [category, setCategory] = useState("");
  const { data, isLoading, isFetching } = useGetAllCategoryQuery();
  const [addNewCategory] = useAddNewCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  console.log(category);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addNewCategory({ name: category }).unwrap();
      setCategory("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      const res = await deleteCategory(id).unwrap();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="edit__box">
      <div className="container">
        {isLoading ? (
          <>Loding...222</>
        ) : (
          <>
            {data?.map((item) => (
              <button className="edit__button" key={item._id}>
                <span>{item.name}</span>
                <span onClick={() => handleDeleteCategory(item._id)}>
                  <BiTrash />
                </span>
              </button>
            ))}
            {isFetching && <>Loding...</>}
          </>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Add New Category</label>
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
        <button type="submit">Sumbit</button>
      </form>
    </div>
  );
};

export default EditProducts;
