import ClearIcon from "@mui/icons-material/Clear";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleActiveClose, handleActiveOpen } from "./../../reduces/index";
import PlayCircleRoundedIcon from "@mui/icons-material/PlayCircleRounded";
import PauseCircleRoundedIcon from "@mui/icons-material/PauseCircleRounded";
import {
  useNavigate,
  NavLink,
  useParams,
  useLocation,
  useMatch,
} from "react-router-dom";
import { handleAsync } from "../Error/Error";
// Import Swiper styles
import { getAnimeWidthId, songWidthId } from "./../../api/index";
import "./anime.scss";

function AnimePlay(props) {
  const [anime, setAnime] = useState(null);
  const [song, setSong] = useState(null);
  const [play, setPlay] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const activeDialog = useSelector((state) => state.mycounter.active);
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
    let button = document.querySelector("Button");
    button.style.opacity = 1;
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    let button = document.querySelector("Button");
    button.style.opacity = 0;
  };

  const open = Boolean(anchorEl);

  const handleOpen = () => {
    dispatch(handleActiveOpen());
  };
  const handleClose = () => {
    dispatch(handleActiveClose());
  };
  const handleBack = () => {
    navigate(-1);
    dispatch(handleActiveClose());
  };
  const handlePlay = () => {
    let emm = document.querySelector("#emm");
    if (play) {
      emm.pause();
      setPlay(false);
    }
    if (!play) {
      emm.play();
      setPlay(true);
    }
    // console.log(emm);
  };
  const handleStop = () => {
    let emm = document.querySelector("#emm");
    // console.log(emm);
    emm.pause();
  };

  const { id } = useParams();
  //console.log(id);
  useEffect(() => {
    handleAsync(async () => {
      // const animeId = await getAnimeWidthId(id);
      // const animeSong = await songWidthId(id);
      const handleAll = await Promise.all([
        getAnimeWidthId(id),
        songWidthId(id),
      ]);

      console.log(handleAll);
      const [animethis, songthis] = handleAll;

      const animedata = animethis.data.data;
      const songdata = songthis.data.data;
      setSong(songdata);
      setAnime(animedata);
    })();
  }, []);

  return (
    <section className="mainContainer anime">
      <figure
        className="animeContainer"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        <Button
          variant="contained"
          onClick={() => {
            handleOpen();
          }}
          sx={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%,-50%)",
            opacity: 0,
            transition: "all 0.5s",
            zIndex: "99",
          }}
        >
          {anime?.["trailer_url"]
            ? "Xem trailer nào !!"
            : "Không có trailer mong bạn chọn anime khác hihi!!"}
        </Button>
        <img src={`${anime?.cover_image}`} alt={`${anime?.titles.en}`} />
      </figure>
      <div className="anime_descriptions">
        {`${anime?.descriptions.en}`}
        {/* {song.includes("does not exists") && <div>Không có nhạc sorry!!</div>} */}
        {song?.["preview_url"] && (
          <div className="songAudio">
            <audio
              id="emm"
              src={song?.["preview_url"]}
              align="baseline"
              border="0"
              width={300}
              height="200"
              autostart="false"
              loop={true}
              loading="lazy"
            ></audio>
            {!play && (
              <PlayCircleRoundedIcon
                onClick={handlePlay}
              ></PlayCircleRoundedIcon>
            )}
            {play && (
              <PauseCircleRoundedIcon
                onClick={handlePlay}
              ></PauseCircleRoundedIcon>
            )}
          </div>
        )}
      </div>
      {/*pôpver */}

      {/* dialog */}
      <Dialog open={activeDialog} maxWidth="md">
        <ClearIcon
          onClick={handleClose}
          className="icon"
          sx={{
            fontSize: 30,
            position: "absolute",
            right: 0,
            color: "red",
          }}
        ></ClearIcon>
        {anime?.["trailer_url"] && (
          <iframe
            width="900"
            height="506"
            loading="lazy"
            src={`${anime?.["trailer_url"]}`}
          ></iframe>
        )}
        {!anime?.["trailer_url"] && (
          <div
            style={{
              height: 506,
              width: 900,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: 30,
            }}
          >
            <Button onClick={handleBack}>
              Xin lỗi anime này không có trailer nhấn vào dòng này để quay lại
              trang chính!!!
            </Button>
          </div>
        )}
      </Dialog>
    </section>
  );
}

export default AnimePlay;
