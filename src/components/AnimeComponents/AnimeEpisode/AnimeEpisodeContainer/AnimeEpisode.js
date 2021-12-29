import React, { useEffect, useState, useRef, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleAsync } from "./../../../Error/Error";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import {
  acSynHanleEpisode,
  resetListEpisode,
} from "./../../../../reduces/animeListEpisode";
import { unwrapResult } from "@reduxjs/toolkit";
import "./animeEpisoContai.scss";
import AnimeEpisodeCard from "../AnimeEpsidodeCard/AnimeEpisodeCard";

//gsap
import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
function AnimeEpisode(props) {
  let originalPromiseResult;
  let tl = gsap.timeline();
  const dispatch = useDispatch();
  const myListEpisode = useSelector((state) => state.myEpisode.data.documents);
  //   console.log(props);

  useEffect(() => {
    handleAsync(async () => {
      //cach 1 thong thuong
      //   let listEpisode = await handleListEpisodeWitdID(props.idAnime);
      //   console.log(listEpisode);
      //cach 2 handle async action redux
      let data = await dispatch(acSynHanleEpisode(props.idAnime));
      originalPromiseResult = unwrapResult(data);
      if (!originalPromiseResult) await dispatch(resetListEpisode());
      console.log(originalPromiseResult);
    })();
  }, [props.idAnime]);
  useEffect(() => {
    let arr = document.querySelectorAll(".itemEpisodeCard");

    function hide(elem) {
      gsap.set(elem, { autoAlpha: 0, x: "-100" });
    }
    myListEpisode &&
      (function () {
        arr.forEach((el, index) => {
          hide(el);
          tl.to(el, 0.1, {
            trigger: el,
            start: "50% center",
            scrub: 1,
            autoAlpha: 1,
            x: 0,
          });
        });
      })();
  }, [myListEpisode]);
  return (
    <div className="animeEpisodeContainer">
      <div className="animeEpisodeListTitle">List Episode</div>
      {myListEpisode.length > 0 && (
        <ul className="ListAnimeEpiso">
          {myListEpisode.map((el, index) => (
            <AnimeEpisodeCard key={index} data={el} title={props.title} />
          ))}
        </ul>
      )}

      {myListEpisode.length === 0 && (
        <div className="animeEpisodeMess">
          Không lấy được nguồn phim xin lỗi bạn rất nhiều hãy chọn anime khác
          nhé!
          <ErrorOutlineIcon />
        </div>
      )}
    </div>
  );
}

export default AnimeEpisode;
