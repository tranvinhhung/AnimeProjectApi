import React, { useState, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import Loading from "./../../Loading/index";
import { listAnimeWithGender } from "./../../../api/index";
import Card from "../../Card/Card";
import { acSynHanleAni } from "./../../../reduces/animeGenderList";
import { useSelector, useDispatch } from "react-redux";
import { handleAsync } from "./../../Error/Error";
import { unwrapResult } from "@reduxjs/toolkit";
function AnimeGender() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoaing] = useState(false);
  const [page, setPage] = useState(1);
  const [list, setList] = useState([]);
  const dispatch = useDispatch();
  const listGenderRedux = useSelector((state) => state.myAnime.list);
  let search = searchParams
    .get("gender")
    ?.replaceAll("-", " ")
    .split(" ")
    .map((el) => {
      return `${el[0].toUpperCase() + el.slice(1)}`;
    })
    .join(" ");

  useEffect(() => {
    handleAsync(async () => {
      let a = await dispatch(acSynHanleAni({ a: 1 }));
      let result = unwrapResult(a);
      //   console.log(a);
    })();
  }, []);
  return <div className="mainContainer"></div>;
}

export default AnimeGender;
