import React, { useState } from "react";
import {
  NavLink,
  useLocation,
  useMatch,
  useNavigate,
  useParams,
  useRoutes,
} from "react-router-dom";
import AnimePlay from "../../AnimeComponents/AnimePlay/AnimePlay";
function About() {
  const params = useParams();
  const location = useLocation();
  const [numBer, setnumBer] = useState(params.id);
  const navigate = useNavigate();
  console.log(params);
  console.log(location);
  const handleChangeUrl = () => {
    navigate("/home");
  };
  return (
    <>
      <main className="mainContainer">About</main>;
    </>
  );
}

export default About;
