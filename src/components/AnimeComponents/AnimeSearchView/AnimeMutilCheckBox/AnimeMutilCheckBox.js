import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import { useTheme } from "@mui/material/styles";
import { unwrapResult } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  handleAnimeSearchAsync,
  handleClearSearch,
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
  const navigate = useNavigate();
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setMyData(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    console.log(value);
  };
  const handleClear = () => {
    setMyData([]);
  };
  useEffect(() => {
    document
      .querySelector(".clearAll")
      .addEventListener("click", async function () {
        setMyData([]);
        // dispatch(handleClearSearch());
        navigate("/search");
      });

    (async () => {
      if (props.setname === "Genders") {
        let string = myData.join(",");

        let listAniSear = await dispatch(
          handleAnimeSearchAsync({
            dataSer: string,
            name: "Genders",
          })
        );
        let data = unwrapResult(listAniSear);
      }
      if (props.setname === "Year") {
        let string = myData.toString();

        let listAniSear = await dispatch(
          handleAnimeSearchAsync({ dataSer: string, name: "Year" })
        );
        let data = unwrapResult(listAniSear);
      }
      if (props.setname === "Season") {
        let string = myData.toString();

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
            dataSer: myData,
            name: "Format",
          })
        );
        let data = unwrapResult(listAniSear);
      }
    })();
  }, [myData]);
  return (
    <FormControl
      sx={{
        mr: 2,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "2px",
      }}
    >
      <InputLabel id={`multiple-label-${props.setname}`}>
        {props.setname}
      </InputLabel>
      <Select
        labelId={`multiple-label-${props.setname}`}
        id={`multiple-label-${props.setname}-name`}
        multiple={props.multiple}
        value={myData}
        onChange={handleChange}
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
          myData.toString()
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
        onClick={handleClear}
      />
    </FormControl>
  );
}
