import React, { useState, useEffect, useLayoutEffect } from "react";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";
import Loading from "./../../Loading/index";
import { listAnimeWithGender } from "./../../../api/index";
import Card from "../../Card/Card";
import { acSynHanleAni } from "./../../../reduces/animeGenderList";
import { useSelector, useDispatch } from "react-redux";
import { handleAsync } from "./../../Error/Error";
import {
  getListGender,
  resetListGender,
} from "./../../../reduces/animeGenderList";
import { unwrapResult } from "@reduxjs/toolkit";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./AnimeGender.scss";
gsap.registerPlugin(ScrollTrigger);
function AnimeGender() {
  const {
    pathname,
    state: { gender },
  } = useLocation();
  const location = useLocation();
  let [searchParams, setSearchParams] = useSearchParams();
  console.log(gender);
  console.log(location);
  const data = useSelector((state) => state.myAnime.data);
  let countPage = data.last_page;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let tl = gsap.timeline();
  useLayoutEffect(() => {
    let arr = document.querySelectorAll(".cardConatiner");

    function hide(elem) {
      gsap.set(elem, { autoAlpha: 0 });
    }

    arr.forEach(async (el, index) => {
      hide(el);
      tl.to(
        el,
        0.1,
        {
          trigger: el,
          start: "50% center",
          scrub: 1,
          autoAlpha: 1,
          x: 0,
          delay: 0.05,
          ease: "Power3.easeIn",
        },
        "+=0.05"
      );
    });

    return () => {
      (async () => {
        arr.forEach(async (el, index) => {
          await hide(el);
        });
      })();
    };
  }, [data]);
  useEffect(() => {
    window.scrollTo(0, 0);
    handleAsync(async () => {
      let arr = await listAnimeWithGender(gender, 21);
      await dispatch(getListGender(arr));

      console.log(arr);
      console.log(data.documents);
    })();
  }, []);
  const handleChange = async (event) => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
    let arr = await listAnimeWithGender(gender, 21, event.target.value);
    await dispatch(getListGender(arr));
    localStorage.setItem("genderPage", JSON.stringify(event.target.value));
    navigate(
      `${pathname}?name=${searchParams.get("name")}&trang=${
        event.target.value
      }`,
      { state: { gender } }
    );
    console.log(arr);
  };
  const handleCountPage = (page) => {
    let arr = [];
    for (let i = 1; i <= page; i++) {
      arr.push(i);
    }
    return arr;
  };

  return (
    <div className="mainContainer genDerList">
      <p>{gender + ` List`}</p>
      <div className="containerListGenderImg">
        {data.documents.map((data, index) => (
          <Card key={index} data={data} />
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
              onChange={handleChange}
            >
              {handleCountPage(countPage).map((el) => (
                <MenuItem value={el}>
                  {el ? el : localStorage.getItem("genderPage")}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <ArrowForwardIosOutlinedIcon />
      </div>
    </div>
  );
}

export default AnimeGender;
