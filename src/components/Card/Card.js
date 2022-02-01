import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import React from "react";
import { useNavigate } from "react-router-dom";
// import Swiper core and required modules
import SwiperCore, { Lazy, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/lazy";
import "./card.scss";

SwiperCore.use([Lazy, Pagination, Navigation]);
function Card(props) {
  //   console.log(props);
  const navigate = useNavigate();
  const {
    id,
    cover_image: img,

    banner_image: img2,
    titles: { jp = "No alt", en },
    episodes_count,
    episode_duration,
  } = props.data;
  const lop = props.lop;
  //   console.log(id, fileName);
  const handleChangeUrl = () => {
    navigate(`/anime/${id}`);
  };

  return (
    <figure
      className={lop || "cardConatiner"}
      onClick={handleChangeUrl}
      style={lop ? { opacity: 1, visibility: "visible" } : {}}
    >
      <PlayCircleOutlineIcon></PlayCircleOutlineIcon>
      {lop && (
        <img
          data-src={img2 ? img2 : img}
          alt={jp}
          className={lop ? "swiper-lazy cardImg" : "cardImg"}
        />
      )}
      {!lop && <img src={img2 ? img2 : img} alt={jp} className="cardImg" />}
      <span>{en}</span>
      <span className="tap">{`Đã có   ${episodes_count}`}</span>

      {lop && (
        <div className="swiper-lazy-preloader swiper-lazy-preloader-black"></div>
      )}
    </figure>
  );
}

export default Card;
