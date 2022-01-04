import React from "react";
import { Route, Routes } from "react-router-dom";
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
function Index() {
  return (
    <React.Fragment>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="anime" element={<AnimePlay />}>
          <Route path=":id" element={<AnimePlay />} />
          {/* <Route path="gender" element={<AnimeGender />} /> */}
        </Route>
        <Route path="context" element={<AppContext />} />
        <Route path="video" element={<AnimeLink />} />
        <Route path="gender" element={<AnimeGender />} />
        <Route path="anime-today-can-watch" element={<AnimeToDayWatch />}>
          <Route path=":trang" element={<AnimeToDayWatch />} />
        </Route>
        <Route path="signup" element={<Home />} />
        <Route path="login" element={<Home />} />
        <Route path="*" element={<NotFound />}></Route>
        <Route path="/not-found" element={<NotFound />}></Route>
      </Routes>

      <Footer />
    </React.Fragment>
  );
}

export default Index;
