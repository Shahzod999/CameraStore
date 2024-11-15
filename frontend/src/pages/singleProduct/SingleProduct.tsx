import "./singleProduct.scss";
import { FaShoppingCart } from "react-icons/fa";
import React, { } from "react";
import { Swiper, SwiperSlide, } from "swiper/react";
import "swiper/css";

const SingleProduct = () => {
  return (
    <div className='product'>
      <div className="container">
        <div className="product__box">
          <Swiper className="mySwiper">
            <SwiperSlide><img src="12.png" alt="" className="product__img" /></SwiperSlide>
            <SwiperSlide><img src="13.png" alt="" className="product__img img" /></SwiperSlide>
          </Swiper>

          <div className="product__about-div">
            <h1 className="product__title">Web-Camera Rapoo C200</h1>
            <p className="product__text">The <span>Rapoo C200</span> webcam features 720p HD resolution, an 80-degree wide-angle lens, and USB connectivity, making it ideal for video calls and streaming. It includes a built-in microphone and facial recognition, ensuring clear and smooth communication.</p>
            <p className="product__price">410 000 so'm</p>
            <a href="" className="product__link">Get Information</a>
            <div className="product__link-box">
              <a href="" className="product__add-link">Add to basket <span className='product__add-icon'><FaShoppingCart /> +</span></a>
              <a href="#" className="product__add-link">Guarantee <span className='product__add-icon icon-left'>3 months</span></a>
            </div>

            <div className="product__description">
              <h2 className="product__sec-title">Description</h2>
              <div className="product__desp-txt">
                <p className="product__txt">Resolution (video) – 1920×1080</p>
                <p className="product__txt">Maximum frame rate - 30 Hz</p>
                <p className="product__txt">Mode support – 1280×720 @ 30 Hz</p>
                <p className="product__txt">Connection - USB 2.0</p>
                <p className="product__txt">Microphone - built-in</p>
                <p className="product__txt">Optical Zoom - 3x</p>
                <p className="product__txt">360° horizontal rotation</p>
                <p className="product__txt">Wide Angle Viewing Angle 100</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleProduct