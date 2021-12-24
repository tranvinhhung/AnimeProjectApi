import React from "react";
import SwiperCore, {
  Autoplay,
  EffectFade,
  Lazy,
  Navigation,
  Pagination,
} from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/lazy";
import "swiper/css/effect-creative";
import "swiper/css/navigation";
import "swiper/css/pagination";
// Import Swiper React components
import { Swiper } from "swiper/react";

SwiperCore.use([Lazy, Autoplay, Pagination, Navigation, EffectFade]);

const SwiperCom = (props) => {
  return (
    <Swiper
      slidesPerView={3}
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 1500,
        disableOnInteraction: true,
      }}
      pagination={{
        clickable: true,
        dynamicBullets: true,
      }}
      slidesPerGroup={2}
      loop={true}
      loopFillGroupWithBlank={true}
      navigation={true}
      className="mySwiper"
      lazy={true}
    >
      {props.children}
    </Swiper>
  );
};

export default SwiperCom;
