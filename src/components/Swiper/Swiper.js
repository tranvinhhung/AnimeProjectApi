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
  console.log(props.data2);
  const data = {
    slidesPerView: 4,
    spaceBetween: 20,
    centeredSlides: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    pagination: {
      clickable: true,
      dynamicBullets: true,
    },
    slidesPerGroup: 2,
    loop: true,
    loopFillGroupWithBlank: true,
    navigation: true,
    lazy: true,
  };
  const {
    slidesPerView,
    spaceBetween,
    centeredSlides,
    autoplay: { delay, disableOnInteraction },
    pagination: { clickable, dynamicBullets },
    slidesPerGroup,
    loop,
    loopFillGroupWithBlank,
    navigation,
    lazy,
  } = { ...data, ...props.data2 };
  return (
    <Swiper
      slidesPerView={slidesPerView}
      spaceBetween={spaceBetween}
      centeredSlides={centeredSlides}
      autoplay={{
        delay: delay,
        disableOnInteraction: disableOnInteraction,
      }}
      pagination={{
        clickable: clickable,
        dynamicBullets: dynamicBullets,
      }}
      slidesPerGroup={slidesPerGroup}
      loop={loop}
      loopFillGroupWithBlank={loopFillGroupWithBlank}
      navigation={navigation}
      className="mySwiper"
      lazy={lazy}
    >
      {props.children}
    </Swiper>
  );
};

export default SwiperCom;
