import React, { useState } from "react";
import {
  NavLink,
  useLocation,
  useMatch,
  useNavigate,
  useParams,
  useRoutes,
} from "react-router-dom";
import "./About.scss";
import AnimePlay from "../../AnimeComponents/AnimePlay/AnimePlay";
function About() {
  const params = useParams();
  const location = useLocation();

  const navigate = useNavigate();
  console.log(params);
  console.log(location);
  const handleChangeUrl = () => {
    navigate("/home");
  };
  return (
    <main className="mainContainer">
      <div>Trang web anime do Tôi lập trình vào ngày 17/12/2021</div>
      <div>Chúc các bạn xem anime một cách vui vẻ</div>
      <div onClick={handleChangeUrl}>Quay về home nào</div>
    </main>
  );
}

export default About;
