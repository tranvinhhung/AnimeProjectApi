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
import "./index.scss";

function Home() {
  const [loading, setLoading] = useState(true);
  const [coverList, setcoverList] = useState([]);
  const [listGender, setListGender] = useState([]);
  const data = {
    slidesPerView: 4,
    spaceBetween: 20,
    centeredSlides: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: true,
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
  useEffect(() => {
    handleAsync(async () => {
      setLoading(true);
      // let reponse = await getAnimeRamdom(6);
      // let animeGender = await handerAnime();
      // console.log(animeGender);
      let allArrHandle = await Promise.all([getAnimeRamdom(6), handerAnime(3)]);
      let [arr, listGender] = allArrHandle;
      let arrr = arr.data.data;

      console.log(allArrHandle);

      console.log(listGender);
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
          {listGender.map((el, index) => (
            <Section
              key={index}
              gender={el.gender}
              list={el.documents}
              class="genderContainer"
              data={{ ...data, slidesPerView: 5 }}
              lop="gender"
            ></Section>
          ))}

          {/* {1 && (
          //   <section className="genderContainer">
          //     {2 && (
          //       <SwiperCom data={{ ...data, slidesPerView: 5 }}>
          //         {coverList.map((el, index) => (
          //           <SwiperSlide key={index}>
          //             <Card
          //               lop="gender"
          //               key={index}
          //               data={el}
          //               handleClick={el}
          //             />
          //           </SwiperSlide>
          //         ))}
          //       </SwiperCom>
          //     )}
          //   </section>
          // )} */}
        </>
      )}
    </main>
  );
}

export default Home;
