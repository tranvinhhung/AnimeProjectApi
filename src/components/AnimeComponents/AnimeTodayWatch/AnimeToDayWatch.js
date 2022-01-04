import React, { useState, useEffect, useLayoutEffect } from "react";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";

import { listAnimeEpisoleToday, getAnimeWidthId } from "./../../../api/index";
import Card from "../../Card/Card";

import { useSelector, useDispatch } from "react-redux";
import { handleAsync } from "./../../Error/Error";
import {
  handleAnimeWatchToday,
  resetListTodayWatch,
} from "./../../../reduces/animeWatchToday";
import { unwrapResult } from "@reduxjs/toolkit";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Loading from "./../../../components/Loading/index";
import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CSSPlugin } from "gsap/CSSPlugin";
import { CSSRulePlugin } from "gsap/CSSRulePlugin";
gsap.registerPlugin(ScrollTrigger, CSSRulePlugin, CSSPlugin);

function AnimeToDayWatch() {
  const location = useLocation();
  let [searchParams, setSearchParams] = useSearchParams();
  //   const [myData, setmyData] = useState([]);
  console.log(location);
  let myData = useSelector((state) => state.myTodayWatchList.data);
  let isFindData = useSelector((state) => state.myTodayWatchList.isFindData);
  const [countPage, setCountPage] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let tl = gsap.timeline();
  const handleCountPage = (page) => {
    let arr = [];
    for (let i = 1; i <= page; i++) {
      arr.push(i);
    }
    return arr;
  };
  const handleListId = async (event) => {
    let arrVideo = await listAnimeEpisoleToday({ page: event.target.value });
    // setCountPage()
    let arrID = arrVideo.documents.map((element) => {
      return element["anime_id"];
    });
    await dispatch(handleAnimeWatchToday(arrID));
    navigate(`/anime-today-can-watch/trang-${event.target.value}`);
  };
  //   console.log(handlePromis(tinh, [1, 2, 3]));
  useEffect(() => {
    window.scrollTo(0, 0);
    handleAsync(async () => {
      try {
        let arrVideo = await listAnimeEpisoleToday({});
        console.log(arrVideo);
        setCountPage(arrVideo["last_page"]);
        let arrID = arrVideo.documents.map((element) => {
          return element["anime_id"];
        });
        console.log(arrID);
        // let allAnime = await Promise.all([
        //   ...(await handlePromis(getAnimeWidthId, arrID)),
        // ]);
        let lay1 = await dispatch(handleAnimeWatchToday(arrID));
        let layyy = unwrapResult(lay1);
        console.log(layyy);
        // console.log(allAnime);
        // setmyData(allAnime);
        // console.log(arrVideo);
        console.log(myData);
      } catch (err) {
        console.log(err);
        // navigate("/not-found");
      }
    })();
    return () => {
      (async () => {
        await dispatch(resetListTodayWatch());
      })();
    };
  }, []);
  useEffect(() => {
    window.scroll(0, 0);
    let card;
    if (myData) {
      card = document.querySelectorAll(".cardConatiner");
    }

    function hide(elem) {
      gsap.set(elem, { autoAlpha: 0, scale: 0.3 });
    }

    myData &&
      (function () {
        card.forEach((el, index) => {
          hide(el);
        });
        tl.to(".cardConatiner", 0.6, {
          autoAlpha: 1,
          scale: 1,

          stagger: {
            from: "random",

            amount: 1.2,
          },
          ease: "Power3.easeOut",
        });
      })();
  }, [myData]);

  return (
    <div className="mainContainer genDerList">
      {isFindData && <Loading />}
      {!isFindData && (
        <>
          <div style={myData ? { padding: 20, fontSize: 20, opacity: 1 } : {}}>
            Hôm nay xem gì!!
          </div>
          <div className="containerListGenderImg">
            {myData.map((data, index) => (
              <Card key={index} data={data.data.data} />
            ))}
          </div>
          <div className="boxChangePage">
            <ArrowBackIosNewOutlinedIcon />
            <Box sx={{ minWidth: 100 }}>
              <FormControl fullWidth>
                <InputLabel id="select-label">Trang</InputLabel>
                <Select
                  labelId="select-label"
                  id="simple-select"
                  label="Trang"
                  onChange={handleListId}
                  defaultValue=""
                >
                  {handleCountPage(countPage).map((el, index) => (
                    <MenuItem key={index} value={el}>
                      {el}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <ArrowForwardIosOutlinedIcon />
          </div>
        </>
      )}
    </div>
  );
}
export default AnimeToDayWatch;
