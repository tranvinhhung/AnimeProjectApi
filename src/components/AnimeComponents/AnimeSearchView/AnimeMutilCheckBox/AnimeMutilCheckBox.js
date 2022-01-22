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
    document.querySelector(".clearAll").addEventListener("click", function () {
      setMyData([]);
      dispatch(handleClearSearch());
    });

    (async () => {
      if (props.setname === "Genders") {
        let listAniSear = await dispatch(
          handleAnimeSearchAsync({ dataSer: myData.join(","), name: "Genders" })
        );
        let data = unwrapResult(listAniSear);
      }
      if (props.setname === "Year") {
        let listAniSear = await dispatch(
          handleAnimeSearchAsync({ dataSer: myData.toString(), name: "Year" })
        );
        let data = unwrapResult(listAniSear);
      }
      if (props.setname === "Season") {
        let listAniSear = await dispatch(
          handleAnimeSearchAsync({ dataSer: myData.toString(), name: "Season" })
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
        m: 5,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "1rem",
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
        input={<OutlinedInput style={{ width: 150 }} label={props.setname} />}
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
            ? { opacity: 1, width: "2rem", height: "2rem" }
            : { opacity: 0, width: "2rem", height: "2rem" }
        }
        onClick={handleClear}
      />
    </FormControl>
  );
}
