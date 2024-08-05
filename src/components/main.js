import React from "react";
import { Route, Routes } from "react-router-dom";
import AnimeLink from "./AnimeComponents/AnimeSoureLink/AnimeLink";
import Container from "./Container/Container";
import Home from "./Main/Home/Home";
import NotFound from "./Main/NotFound/NotFound";
function Index() {
  return (
    <React.Fragment>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Container />}>
          <Route path="home" index element={<Home />} />
          {/* <Route path="about" element={<About />} />
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
          <Route path="top-100-anime" element={<AnimeTop100Contai />} /> */}
        </Route>
        {/* <Route path="video" element={<AnimeLink />} />
        <Route path="*" element={<NotFound />} /> */}
        <Route path="/not-found" element={<NotFound />} />
      </Routes>

      {/* <Footer /> */}
    </React.Fragment>
  );
}

export default Index;
