import "./singleProduct.scss";
import { FaShoppingCart } from "react-icons/fa";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useGetSingleProductQuery } from "../../app/api/productsApiSlice";
import { useParams } from "react-router-dom";
import Loading from "../../components/loading/Loading";

const SingleProduct = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleProductQuery(id);

  console.log(data);
  // data.price
  // data.quantity
  // data.rating
  // data.updatedAt
  // data.image
  // data.category
  if (isLoading) return <Loading/>;
  return (
    <div className="product">
      <div className="container">
        <div className="product__box">
          <Swiper className="mySwiper">
            <SwiperSlide>
              <img src={data.image} alt="" className="product__img" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="13.png" alt="" className="product__img img" />
            </SwiperSlide>
          </Swiper>

          <div className="product__about-div">
            <h1 className="product__title">{data.name}</h1>
            <p className="product__text">{data.description}</p>
            <p className="product__price">{data.price} сум</p>
            <p className="product__text">{data?.category?.name} Категория</p>
            <span className="product__link">Get Information</span>
            <div className="product__link-box">
              <span className="product__add-link">
                Add to basket{" "}
                <span className="product__add-icon">
                  <FaShoppingCart /> +
                </span>
              </span>
              <span className="product__add-link">{data.updatedAt}</span>
            </div>

            <div className="product__description">
              <h2 className="product__sec-title">Description</h2>
              <div className="product__desp-txt">
                {data.description}
                {/* <p className="product__txt">Resolution (video) – 1920×1080</p>
                <p className="product__txt">Maximum frame rate - 30 Hz</p>
                <p className="product__txt">Mode support – 1280×720 @ 30 Hz</p>
                <p className="product__txt">Connection - USB 2.0</p>
                <p className="product__txt">Microphone - built-in</p>
                <p className="product__txt">Optical Zoom - 3x</p>
                <p className="product__txt">360° horizontal rotation</p>
                <p className="product__txt">Wide Angle Viewing Angle 100</p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
