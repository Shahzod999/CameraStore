import { useGetBasketQuery } from "../../app/api/productsApiSlice";
import { deleteFromBasket, selectedBasket } from "../../app/features/basketSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks/hooks";
import CardBox from "../../components/card/CardBox";
import Loading from "../../components/loading/Loading";
import "./basket.scss";

const Basket = () => {
  const basket = useAppSelector(selectedBasket);
  const { data, isLoading, isFetching, error } = useGetBasketQuery({ ids: basket }, { skip: basket.length === 0 });

  if (error) return <p>Произошла ошибка при загрузке данных"</p>;
  if (isLoading) return <Loading />;
  if (basket.length === 0) return <p>Basket is Empty</p>;
  return (
    <div className="card__box">
      <div className="container">
        {isFetching && <Loading />}
        <div className="basketCard" >
          <div className="card__box">
            {data?.map((item) => (
              <CardBox item={item} key={item._id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Basket;
