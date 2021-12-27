import ClearIcon from "@mui/icons-material/Clear";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleActiveClose, handleActiveOpen } from "../../../reduces/index";
import { getSong, delSong } from "../../../reduces/songSlice";
import PlayCircleRoundedIcon from "@mui/icons-material/PlayCircleRounded";
import PauseCircleRoundedIcon from "@mui/icons-material/PauseCircleRounded";
import Aos from "aos";
import {
  useNavigate,
  NavLink,
  useParams,
  useLocation,
  useMatch,
} from "react-router-dom";

import { handleAsync } from "../../Error/Error";
import "aos/dist/aos.css";
import { gsap } from "gsap";
// Import Swiper styles
import { getAnimeWidthId, songWidthId } from "../../../api/index";
import "./anime.scss";

function AnimePlay(props) {
  const [anime, setAnime] = useState(null);

  const [play, setPlay] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const boxRef = useRef();
  const imgRef = useRef();
  const byeRef = useRef();
  const desRef = useRef();
  const animeRef = useRef();
  const reduxSongRef = useRef();
  const activeDialog = useSelector((state) => state.mycounter.active);
  //new song redux
  const songRedux = useSelector((state) => state.mySong.song);
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

  const handleOpen = async () => {
    await gsap
      .timeline()
      .to(animeRef.current, { autoAlpha: 0, duration: 3, cursor: "progress" })
      .to(animeRef.current, { scale: 2 }, "-=1");
    dispatch(handleActiveOpen());
  };
  const handleClose = async () => {
    // gsap.set(animeRef.current, { autoAlpha: 0, scale: 1 });
    await dispatch(handleActiveClose());
    await gsap.timeline().to(animeRef.current, {
      autoAlpha: 1,
      duration: 0.5,
      scale: 1,
      cursor: "pointer",
    });
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
  // const dispatch = useDispatch();
  // Aos.init();

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
      console.log(animedata);
      if (songdata) {
        await dispatch(getSong(songdata));
      }
      // setSong(songdata);
      setAnime(animedata);
    })();
  }, []);
  console.log(songRedux);
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    (async () => {
      let tl = gsap.timeline();
      await tl
        .from(boxRef.current, { autoAlpha: 0, duration: 1, scale: 0.6 })
        .from(imgRef.current, {
          scale: 0.7,
          autoAlpha: 0,
          duration: 0.5,
          y: "50",
        })
        .from(
          desRef.current,
          { y: "-50", duration: 0.8, autoAlpha: 0 },
          "-=0.3"
        )
        .from(reduxSongRef.current, 1, { y: "100", autoAlpha: 0 }, "-=0.5");
    })();
  }, []);
  const handleAnimation = async () => {
    let tl = gsap.timeline();
    await tl
      .to(boxRef.current, 1, { opacity: 0 })
      .to(imgRef.current, 1, { y: "-100", autoAlpha: 0 })
      .to(desRef.current, 1, { autoAlpha: 0 })
      .to(reduxSongRef.current, 1, { y: "100", autoAlpha: 0 })
      .to(byeRef.current, 2, { autoAlpha: 1 });

    // .to()
    await dispatch(delSong());
    await navigate("/");
  };

  return (
    // <section ref={el} className="mainContainerAnime anime">
    <section ref={animeRef} className="mainContainerAnime anime">
      <figure
        style={{ backgroundColor: anime?.["cover_color"] }}
        className={anime?.["cover_image"] && "animerBanner"}
        ref={boxRef}
      ></figure>

      <div className="animeLi">
        <figure
          className="animeContainer"
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
          ref={imgRef}
          style={anime ? { boxShadow: "0 0 5px black" } : {}}
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
              : "Không trailler hihi!!"}
          </Button>
          {anime?.cover_image && (
            <img src={`${anime?.cover_image}`} alt={`${anime?.titles.en}`} />
          )}
        </figure>
        <button
          className="animateButtom"
          onClick={handleAnimation}
          // ref={btnRef}
        >
          AniBack
        </button>
        <div className="anime_descContainer" ref={desRef}>
          <div className="anime_titles">{anime?.titles.en}</div>
          <div className="anime_des">
            {anime?.descriptions.en ||
              anime?.descriptions.it ||
              "Không có thông tin mô tả!!!"}
          </div>
        </div>
        {songRedux?.["preview_url"] && (
          <audio
            id="emm"
            src={songRedux?.["preview_url"]}
            align="baseline"
            border="0"
            width={300}
            height="200"
            autostart="false"
            loop={true}
            loading="lazy"
          ></audio>
        )}

        <div className="animeAudioContai" ref={reduxSongRef}>
          <div
            className="songdes"
            style={
              songRedux?.["preview_url"]
                ? { opacity: 1, visibility: "visible" }
                : { opacity: 0, visibility: "hidden" }
            }
          >
            <h1>Song anime</h1>
            <span className="songTitle">
              {songRedux?.title ? `Title:${songRedux?.title}` : ""}
            </span>
            <span className="songAlbum">
              {songRedux?.album ? `Album:${songRedux?.album}` : ""}
            </span>
            <span className="songArtist">
              {songRedux?.artist ? `Artist:${songRedux?.artist}` : ""}
            </span>
            <span className="songYear">
              {songRedux?.year ? `Year:${songRedux.year}` : ""}
            </span>
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
        </div>
      </div>

      {/* <div className="bye" ref={byeRef}>
        Chào các bạn nhé!!~
      </div> */}

      {/*pôpver */}
      <div className="bye" ref={byeRef}>
        Chào các bạn nhé!!~
      </div>
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
