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
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

//gsap
import { gsap } from "gsap";
import { CSSPlugin } from "gsap/CSSPlugin";

// Force CSSPlugin to not get dropped during build

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CSSRulePlugin } from "gsap/CSSRulePlugin";
gsap.registerPlugin(ScrollTrigger, CSSRulePlugin, CSSPlugin);
function AnimeEpisode(props) {
  let originalPromiseResult;
  let tl = gsap.timeline();
  let elementScroll = useRef();
  const dispatch = useDispatch();
  const myListEpisode = useSelector((state) => state.myEpisode.data);
  console.log(myListEpisode);

  useEffect(() => {
    // window.scroll(0, 0);
    handleAsync(async () => {
      //cach 1 thong thuong
      //   let listEpisode = await handleListEpisodeWitdID(props.idAnime);
      //   console.log(listEpisode);
      //cach 2 handle async action redux

      let data = await dispatch(
        acSynHanleEpisode({
          id: props.idAnime,
          page: myListEpisode?.current_page || 1,
        })
      );
      originalPromiseResult = unwrapResult(data);
      if (!originalPromiseResult) await dispatch(resetListEpisode());
      console.log(originalPromiseResult);

      console.log(myListEpisode);
      console.log(myListEpisode?.current_page);

      return () => {
        (async () => {
          await dispatch(resetListEpisode());
        })();
      };
    })();
  }, [props.idAnime]);
  useEffect(() => {
    let arr;
    if (myListEpisode) {
      arr = document.querySelectorAll(".itemEpisodeCard");
    }

    function hide(elem) {
      gsap.set(elem, { autoAlpha: 0, x: "-100" });
    }
    myListEpisode &&
      arr.forEach((el, index) => {
        hide(el);
        tl.to(el, {
          trigger: el,
          duration: 0.1,
          autoAlpha: 1,
          x: 0,
        });
      });
    // })();
  }, [myListEpisode]);
  const handleCountPage = (page) => {
    let arr = [];
    for (let i = 1; i <= page; i++) {
      arr.push(i);
    }
    return arr;
  };
  const handleChange = async (event) => {
    let data = await dispatch(
      acSynHanleEpisode({ id: props.idAnime, page: event.target.value })
    );

    // console.log(arr);
  };
  return (
    <div className="animeEpisodeContainer">
      <div className="animeEpisodeListTitle" ref={elementScroll}>
        List Episode
      </div>
      <ul className="ListAnimeEpiso">
        {myListEpisode?.documents.map((el, index) => (
          <AnimeEpisodeCard
            itemEpisode="itemEpisodeCard"
            key={index}
            data={el}
            title={props.title}
          />
        ))}
      </ul>
      {myListEpisode.documents.length > 0 && (
        <>
          <div className="boxChangePage">
            <ArrowBackIosNewOutlinedIcon />
            <Box sx={{ minWidth: 100 }}>
              <FormControl fullWidth>
                <InputLabel id="select-label">Trang</InputLabel>
                <Select
                  labelId="select-label"
                  id="simple-select"
                  label="Trang"
                  onChange={handleChange}
                >
                  {myListEpisode?.last_page &&
                    handleCountPage(myListEpisode?.last_page).map(
                      (el, index) => (
                        <MenuItem key={index} value={el}>
                          {`Tập ${
                            index === 0
                              ? el
                              : index * myListEpisode.documents.length + 1
                          }-${el * myListEpisode.documents.length}`}
                        </MenuItem>
                      )
                    )}
                </Select>
              </FormControl>
            </Box>
            <ArrowForwardIosOutlinedIcon />
          </div>
        </>
      )}

      {myListEpisode.documents.length === 0 && (
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
