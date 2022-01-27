import React, { useEffect, useRef, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { activeForm } from "../../reduces/formDataUser";
import PopoverEle from "./../Popover/PopoverContainer/PopoverContainer";
import { useDispatch, useSelector } from "react-redux";
import Signup from "./../User/Signup/Signup";
import Login from "./../User/Login/Login";
import { logout } from "./../../reduces/animeLogin";
import SearchIcon from "@mui/icons-material/Search";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import "./header.scss";
function Header() {
  const logoutButton = useRef();
  const menuButtonRef = useRef();
  const navright = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const refR = useRef();
  const [openMenu, setOpenMenu] = useState(false);
  const handleOpen = () => {
    dispatch(activeForm());
  };
  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };
  const activeLogin = useSelector((state) => state.myForm.activeLogin);
  const dataUser = useSelector((state) => state.myLogin.data);
  // console.log(Object.keys(dataUser).length);
  const handleLogout = () => {
    dispatch(logout());
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let formS = document.getElementById("formSearch");
    let date = Date.now();
    let dateIo = new Date(date);
    console.log(formS.searchAnime.value, new Date(Date.now()));
    console.log(formS.searchAnime.value, date);
    console.log(formS.searchAnime.value, dateIo);

    console.log(formS.searchAnime.value, new Date(date).getTime());
  };
  const handleSearchView = () => {
    navigate("/search");
  };

  const divRef = React.useRef();

  useEffect(() => {
    if (logoutButton && logoutButton.current) {
      divRef.current.addEventListener("mouseover", function () {
        logoutButton.current.classList.add("mouseover");
      });
      logoutButton.current.addEventListener("mouseover", function () {
        logoutButton.current.classList.add("mouseover");
      });
      logoutButton.current.addEventListener("mouseout", function () {
        logoutButton.current.classList.remove("mouseover");
      });
      divRef.current.addEventListener("mouseout", function () {
        logoutButton.current.classList.remove("mouseover");
      });
    }
    if (menuButtonRef && menuButtonRef.current) {
      openMenu &&
        menuButtonRef.current.addEventListener("click", function () {
          navright.current.classList.remove("active");
        });
      !openMenu &&
        menuButtonRef.current.addEventListener("click", function () {
          navright.current.classList.add("active");
        });
      refR.current.addEventListener("click", function () {
        navright.current.classList.remove("active");
        setOpenMenu(false);
      });
    }
  }, [dataUser, openMenu]);
  return (
    <>
      <nav className="nav">
        <figure>
          <img
            src={`https://png.pngtree.com/png-clipart/20200727/original/pngtree-svg-phrase-always-stay-young-black-english-flat-illustration-png-image_5433656.jpg`}
          />
          <Link
            ref={refR}
            to="/home"
            style={{ marginLeft: 2 + "rem" }}
            className="notext"
          >
            MyAnime
          </Link>
        </figure>
        <ul className="navright" ref={navright}>
          <li>
            <form id="formSearch" onSubmit={handleSubmit}>
              <input
                type="search"
                name="searchAnime"
                id="searchID"
                placeholder="tìm anime nào!!"
              />
              <SearchIcon onClick={handleSearchView} />
              <button type="submit">button</button>
            </form>
          </li>
          <li>
            <Link ref={refR} className="notext" to="/home">
              Home
            </Link>
          </li>

          <li>
            <PopoverEle className="popover" />{" "}
          </li>

          <li>
            <Link className="notext" to="/my-list-love-animes">
              List L.animes
            </Link>
          </li>

          <li>
            <Link className="notext" to="/about">
              About
            </Link>
          </li>
          <li>
            {Object.keys(dataUser).length === 0 && (
              <div className="notext" onClick={handleOpen}>
                Sign Up/Login
              </div>
            )}
            {Object.keys(dataUser).length > 0 && (
              <>
                <div className="user" ref={divRef}>
                  <span>Xin chào</span>
                  <span>{`${dataUser?.data?.user?.name}`}</span>
                  <div
                    className="logoutButton"
                    onClick={handleLogout}
                    ref={logoutButton}
                  >
                    Logout
                  </div>
                </div>
                {/* <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                >
                  <Typography onClick={handleLogout} sx={{ p: 2 }}>
                    Logout
                  </Typography>
                </Popover> */}
              </>
            )}
          </li>

          {/* <li>
          <Link className="notext" to="/context">
            hello Context
          </Link>
        </li> */}
        </ul>
        <figure className="menuIcon">
          {!openMenu && (
            <MenuIcon onClick={handleOpenMenu} ref={menuButtonRef} />
          )}
          {openMenu && (
            <MenuOpenIcon onClick={handleOpenMenu} ref={menuButtonRef} />
          )}
        </figure>
      </nav>

      {!activeLogin && <Signup />}
      {activeLogin && <Login />}
    </>
  );
}

export default Header;
