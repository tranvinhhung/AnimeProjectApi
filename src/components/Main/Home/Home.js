import React, { useEffect, useState } from "react";
// import Swiper core and required modules
// Import Swiper styles
import { SwiperSlide } from "swiper/react";
import { handleAsync } from "../../Error/Error";
import Loading from "../../Loading";
import SwiperCom from "../../Swiper/Swiper";
import {
  getAnimeRamdom,
  getGender,
  ramdomValueArrayGender,
  listAnimeWithGender,
} from "./../../../api/index";
import { handerAnime } from "./../../../api/handleData";
import Card from "../../Card/Card";
import Section from "../../Section/Section";
import "./home.scss";

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
function Home() {
  const [loading, setLoading] = useState(true);
  const [coverList, setcoverList] = useState([]);
  const [listGender, setListGender] = useState([]);
  useEffect(() => {
    handleAsync(async () => {
      window.scrollTo(0, 0);
      setLoading(true);
      // let reponse = await getAnimeRamdom(6);
      // let animeGender = await handerAnime();
      // console.log(animeGender);
      let allArrHandle = await Promise.all([getAnimeRamdom(6), handerAnime(3)]);
      let [arr, listGender] = allArrHandle;
      let arrr = await arr.data.data;
      setLoading(false);
      setcoverList(arrr);
      setListGender(listGender);
    })();
  }, []);
  return (
    <main className="mainContainer">
      {loading && <Loading />}
      {!loading && (
        <>
          <Section
            list={coverList}
            class="bannerContainer"
            data={data}
            lop="banner"
          ></Section>
          {listGender?.map((el, index) => (
            <Section
              key={index}
              gender={el.gender}
              list={el.documents}
              classs="genderContainer"
              data={{ ...data, slidesPerView: 5 }}
              lop="gender"
            ></Section>
          ))}
        </>
      )}
    </main>
  );
}

export default Home;
