import { useGetAllCategoryQuery } from "../../app/api/categoryApiSlice";
import { addCategory, deleteCategory } from "../../app/features/categorySlice";
import { useAppDispatch } from "../../app/hooks/hooks";
import Loading from "../loading/Loading";
import "./category.scss";

interface CategoryProps {
  category: boolean;
  setCategory: () => void;
}

const Category = ({ category, setCategory }: CategoryProps) => {
  const dispatch = useAppDispatch();
  const { data, isLoading, isFetching } = useGetAllCategoryQuery();

  const handleCheck = (value, id) => {
    if (value) {
      dispatch(addCategory(id));
    } else {
      dispatch(deleteCategory(id));
    }
  };

  return (
    <div className="categoryHolder" style={{ pointerEvents: category ? "" : "none" }}>
      <div className={`${category ? "activeCategory" : ""} category`}>
        <div className="category__box">
          {isLoading || isFetching ? (
            <Loading />
          ) : (
            data?.map((item) => (
              <div className="category__brand-div" key={item._id}>
                <input type="checkbox" name="category" id="category-checkbox" onChange={(e) => handleCheck(e.target.checked, item._id)} />
                <label className="category__title">{item.name}</label>
                <ul className="category__list">
                  <li className="category__item">1. Logitech C920</li>
                  <li className="category__item">2. Logitech C922 Pro</li>
                </ul>
              </div>
            ))
          )}
        </div>
      </div>

      <div className={`${category ? "nonActiveCategoryFalse" : ""} nonActiveCategory`} onClick={() => setCategory(false)}></div>
    </div>
  );
};

export default Category;
