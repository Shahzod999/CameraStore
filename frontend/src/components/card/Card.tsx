import { useState, useMemo } from "react";
import CardBox from "./CardBox";
import Header from "../header/Header";
import Brand from "../brand/Brand";
import { useFetchAllProductsQuery, useSearchProductsQuery } from "../../app/api/productsApiSlice";
import { useAppSelector } from "../../app/hooks/hooks";
import { selectedSearchParams } from "../../app/features/searchSlice";
import Loading from "../loading/Loading";
import { Product } from "../../app/types/ProductTypes";

const card = () => {
  const { data: product = [], isLoading } = useFetchAllProductsQuery({});
  const searchParams = useAppSelector(selectedSearchParams);
  const { data: searchdata, isFetching } = useSearchProductsQuery(searchParams, {
    skip: searchParams.length < 2,
  });

  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  const uniqueBrands = useMemo(() => {
    return [...new Set(product.map((product: Product) => product.brand).filter(Boolean))];
  }, [product]);

  const filteredProducts = useMemo(() => {
    if (!selectedBrand) return product;
    return product.filter((product: Product) => product.brand === selectedBrand);
  }, [selectedBrand, product]);

  const handleBrandClick = (brand: string) => {
    setSelectedBrand(brand === selectedBrand ? null : brand);
  };

  return (
    <>
      <Header />
      {isLoading && <Loading />}
      <div className="navbar__box-sec">
        <div className="container">
          <ul className="navbar__list-sec">
            {uniqueBrands.map((brand, index) => (
              <li className="navbar__item" key={index}>
                <span className="navbar__sec-link" onClick={() => handleBrandClick(brand as string)}>
                  {brand}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="card">
        <div className="container">
          <div className="card__box">{isFetching ? <Loading /> : searchdata?.map((item: Product) => <CardBox item={item} key={item._id} />)}</div>
          <div className="card__box">
            {filteredProducts?.map((item: Product) => (
              <CardBox item={item} key={item._id} />
            ))}
          </div>
        </div>
      </div>
      <Brand />
    </>
  );
};

export default card;
