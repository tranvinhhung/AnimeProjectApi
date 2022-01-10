import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
const Container = () => {
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location);
  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/home");
    }
  }, []);
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Container;
