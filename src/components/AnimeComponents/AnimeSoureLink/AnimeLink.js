import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import VideoJS from "./VideoJS";
import "./videojs.scss";
function AnimeLink(props) {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(state);
  const playerRef = React.useRef(null);
  const handleBack = () => {
    // dispatch(resetListEpisode());
    navigate(-1);
  };

  const videoJsOptions = {
    // lookup the options in the docs for more options
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    preload: "metadata",
    liveui: true,

    sources: [
      {
        src: `${state.dataEpisodeLink.video}`,
        type: "video/mp4",
      },
      // {
      //   src: `${state.dataEpisodeLink.video}`,
      //   type: "application/x-mpegURL",
      // },
    ],
  };
  const el = useRef(null);

  useEffect(() => {
    el.current.scrollIntoView({ block: "end", behavior: "smooth" });
    document.title = "Watch Anime";
  }, []);
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
