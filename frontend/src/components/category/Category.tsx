import { useGetAllCategoryQuery } from "../../app/api/categoryApiSlice";
import Loading from "../loading/Loading";
import "./category.scss";

const Category = ({ category, setCategory }) => {
  const { data, isLoading, isFetching } = useGetAllCategoryQuery();

  return (
    <div className="categoryHolder" style={{ pointerEvents: category ? "" : "none" }}>
      <div className={`${category ? "activeCategory" : ""} category`}>
        <div className="category__box">
          {isLoading || isFetching ? (
            <Loading/>
          ) : (
            data?.map((item) => (
              <div className="category__brand-div" key={item._id}>
                <h1 className="category__title">{item.name}</h1>
                <ul className="category__list">
                  <li className="category__item">
                    <a href="" className="category__link">
                      1. Logitech C920
                    </a>
                  </li>
                  <li className="category__item">
                    <a href="" className="category__link">
                      2. Logitech C922 Pro
                    </a>
                  </li>
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
