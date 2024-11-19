import { useGetBasketQuery } from "../../app/api/productsApiSlice";
import { deleteFromBasket, selectedBasket } from "../../app/features/basketSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks/hooks";
import CardBox from "../../components/card/CardBox";

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
  if (isLoading) return <>Loading...</>;
  if (basket.length === 0) return <p>Корзина пуста</p>;
  return (
    <div className="card__box">
      {isFetching && <>Loading...</>}
      {data?.map((item) => (
        <div className="basketCard" key={item._id}>
          <CardBox item={item} />
          <button onClick={() => handleDeleteFrombasket(item._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Basket;
