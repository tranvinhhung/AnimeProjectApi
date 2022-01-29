import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import { useTheme } from "@mui/material/styles";
import { unwrapResult } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { getGender } from "../../../../api";
import {
  handleAnimeSearchAsync,
  handleClearSearch,
  handleClearDetailSearchData,
  handleReMoveSearchGender,
  handleReMoveSearchYear,
  handleReMoveSearchSeason,
  handleRemoveSearchFormat,
} from "./../../../../reduces/animeSearch";
function getStyles(data, myDataList, theme) {
  return {
    fontWeight:
      myDataList.indexOf(data) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelect(props) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [myData, setMyData] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();
  let genres = useSelector((state) => state.mySearch.dataSearch?.genres);
  let year = useSelector((state) => state.mySearch.dataSearch?.year);
  let season = useSelector((state) => state.mySearch.dataSearch?.season);
  let format = useSelector((state) => state.mySearch.dataSearch?.format);
  let intialSeason = useSelector((state) => state.mySearch.data?.season);
  let intialFormat = useSelector((state) => state.mySearch.data?.format);
  const handleChange = async (event, name) => {
    const {
      target: { value },
    } = event;
    setMyData(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    console.log(value);
    try {
      if (name === "Genders") {
        let string = value.join(",");

        let listAniSear = await dispatch(
          handleAnimeSearchAsync({
            dataSer: string,
            name: "Genders",
          })
        );
        let data = unwrapResult(listAniSear);
      }
      if (props.setname === "Year") {
        let string = value.toString();

        let listAniSear = await dispatch(
          handleAnimeSearchAsync({ dataSer: string, name: "Year" })
        );
        let data = unwrapResult(listAniSear);
      }
      if (props.setname === "Season") {
        let string = value.toString();

        let listAniSear = await dispatch(
          handleAnimeSearchAsync({
            dataSer: string,
            name: "Season",
          })
        );
        let data = unwrapResult(listAniSear);
      }
      if (props.setname === "Format") {
        let listAniSear = await dispatch(
          handleAnimeSearchAsync({
            dataSer: typeof value === "string" ? value.split(",") : value,
            name: "Format",
          })
        );
        let data = unwrapResult(listAniSear);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleClear = (name) => {
    if (name === "Genders") {
      dispatch(handleAnimeSearchAsync({ name }));
      console.log(location);
      let arr = location.search.split("&");
      if (arr.length === 2) {
        navigate("/search");
        dispatch(handleClearDetailSearchData());
      }
      // if (arr.length > 2) {
      // }
    }
    if (name === "Year") {
      dispatch(handleAnimeSearchAsync({ name }));
      console.log(location);
      let arr = location.search.split("&");
      if (arr.length === 2) {
        navigate("/search");
        dispatch(handleClearDetailSearchData());
      }
    }
    if (name === "Season") {
      dispatch(handleAnimeSearchAsync({ name }));
      console.log(location);
      let arr = location.search.split("&");
      if (arr.length === 2) {
        navigate("/search");
        dispatch(handleClearDetailSearchData());
      }
    }
    if (name === "Format") {
      dispatch(handleAnimeSearchAsync({ name }));
      console.log(location);
      let arr = location.search.split("&");
      if (arr.length === 2) {
        navigate("/search");
        dispatch(handleClearDetailSearchData());
      }
    }
  };

  useEffect(() => {
    document.querySelector(".clearAll").addEventListener("click", function () {
      dispatch(handleClearDetailSearchData());
      navigate("/search");
    });
  }, [myData]);
  const checkValue = (name) => {
    if (name === "Year") {
      return year || "";
    }
    if (name === "Season") {
      if (!season) return "";
      console.log(season);
      let a = intialSeason.filter((el, index) => index == season);
      // return season.toString() || "";
      return a.toString();
    }
  };
  const checkValueMu = (name) => {
    let a = [];
    if (name === "Genders") {
      if (!genres) return [];
      if (genres) {
        let b = genres.split(",");

        return b;
      }
    }
    if (name === "Format") {
      if (!format) return [];
      if (format) {
        let b = format.split(",");
        let ray = [];
        for (let i = 0; i < b.length; i++) {
          console.log(b[i]);

          ray.push(intialFormat[b[i]]);
        }
        console.log(ray);
        return ray;
      }
    }
  };
  const handleCheckPropsValueHas = () => {};
  // console.log(checkValue("Genders"));
  return (
    <FormControl
      sx={{
        mr: 2,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "2px",
      }}
      size={window.screen.width < 500 ? "small" : "medium"}
      // fullWidth
    >
      <InputLabel id={`multiple-label-${props.setname}`}>
        {props.setname}
      </InputLabel>
      <Select
        labelId={`multiple-label-${props.setname}`}
        id={`multiple-label-${props.setname}-name`}
        multiple={props.multiple}
        value={
          props.multiple
            ? checkValueMu(props.setname)
            : checkValue(props.setname)
        }
        // value={myData}
        onChange={(e) => handleChange(e, props.setname)}
        input={
          <OutlinedInput
            sx={
              window.screen.width > 500
                ? { width: 100, height: 40 }
                : { width: 50, height: 20 }
            }
            label={props.setname}
          />
        }
        defaultValue=""
      >
        {props.datas.map((data, index) => (
          <MenuItem
            key={index}
            value={data}
            defaultValue=""
            style={
              typeof myData === "object" ? getStyles(data, myData, theme) : {}
            }
          >
            {data}
          </MenuItem>
        ))}
      </Select>
      <HighlightOffOutlinedIcon
        style={
          // handleCheckPropsValueHas(123)
          true
            ? {
                opacity: 1,
                width: "2rem",
                height: "2rem",
                visibility: "visible",
              }
            : {
                opacity: 0,
                width: "2rem",
                height: "2rem",
                visibility: "hidden",
              }
        }
        onClick={() => handleClear(props.setname)}
      />
    </FormControl>
  );
}
