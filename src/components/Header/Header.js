import React, { useEffect, useRef } from "react";
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
import "./header.scss";
function Header() {
  const logoutButton = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleOpen = () => {
    dispatch(activeForm());
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
  }, [dataUser]);
  return (
    <>
      <nav className="nav">
        <figure>
          <img
            src={`https://png.pngtree.com/png-clipart/20200727/original/pngtree-svg-phrase-always-stay-young-black-english-flat-illustration-png-image_5433656.jpg`}
          />
          <Link to="/home" style={{ marginLeft: 2 + "rem" }} className="notext">
            MyAnime
          </Link>
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
                  {`${dataUser?.data?.user?.name}`}
                </div>
                <div
                  className="logoutButton"
                  onClick={handleLogout}
                  ref={logoutButton}
                >
                  Logout
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
      </nav>

      {!activeLogin && <Signup />}
      {activeLogin && <Login />}
    </>
  );
}

export default Header;
