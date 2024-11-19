import { useGetBasketQuery } from "../../app/api/productsApiSlice";
import { deleteFromBasket, selectedBasket } from "../../app/features/basketSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks/hooks";
import CardBox from "../../components/card/CardBox";
import Loading from "../../components/loading/Loading";
import "./basket.scss"

const Basket = () => {
  const dispatch = useAppDispatch();
  const basket = useAppSelector(selectedBasket);
  const { data, isLoading, isFetching, error, refetch } = useGetBasketQuery({ ids: basket }, { skip: basket.length === 0 });

  const handleDeleteFrombasket = (id: string) => {
    dispatch(deleteFromBasket(id));
    if (basket.length === 1) {
      refetch();
    }
  };

  if (error) return <p>Произошла ошибка при загрузке данных"</p>;
  if (isLoading) return <Loading/>;
  if (basket.length === 0) return <p>Basket is Empty</p>;
  return (
    <div className="card__box">
      <div className="container">
        {isFetching && <Loading/>}
        {data?.map((item) => (
          <div className="basketCard" key={item._id}>
            <CardBox item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Basket;
