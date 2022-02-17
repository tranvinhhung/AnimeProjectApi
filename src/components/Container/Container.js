import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./Conatainer.scss";
const Container = () => {
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location);
  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/home");
    }
    document.querySelector(".overlayC").addEventListener("click", function () {
      document.querySelector(".navright").classList.remove("active");
      document.querySelector(".overlayC").classList.remove("active");
    });
  }, []);
  return (
    <>
      <Header />
      <Outlet />
      <div className="overlayC"></div>
      <Footer />
    </>
  );
};

export default Container;
