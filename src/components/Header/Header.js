import React from "react";
import { Link } from "react-router-dom";
import "./index.scss";
function Header() {
  return (
    <nav className="nav">
      <figure>
        <img
          src={`https://png.pngtree.com/png-clipart/20200727/original/pngtree-svg-phrase-always-stay-young-black-english-flat-illustration-png-image_5433656.jpg`}
        />
        <Link to="/" style={{ marginLeft: 2 + "rem" }} className="notext">
          MyAnime
        </Link>
      </figure>
      <ul>
        <li>
          <Link className="notext" to="/home">
            Home
          </Link>
        </li>
        <li>
          <Link className="notext" to="/about">
            About
          </Link>
        </li>
        <li>
          <Link className="notext" to="/login">
            Login
          </Link>
        </li>
        <li>
          <Link className="notext" to="">
            Các anime đã xem
          </Link>
        </li>
        <li>
          <Link className="notext" to="/context">
            hello Context
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
