import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import AnimeGender from "./AnimeComponents/AnimeGenderList/AnimeGender";
import AnimePlay from "./AnimeComponents/AnimePlay/AnimePlay";
import AppContext from "./Context/AppContext";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import About from "./Main/About/About";
import Home from "./Main/Home/Home";
import NotFound from "./Main/NotFound/NotFound";
import AnimeLink from "./AnimeComponents/AnimeSoureLink/AnimeLink";
import AnimeToDayWatch from "./AnimeComponents/AnimeTodayWatch/AnimeToDayWatch";
import Signup from "./../components/User/Signup/Signup";
import Login from "./../components/User/Login/Login";
import Container from "./Container/Container";
import ListLoveAnimes from "./../components/AnimeComponents/AnimeListLove/AnimeListLove";
import AnimeSearchContainer from "./AnimeComponents/AnimeSearchView/AnimeSearchContainer/AnimeSearchContainer";
function Index() {
  return (
    <React.Fragment>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Container />}>
          <Route path="home" index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="anime" element={<AnimePlay />}>
            <Route path=":id" element={<AnimePlay />} />
          </Route>
          <Route path="context" element={<AppContext />} />
          <Route path="gender" element={<AnimeGender />} />
          <Route path="anime-today-can-watch" element={<AnimeToDayWatch />}>
            <Route path=":trang" element={<AnimeToDayWatch />} />
          </Route>
          <Route path="signup" element={<Home />} />
          <Route path="login" element={<Home />} />
          <Route path="my-list-love-animes" element={<ListLoveAnimes />} />
          <Route path="search" element={<AnimeSearchContainer />}></Route>
        </Route>
        <Route path="video" element={<AnimeLink />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/not-found" element={<NotFound />} />
      </Routes>

      {/* <Footer /> */}
    </React.Fragment>
  );
}

export default Index;
