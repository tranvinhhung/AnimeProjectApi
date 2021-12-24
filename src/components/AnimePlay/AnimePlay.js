import ClearIcon from "@mui/icons-material/Clear";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleActiveClose, handleActiveOpen } from "./../../reduces/index";
import {
  useNavigate,
  NavLink,
  useParams,
  useLocation,
  useMatch,
} from "react-router-dom";
import { handleAsync } from "../Error/Error";
// Import Swiper styles
import { getAnimeWidthId } from "./../../api/index";
import "./anime.scss";

function AnimePlay(props) {
  const [anime, setAnime] = useState(null);

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

  const { id } = useParams();
  //console.log(id);
  useEffect(() => {
    handleAsync(async () => {
      const animeId = await getAnimeWidthId(id);

      const anime = animeId.data.data;

      setAnime(anime);
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
      <div className="anime_descriptions">{`${anime?.descriptions.en}`}</div>
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
