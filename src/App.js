import MyCompo from "./components/main";
import { Route, Routes, Outlet } from "react-router-dom";
import Admin from "./components/Admin/Admin";
import NotFound from "./components/Main/NotFound/NotFound";
import "./sass/index.scss";
import { Home } from "@material-ui/icons";
import About from "./components/Main/About/About";
import AnimeGender from "./components/AnimeComponents/AnimeGenderList/AnimeGender";
import AnimePlay from "./components/AnimeComponents/AnimePlay/AnimePlay";
import AppContext from "./components/Context/AppContext";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
function App() {
  return (
    <div className="App">
      <MyCompo />
    </div>
  );
}

export default App;
