import React from "react";
import SwiperCom from "../Swiper/Swiper";
import Card from "../Card/Card";
import { SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import slugify from "slugify";
import "./section.scss";
function Section(props) {
  const navigate = useNavigate();
  const handleNavigate = (gender) => {
    navigate(
      `/anime?gender=${slugify(gender, {
        replacement: "-",
        remove: undefined,
        lower: true,
        strict: false,
        locale: "vi",
        trim: true,
      })}`
    );
  };

  return (
    <>
      <section className={props.class}>
        {props?.class === "genderContainer" && (
          <button
            className="titleGender mySwiper"
            onClick={() => {
              handleNavigate(props.gender);
            }}
          >
            {props.gender}
          </button>
        )}
        {props?.class === "bannerContainer" && (
          <div className="mySwiper titleGender">Hôm nay xem gì </div>
        )}
        <SwiperCom data={props.data}>
          {props?.list.map((el, index) => (
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
