import React, { useEffect, useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import AnimeMutilCheckBox from "./../AnimeMutilCheckBox/AnimeMutilCheckBox";
import { getGender } from "./../../../../api/index";
import {
  handleGenders,
  handleYear,
  handleGenderSearch,
  handleYearSearch,
  handleSeasonSearch,
  handleFormatSearch,
  handleAnimeYearAndGendersAsync,
} from "./../../../../reduces/animeSearch";
import Button from "@mui/material/Button";
import { unwrapResult } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import AnimeSearchRender from "./../AnimeSearchRender/AnimeSearchRender";
import Card from "./../../../Card/Card";
import DeleteIcon from "@mui/icons-material/Delete";
const AnimeSearchContainer = (props) => {
  let data = [1, 2, 3];
  const dispatch = useDispatch();
  let genres = useSelector((state) => state.mySearch.data?.genres);
  let years = useSelector((state) => state.mySearch.data?.year);
  let season = useSelector((state) => state.mySearch.data?.season);
  let format = useSelector((state) => state.mySearch.data?.format);
  // const [genderyearDum, setGenderYearDum] = useState([]);

  // const handleClearAll = () => {};

  useEffect(() => {
    (async () => {
      try {
        let dataa = await dispatch(handleAnimeYearAndGendersAsync());
        let dataa2 = unwrapResult(dataa);
        // const [gender, years] = dataa2;

        // setGenderYearDum([gender, years]);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  return (
    <div className="mainContainer " style={{ margin: "7rem 3rem 0" }}>
      {genres.length > 0 && years.length > 0 && (
        <>
          <FormGroup
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <FormControlLabel
              control={
                <AnimeMutilCheckBox
                  datas={genres}
                  multiple={true}
                  setname="Genders"
                />
              }
              label={false}
            />

            <FormControlLabel
              control={
                <AnimeMutilCheckBox
                  datas={years}
                  multiple={false}
                  setname="Year"
                />
              }
              label={false}
            />

            <FormControlLabel
              control={
                <AnimeMutilCheckBox
                  datas={season}
                  multiple={false}
                  setname="Season"
                />
              }
              label={false}
            />
            <FormControlLabel
              control={
                <AnimeMutilCheckBox
                  datas={format}
                  multiple={true}
                  setname="Format"
                />
              }
              label={false}
            />
            <Button
              size="small"
              endIcon={<DeleteIcon />}
              variant="contained"
              className="clearAll"
              sx={{
                width: "100px !important",
              }}
            >
              ClearAll
            </Button>
          </FormGroup>

          <div className="mainContainer genDerList" style={{ margin: "0" }}>
            <AnimeSearchRender />
          </div>
        </>
      )}
      {/* <AnimeMutilCheckBox /> */}
    </div>
  );
};

export default AnimeSearchContainer;
