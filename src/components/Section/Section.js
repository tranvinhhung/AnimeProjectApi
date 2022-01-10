import React, { useState, useEffect } from "react";
import SwiperCom from "../SwiperCom/SwiperCom";
import Card from "../Card/Card";
import { SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import slugify from "slugify";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import "./section.scss";
function Section(props) {
  const navigate = useNavigate();
  const handleNavigate = (gender) => {
    navigate(
      `/gender?name=${slugify(gender, {
        replacement: "-",
        remove: undefined,
        lower: true,
        strict: false,
        locale: "vi",
        trim: true,
      })}&trang=1`,
      { state: { gender: gender } }
    );
  };
  const handleToDayWatch = () => {
    navigate("/anime-today-can-watch");
  };
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    if (darkMode) {
      document.querySelector(".App").classList.add("darkMode");
    } else {
      document.querySelector(".App").classList.remove("darkMode");
    }
  }, [darkMode]);

  return (
    <>
      <section className={props.classs}>
        {props?.classs === "genderContainer" && (
          <button
            className="titleGender mySwiper"
            onClick={() => {
              handleNavigate(props.gender);
            }}
          >
            {props.gender}
            <ArrowForwardIosIcon />
          </button>
        )}
        {props?.classs === "bannerContainer" && (
          <div className="mySwiper titleGender">
            <span onClick={handleToDayWatch}>
              Hôm nay xem gì <ArrowForwardIosIcon />
            </span>
            <div
              style={{
                width: 50,

                marginLeft: "auto",
                textAlign: "end",
                position: "relative",
                zIndex: "2",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => setDarkMode(!darkMode)}
            >
              {!darkMode && <Brightness4Icon />}
              {darkMode && <DarkModeIcon />}
            </div>
          </div>
        )}
        <SwiperCom data2={props.data}>
          {props.list.map((el, index) => (
            <SwiperSlide key={index}>
              <Card lop={props.lop} data={el} />
            </SwiperSlide>
          ))}
        </SwiperCom>
      </section>
    </>
  );
}

export default Section;
