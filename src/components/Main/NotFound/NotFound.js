import React from "react";
import { Link } from "react-router-dom";
import "./notfound.scss";
function NotFound() {
  return (
    <div id="oopss">
      <div id="error-text">
        <img
          src="https://cdn.rawgit.com/ahmedhosna95/upload/1731955f/sad404.svg"
          alt="404"
        />
        <span>404 PAGE</span>
        <p class="p-a">. The page you were looking for could not be found</p>

        <Link to="/home" class="back">
          ... Back to home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
