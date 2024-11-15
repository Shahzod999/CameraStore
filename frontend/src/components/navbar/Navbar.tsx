import React, { useState } from "react";
import "./navbar.scss";
import { IoLocationSharp } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoSearch } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { MdFavoriteBorder } from "react-icons/md";
import { MdOutlineAddBusiness } from "react-icons/md";
import { GrEdit } from "react-icons/gr";
import { Link } from "react-router-dom";
import Category from "../Category/Category";
import Cookie from "../cookie/Cookie";

const Navbar = () => {
  const [category, setCategory] = useState(false);

  return (
    <>
      <div className="navbar">
        <div className="navbar__box-first">
          <div className="container">
            <Link to="/map" className="navbar__link">
              <IoLocationSharp className="navbar__locate" /> Tashkent
            </Link>
            <Link to="/" className="navbar__numb">
              Call center : <span className="navbar__span">+998 77 777 07 00</span>
            </Link>
          </div>
        </div>
        <div className="navbar__main-box">
          <div className="container">
            <Link className="navbar__logo" to="/">
              WebCamera
            </Link>
            <span className="navbar__category" onClick={() => setCategory(!category)}>
              <GiHamburgerMenu /> Category
            </span>
            <form className="navbar__form" action="">
              <input type="text" placeholder="Search" className="navbar__input" />
              <Link to="" className="navbar__form-logo">
                <IoSearch />
              </Link>
            </form>
            <ul className="navbar__list">
              <li className="navbar__item">
                <Link to="/basket" className="navbar__link-icon shop">
                  <FiShoppingCart />
                </Link>
              </li>
              <li className="navbar__item">
                <Link to="" className="navbar__link-icon like">
                  <MdFavoriteBorder />
                </Link>
              </li>
              <li className="navbar__item">
                <Link to="/login" className="navbar__link-icon user">
                  <FaRegUser />
                </Link>
              </li>
              <li className="navbar__item">
                <Link to="/addnew" className="navbar__link-icon add">
                  <MdOutlineAddBusiness />
                </Link>
              </li>
              <li className="navbar__item">
                <Link to="/login" className="navbar__link-icon edit">
                  <GrEdit />
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar__box-sec">
          <div className="container">
            <ul className="navbar__list-sec">
              <li className="navbar__item">
                <Link to="" className="navbar__sec-link">
                  USB Web Cameras
                </Link>
              </li>
              <li className="navbar__item">
                <Link to="" className="navbar__sec-link">
                  Built-in Web Cameras
                </Link>
              </li>
              <li className="navbar__item">
                <Link to="" className="navbar__sec-link">
                  IP Cameras
                </Link>
              </li>
              <li className="navbar__item">
                <Link to="" className="navbar__sec-link">
                  HD Web Cameras
                </Link>
              </li>
              <li className="navbar__item">
                <Link to="" className="navbar__sec-link">
                  4K Web Cameras
                </Link>
              </li>
              <li className="navbar__item">
                <Link to="" className="navbar__sec-link">
                  PTZ Cameras
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Cookie />

      <Category category={category} setCategory={setCategory} />
    </>
  );
};

export default Navbar;
