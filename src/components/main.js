import React from "react";
import { Route, Routes } from "react-router-dom";
import AnimePlay from "./AnimePlay/AnimePlay";
import AppContext from "./Context/AppContext";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import About from "./Main/About/About";
import Home from "./Main/Home/Home";
import NotFound from "./Main/NotFound/NotFound";
function Index() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="Home" element={<Home />} />
        <Route path="About" element={<About />}>
          <Route path=":id" element={<About />} />
        </Route>
        <Route path="anime" element={<AnimePlay />}>
          <Route path=":id" element={<AnimePlay />} />
          <Route path=":gender" element={<AnimePlay />} />
        </Route>
        <Route path="context" element={<AppContext />}></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default Index;
