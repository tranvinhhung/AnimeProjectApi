import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import slugify from "slugify";
import "./animeEpisodeCard.scss";
import { useSelector } from "react-redux";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
function AnimeEpisodeCard(props) {
  const navigate = useNavigate();
  // const getColor = useSelector(state =>state.)
  const handleSlug = (tite) => {
    return slugify(tite, {
      replacement: "-",
      remove: undefined,
      lower: true,
      strict: false,
      locale: "vi",
      trim: true,
    });
  };
  const handleUrlAnimeVideo = (name, tap) => {
    navigate(`/video?name=${name}&chapter=${tap}`, {
      state: { dataEpisodeLink: props.data },
    });
  };
  return (
    <li
      className="itemEpisodeCard"
      onClick={() => {
        handleUrlAnimeVideo(handleSlug(props.title), props.data.number);
      }}
    >
      {props.data.number} {props.data.title}
      <ArrowForwardOutlinedIcon />
    </li>
  );
}

export default AnimeEpisodeCard;
