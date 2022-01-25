import React, { useEffect } from "react";
import PopoverItem from "./../../../Popover/PopoverItem/PopoverItem";
import { handleChangeDay } from "./../../../../api/handleData";
import "./AnimeInfor.scss";
const AnimeInforContainer = (props) => {
  // const handleChangeDay = (date) => {
  //   let day = new Date(date);
  //   const options = {
  //     hour: "2-digit",
  //     minute: "numeric",
  //     day: "numeric",
  //     month: "long",
  //     year: "numeric",
  //     weekday: "short",
  //     //   dateStyle: "short",
  //   };

  //   let a = new Intl.DateTimeFormat("en-US", options).format(day);
  //   let b = a.replaceAll(",", " ");
  //   console.log(b);
  //   return b;
  // };

  const handleEnum = (numberr) => {
    if (numberr === 0) {
      return <span>TV</span>;
    }
    if (numberr === 1) {
      return <span>TV SHORT</span>;
    }
    if (numberr === 2) {
      return <span>MOVIE</span>;
    }
    if (numberr === 3) {
      return <span>SPECIAL</span>;
    }
    if (numberr === 4) {
      return <span>OVA</span>;
    }
    if (numberr === 5) {
      return <span>ONA</span>;
    }
    if (numberr === 6) {
      return <span>MUSIC</span>;
    }
  };
  const handleSeasonPeriod = (number) => {
    if (number === 0) return <span>Winter</span>;
    if (number === 1) return <span>SPRING</span>;
    if (number === 2) return <span>SUMMER</span>;
    if (number === 3) return <span>FALL</span>;
    if (number === 4) return <span>UNKNOW</span>;
  };
  console.log(props.dataIn);

  return (
    <ul className="animeInforList">
      <li>{`Ani.Start Date:${handleChangeDay(props.dataIn["start_date"])}`}</li>
      <li>{`Ani.End Date:${handleChangeDay(props.dataIn["end_date"])}`}</li>
      <li>
        {props.dataIn.score > 0
          ? `Score:${props.dataIn.score}`
          : `No inforScore~~`}
      </li>
      <li>Format:{handleEnum(props.dataIn["format"])}</li>
      <li>{`Episodes:${props.dataIn["episodes_count"]} `}</li>
      <li>Season Period:{handleSeasonPeriod(props.dataIn["season_period"])}</li>
      <li>
        <span>Gender</span>
        <ul>
          {props.dataIn.genres.map((el, index) => {
            if (index >= 5) return;
            if (el) {
              return (
                <PopoverItem
                  key={index}
                  isStyle={props.dataIn?.["cover_color"]}
                  gender={el}
                />
              );
            }
          })}
        </ul>
      </li>
    </ul>
  );
};

export default AnimeInforContainer;
