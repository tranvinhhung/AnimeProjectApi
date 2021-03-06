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
import { CSSPlugin } from "gsap/CSSPlugin";
import "./AnimeGender.scss";

import { CSSRulePlugin } from "gsap/CSSRulePlugin";
gsap.registerPlugin(ScrollTrigger, CSSRulePlugin, CSSPlugin);

function AnimeGender() {
  const {
    pathname,
    state: { gender },
  } = useLocation();
  const location = useLocation();
  let [searchParams, setSearchParams] = useSearchParams();
  console.log(gender);
  console.log(location);
  let myData = useSelector((state) => state.myAnime.data);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  let tl = gsap.timeline();
  let trang;
  useEffect(() => {
    window.scrollTo(0, 0);
    trang = Number(searchParams.get("trang"));

    document.title = "Genres";
    handleAsync(async () => {
      try {
        let arr = await listAnimeWithGender(gender, 21, trang);
        if (arr["status_code"] === 200) {
          dispatch(getListGender(arr));
        } else if (arr["status_code"] === 404) {
          navigate("/not-found");
        }

        // console.log(arr);
        // console.log(dataa);
        // console.log(dataa.data.documents);
      } catch (err) {
        console.log(err);
        navigate("/not-found");
      }
    })();
    return () => {
      (async () => {
        await dispatch(resetListGender());
      })();
    };
  }, [gender, pathname, searchParams]);
  useEffect(() => {
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
  useEffect(() => {
    if (document.querySelector(".navright").classList.contains("active")) {
      document.querySelector(".navright").classList.remove("active");
    }
  }, []);
  const handleChange = async (event) => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });

    navigate(
      `${pathname}?name=${searchParams.get("name")}&trang=${
        event.target.value
      }`,
      { state: { gender } }
    );
  };
  const handleCountPage = (page) => {
    let arr = [];
    for (let i = 1; i <= page; i++) {
      arr.push(i);
    }
    return arr;
  };
  const handleIncrePage = () => {
    navigate(
      `${pathname}?name=${searchParams.get("name")}&trang=${
        Number(searchParams.get("trang")) + 1
      }`,
      { state: { gender } }
    );
  };
  const handleDecrePage = () => {
    navigate(
      `${pathname}?name=${searchParams.get("name")}&trang=${
        Number(searchParams.get("trang")) - 1
      }`,
      { state: { gender } }
    );
  };

  return (
    <div className="mainContainer genDerList">
      {myData["status_code"] === 200 && (
        <>
          <p>{gender + ` List`}</p>
          <div className="containerListGenderImg">
            {myData?.data.documents.map((data, index) => (
              <Card key={index} data={data} />
            ))}
          </div>
          <div className="boxChangePage">
            <ArrowBackIosNewOutlinedIcon onClick={handleDecrePage} />
            <Box sx={{ minWidth: 100 }}>
              <FormControl fullWidth>
                <InputLabel id="select-label">Trang</InputLabel>
                <Select
                  labelId="select-label"
                  id="simple-select"
                  label="Trang"
                  onChange={handleChange}
                  value={Number(searchParams.get("trang"))}
                  defaultValue=""
                >
                  {myData.data?.last_page &&
                    handleCountPage(myData.data?.last_page).map((el, index) => (
                      <MenuItem key={index} value={el}>
                        {trang || el}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Box>
            <ArrowForwardIosOutlinedIcon onClick={handleIncrePage} />
          </div>
        </>
      )}
    </div>
  );
}

export default AnimeGender;
