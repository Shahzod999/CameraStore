import React from 'react';
import './card.scss';
import { MdFavoriteBorder } from "react-icons/md";
import { MdShoppingCart } from "react-icons/md";
import { Link } from 'react-router-dom';

const CardBox = ({ item }) => {
  const { title, description, brand, price, image } = item
  return (
    <div className="cardBox">
      <div className="cardBox__div">
        <Link className='cardbox__Link' to="/1">
          <img src={image} alt={title} className="cardBox__img" />
        </Link>
        <h2 className="cardBox__title">{title}</h2>
        <p className="cardbox__text">{description}</p>
        <p className="cardbox__txt">Brand Name: <span>{brand}</span></p>
        <div className="cardbox_line"></div>
        <div className="cardbox__price-div">
          <p className="cardbox__price">{price}</p>
          <a href="" className="cardbox__fv"><MdFavoriteBorder /></a>
        </div>
        <button className="cardbox__link">Add to Basket <span className='cardbox__span'><MdShoppingCart /></span></button>
      </div>
    </div>
  );
};

export default CardBox;

