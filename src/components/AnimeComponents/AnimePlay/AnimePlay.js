import ClearIcon from "@mui/icons-material/Clear";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleActiveClose, handleActiveOpen } from "../../../reduces/index";
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
  const [song, setSong] = useState(null);
  const [play, setPlay] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const boxRef = useRef();
  const imgRef = useRef();
  const byeRef = useRef();
  const desRef = useRef();
  const animeRef = useRef();
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
    await gsap
      .timeline()
      .to(animeRef.current, {
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

      setSong(songdata);
      setAnime(animedata);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      gsap.from(imgRef.current, { autoAlpha: 0, duration: 1 });
      gsap.from(desRef.current, { y: "-50", duration: 1 });
      gsap.from(boxRef.current, { autoAlpha: 0, duration: 0.5, scale: 0.4 });
    })();
  }, []);
  const handleAnimation = async () => {
    let tl = gsap.timeline();
    await tl
      .to(boxRef.current, 1, { opacity: 0 })
      .to(imgRef.current, 2, { y: "-100", autoAlpha: 0 })
      .to(desRef.current, 1, { autoAlpha: 0 })
      .to(byeRef.current, 3, { autoAlpha: 1 });
    // .to()
    navigate("/home");
  };
  const regex = /^<^>^/g;
  return (
    <section ref={animeRef} className="mainContainerAnime anime">
      <figure
        style={{ backgroundColor: anime?.["cover_color"] }}
        className={anime?.["banner_image"] && "animerBanner"}
        src={anime?.["banner_image"]}
        ref={boxRef}
        // data-aos="fade-up"
      ></figure>
      <figure
        className="animeContainer"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        ref={imgRef}
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
        <img src={`${anime?.cover_image}`} alt={`${anime?.titles.en}`} />
      </figure>
      <button className="animateButtom" onClick={handleAnimation}>
        button
      </button>
      <div className="bye" ref={byeRef}>
        Chào các bạn nhé!!~
      </div>
      <div className="anime_descContainer" ref={desRef}>
        <div className="anime_titles">{anime?.titles.en}</div>
        <div className="anime_des">
          {`${anime?.descriptions.en.replaceAll(regex, "")}` ||
            "không có thông tin mô tả"}
        </div>
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
