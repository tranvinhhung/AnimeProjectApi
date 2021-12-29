import React, { useEffect, useRef } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  NavLink,
  useNavigate,
  useSearchParams,
  useLocation,
} from "react-router-dom";
import slugify from "slugify";
import "./videojs.scss";
import VideoJS from "./VideoJS";
function AnimeLink(props) {
  const { state } = useLocation();
  const navigate = useNavigate();
  console.log(state);
  const playerRef = React.useRef(null);
  const handleBack = () => {
    navigate(-1);
  };

  const videoJsOptions = {
    // lookup the options in the docs for more options
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,

    sources: [
      {
        src: `${state.dataEpisodeLink.video}`,
        type: "video/mp4",
      },
    ],
  };
  const el = useRef(null);

  useEffect(() => {
    el.current.scrollIntoView({ block: "end", behavior: "smooth" });
  });
  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // you can handle player events here
    player.on("waiting", () => {
      console.log("player is waiting");
    });

    player.on("dispose", () => {
      console.log("player will dispose");
    });
  };
  return (
    <div className="animeLink" ref={el}>
      <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
      <ArrowBackIcon onClick={handleBack} />
    </div>
  );
}

export default AnimeLink;
