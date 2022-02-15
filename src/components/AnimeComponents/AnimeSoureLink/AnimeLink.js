import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SettingsIcon from "@mui/icons-material/Settings";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  handleAnimeVideoAsync,
  resetAnimeVideo,
  handleConfigVideo,
} from "./../../../reduces/animeVideos";
import VideoJS from "./VideoJS";
import "./videojs.scss";
function AnimeLink(props) {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const configVideo = useSelector((state) => state.myVideo.config);
  const linkQuantityAnime = useSelector((state) => state.myVideo.allLink);
  const currentQuanlity = useSelector((state) => state.myVideo.quality);
  console.log(state);
  const playerRef = React.useRef(null);
  const handleBack = () => {
    dispatch(resetAnimeVideo());
    navigate(-1);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [check, setCheck] = React.useState("");
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = async (e) => {
    setAnchorEl(null);
    // setCheck(e.currentTarget.textContent);
    try {
      let dataQuantity = await dispatch(
        handleAnimeVideoAsync({
          id: state.dataEpisodeLink["anime_id"],
          number: state.dataEpisodeLink.number,
          quality: e.currentTarget.textContent,
        })
      );

      let unRapdataQuti = unwrapResult(dataQuantity);
      console.log(unRapdataQuti);
    } catch (err) {
      console.log(err);
    }
  };

  const el = useRef(null);

  useEffect(() => {
    el.current.scrollIntoView({ block: "end", behavior: "smooth" });
    document.title = "Watch Anime";
    (async () => {
      try {
        let dataQuantity = await dispatch(
          handleAnimeVideoAsync({
            id: state.dataEpisodeLink["anime_id"],
            number: state.dataEpisodeLink.number,
          })
        );

        let unRapdataQuti = unwrapResult(dataQuantity);

        console.log(unRapdataQuti);
      } catch (err) {
        console.log(err);
        if (err) {
          dispatch(
            handleConfigVideo({
              src: state.dataEpisodeLink.video,
              type: "video/mp4",
            })
          );
        }
      }
    })();
  }, [state.dataEpisodeLink["anime_id"]]);
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
      {configVideo.sources[0].src && (
        <>
          <VideoJS options={configVideo} onReady={handlePlayerReady} />

          <ArrowBackIcon onClick={handleBack} />
          {linkQuantityAnime?.length > 0 && (
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? "long-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleClick}
              className="settingIcon"
            >
              <SettingsIcon />
            </IconButton>
          )}
          <Menu
            id="long-menu"
            MenuListProps={{
              "aria-labelledby": "long-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                width: "20ch",
              },
            }}
          >
            {linkQuantityAnime.map((option, index) => (
              <MenuItem
                key={index}
                selected={option.quality === currentQuanlity}
                onClick={handleClose}
              >
                {option.quality}
              </MenuItem>
            ))}
          </Menu>
        </>
      )}
    </div>
  );
}

export default AnimeLink;
