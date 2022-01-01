import React from "react";
import SwiperCom from "../SwiperCom/SwiperCom";
import Card from "../Card/Card";
import { SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import slugify from "slugify";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
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
          <div onClick={handleToDayWatch} className="mySwiper titleGender">
            Hôm nay xem gì <ArrowForwardIosIcon />
          </div>
        )}
        <SwiperCom data2={props.data}>
          {props.list.map((el, index) => (
            <SwiperSlide key={index}>
              <Card key={index} lop={props.lop} data={el} />
            </SwiperSlide>
          ))}
        </SwiperCom>
      </section>
    </>
  );
}

export default Section;
