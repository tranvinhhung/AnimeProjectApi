import React from "react";
import SwiperCom from "../../SwiperCom/SwiperCom";
import { SwiperSlide } from "swiper/react";
import ColectionCard from "../CollectionCard/ColectionCard";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "./collectionContai.scss";
function Collection(props) {
  return (
    <div className=" collection">
      <div className="titlecolec container">
        Bộ sưu tập <ArrowForwardIosIcon />
      </div>
      <SwiperCom
        data2={{ centeredSlides: false, slidesPerView: 4, slidesPerGroup: 1 }}
      >
        {props.list?.map((el, index) => (
          <SwiperSlide key={index}>
            <ColectionCard seasonId={el} />
          </SwiperSlide>
        ))}
      </SwiperCom>
    </div>
  );
}

export default Collection;
