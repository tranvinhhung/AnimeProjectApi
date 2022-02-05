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
import AnimeInforContainer from "../AnimeInfor/AnimeInforContainer/AnimeInforContainer";
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
import { CSSRulePlugin } from "gsap/CSSRulePlugin";
// Import Swiper styles
import { getAnimeWidthId, songWidthId } from "../../../api/index";
import "./anime.scss";
import AnimeEpisode from "../AnimeEpisode/AnimeEpisodeContainer/AnimeEpisode";
import AnimeFavoriteButton from "../AnimeFavoriteButton/AnimeFavoriteButton";
import AnimeRelate from "./../AnimeRelate/AnimeRelate";
import AnimeMusicBar from "../AnimeMusicBar/AnimeMusicBar";
import AnimeComments from "../AnimeComments/AnimeCommentContainer/AnimeCommentContainer";

gsap.registerPlugin(CSSRulePlugin);
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
  const songRefT = useRef();
  const animeInfoRef = useRef();
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
  const handeTitleSong = (type) => {
    if (!type) {
      return "OpeningSong";
    } else if (type === 1) {
      return "EndingSong";
    } else {
      return "SongAnime";
    }
  };

  const open = Boolean(anchorEl);

  const handleOpen = async () => {
    await gsap
      .timeline()
      .to(animeRef.current, { autoAlpha: 0, duration: 2, cursor: "progress" })
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
  const handlePlay = async () => {
    let tl = gsap.timeline();
    let emm = document.querySelector("#emm");

    if (play) {
      // await gsap.to()
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
    window.scrollTo(0, 0);
    document.title = "Anime Detail";
    handleAsync(async () => {
      // const animeId = await getAnimeWidthId(id);
      // const animeSong = await songWidthId(id);
      const handleAll = await Promise.all([
        getAnimeWidthId(id),
        songWidthId(id),
      ]);

      // console.log(handleAll);
      const [animethis, songthis] = handleAll;

      const animedata = animethis.data.data;
      const songdata = songthis.data.data;
      // console.log(animedata);
      if (songdata) {
        await dispatch(getSong(songdata));
      }
      // setSong(songdata);
      setAnime(animedata);
    })();
  }, []);
  // console.log(songRedux);
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    (async () => {
      let tl = gsap.timeline();
      tl.to(boxRef.current, { autoAlpha: 1, duration: 0.7, scale: 1 })
        .from(
          imgRef.current,
          {
            scale: 0.7,
            autoAlpha: 0,
            duration: 0.4,
            y: "50",
          },
          "+=0.1"
        )
        .from(desRef.current, { y: "-50", duration: 0.4, autoAlpha: 0 })
        .from(reduxSongRef.current, 0.4, { y: "100", autoAlpha: 0 }, "-=0.2")
        .to(
          animeInfoRef.current,
          {
            duration: 0.3,
            autoAlpha: 1,
          },
          "+=0.1"
        );
    })();
  }, []);
  const handleAnimation = async () => {
    document.body.style.overflow = "hidden";
    let tl = gsap.timeline();
    await tl
      .to(boxRef.current, 0.5, { opacity: 0 })
      .to(imgRef.current, 0.5, { y: "-100", autoAlpha: 0 })
      .to(desRef.current, 0.5, { autoAlpha: 0 })
      .to(reduxSongRef.current, 0.5, { y: "100", autoAlpha: 0 })
      .to(animeInfoRef.current, 0.3, {
        x: "-100",
        autoAlpha: 0,
      })
      .to(byeRef.current, 0.5, { autoAlpha: 1 }, "+=0.2");

    // .to()cssRule:
    await dispatch(delSong());
    await navigate("/home");
    document.body.style.overflow = "visible";
  };

  return (
    // <section ref={el} className="mainContainerAnime anime">
    <>
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
            <AnimeFavoriteButton idAnime={anime} />
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
              ref={songRefT}
            >
              <h1>
                {(songRedux?.type && handeTitleSong(songRedux?.type)) ||
                  "Song Anime"}
              </h1>
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
          <div ref={animeInfoRef} className="animeInfor">
            {anime && !play && <AnimeInforContainer dataIn={anime} />}
            {play && <AnimeMusicBar />}
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
              zIndex: 999,
            }}
          ></ClearIcon>
          {anime?.["trailer_url"] && (
            <div className="trailerConatainerIfra">
              <iframe
                className="iframeTrailer"
                loading="lazy"
                src={`${anime?.["trailer_url"]}`}
              ></iframe>
            </div>
          )}
          {!anime?.["trailer_url"] && (
            <div
              style={{
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
      {/* AnimeEpisode List */}
      <AnimeEpisode
        isStyle={anime?.["cover_color"]}
        title={anime?.titles.en || anime?.titles.it}
        idAnime={id}
      />
      {/*anime Comments*/}
      <AnimeComments idAnime={id} />
    </>
  );
}

export default AnimePlay;
