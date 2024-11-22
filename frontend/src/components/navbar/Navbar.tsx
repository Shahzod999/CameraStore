import React, { useState, Suspense } from "react";
import "./navbar.scss";
import { IoLocationSharp } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoSearch } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { MdOutlineAddBusiness } from "react-icons/md";
import { GrEdit } from "react-icons/gr";
import { LuLogOut } from "react-icons/lu";
import { Link } from "react-router-dom";
import Cookie from "../cookie/Cookie";
import Category from "../category/Category";
import { useAppDispatch, useAppSelector } from "../../app/hooks/hooks";
import { logOutState, selecteduserInfo } from "../../app/features/useInfoSlice";
import { useLogOutMutation } from "../../app/api/userApiSlice";
import { useDebounce } from "../../app/hooks/debounce";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import Scene from "../../../public/Scene";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const [category, setCategory] = useState(false);
  const [searchParam, setSearchParam] = useState("");
  const userInfo = useAppSelector(selecteduserInfo);
  const [logOut] = useLogOutMutation();

  const handleLogOut = async () => {
    const ask = confirm("You are going to Logout");
    if (ask) {
      await logOut({}).unwrap();
      dispatch(logOutState());
      return;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParam(e.target.value);
  };

  const debounce = useDebounce(searchParam);

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
        <div className="container">
          <div className="navbar__main-box">
            <Link className="navbar__logo" to="/">
              WebCamera
            </Link>
            <div className="navbar__category" onClick={() => setCategory(!category)}>
              <span>
                <GiHamburgerMenu />
              </span>
              <span>Category</span>
            </div>
            <form className="navbar__form" action="">
              <input onChange={handleChange} type="text" placeholder="Search" className="navbar__input" />
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
              {/* <li className="navbar__item">
                <Link to="" className="navbar__link-icon like">
                  <MdFavoriteBorder />
                </Link>
              </li> */}
              <li className="navbar__item">
                {userInfo ? (
                  <span className="navbar__link-icon logOut" onClick={handleLogOut}>
                    <LuLogOut />
                  </span>
                ) : (
                  <Link to="/login" className="navbar__link-icon user">
                    <FaRegUser />
                  </Link>
                )}
              </li>
              {userInfo && (
                <>
                  <li className="navbar__item">
                    <Link to="/admin" className="navbar__link-icon add">
                      <MdOutlineAddBusiness />
                    </Link>
                  </li>
                  <li className="navbar__item">
                    <Link to="/admin/edit" className="navbar__link-icon edit">
                      <GrEdit />
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
        <Canvas>
          <ambientLight intensity={2} />
          <OrbitControls />
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
          <Environment preset="sunset" />
          <ContactShadows position={[0, -4, 0]} opacity={0.5} scale={50} blur={2} far={10} resolution={256} color="#000000" />
        </Canvas>
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
