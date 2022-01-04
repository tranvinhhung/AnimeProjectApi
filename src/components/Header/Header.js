import React from "react";
import { Link } from "react-router-dom";
import { activeForm } from "../../reduces/formDataUser";
import PopoverEle from "./../Popover/PopoverContainer/PopoverContainer";
import { useDispatch, useSelector } from "react-redux";
import Signup from "./../User/Signup/Signup";
import Login from "./../User/Login/Login";
import { logout } from "./../../reduces/animeLogin";
import "./header.scss";
function Header() {
  const dispatch = useDispatch();
  const handleOpen = () => {
    dispatch(activeForm());
  };
  const activeLogin = useSelector((state) => state.myForm.activeLogin);
  const dataUser = useSelector((state) => state.myLogin.data);
  console.log(Object.keys(dataUser).length);
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <>
      <nav className="nav">
        <figure>
          <img
            src={`https://png.pngtree.com/png-clipart/20200727/original/pngtree-svg-phrase-always-stay-young-black-english-flat-illustration-png-image_5433656.jpg`}
          />
          <Link to="/" style={{ marginLeft: 2 + "rem" }} className="notext">
            MyAnime
          </Link>
        </figure>
        <ul className="navright">
          <li>
            <Link className="notext" to="/home">
              Home
            </Link>
          </li>

          <li>
            <PopoverEle className="popover" />{" "}
          </li>

          <li>
            <Link className="notext" to="/">
              animes saw
            </Link>
          </li>

          <li>
            <Link className="notext" to="/about">
              About
            </Link>
          </li>
          <li>
            {Object.keys(dataUser).length === 0 && (
              <Link className="notext" to="/signup" onClick={handleOpen}>
                Sign Up/Login
              </Link>
            )}
            {Object.keys(dataUser).length > 0 && (
              <div className="user" onClick={handleLogout}>
                <span>Xin chào</span>
                {`${dataUser?.data?.user?.name}`}
              </div>
            )}
          </li>

          {/* <li>
          <Link className="notext" to="/context">
            hello Context
          </Link>
        </li> */}
        </ul>
      </nav>

      {!activeLogin && <Signup />}
      {activeLogin && <Login />}
    </>
  );
}

export default Header;
