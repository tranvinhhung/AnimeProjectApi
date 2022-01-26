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
  resetPageValue,
} from "./../../../../reduces/animeSearch";
import Button from "@mui/material/Button";
import { unwrapResult } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import AnimeSearchRender from "./../AnimeSearchRender/AnimeSearchRender";
import Card from "./../../../Card/Card";
import DeleteIcon from "@mui/icons-material/Delete";
import LoadingNew from "../../../Loading/LoadingNew/LoadingNew";
import Container from "@mui/material/Container";
const AnimeSearchContainer = (props) => {
  let data = [1, 2, 3];
  const dispatch = useDispatch();
  let genres = useSelector((state) => state.mySearch.data?.genres);
  let years = useSelector((state) => state.mySearch.data?.year);
  let season = useSelector((state) => state.mySearch.data?.season);
  let format = useSelector((state) => state.mySearch.data?.format);
  // const [genderyearDum, setGenderYearDum] = useState([]);
  let finData = useSelector((state) => state.mySearch.isFindData);
  // const handleClearAll = () => {};

  useEffect(() => {
    window.scroll(0, 0);
    (async () => {
      try {
        dispatch(resetPageValue());
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
    <div
      className="mainContainer "
      style={window.screen.width > 500 ? { margin: "7rem 3rem 0" } : {}}
    >
      {genres.length > 0 && years.length > 0 && (
        <>
          <Container>
            <FormGroup
              row={true}
              sx={{ m: 2, display: "flex", alignItems: "center" }}
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
              <FormControlLabel
                control={
                  <Button
                    size="small"
                    endIcon={<DeleteIcon />}
                    variant="contained"
                    className="clearAll"
                  >
                    Clear All
                  </Button>
                }
                label={false}
              />
            </FormGroup>
          </Container>

          <div className="mainContainer genDerList" style={{ margin: "0" }}>
            <AnimeSearchRender />

            <LoadingNew isFindata={finData} />
          </div>
        </>
      )}
      {/* <AnimeMutilCheckBox /> */}
    </div>
  );
};

export default AnimeSearchContainer;
