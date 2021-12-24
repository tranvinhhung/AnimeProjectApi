import React, { useEffect, useState } from "react";
// import Swiper core and required modules
// Import Swiper styles
import { SwiperSlide } from "swiper/react";
import AnimePlay from "../../AnimePlay/AnimePlay";
import { handleAsync } from "../../Error/Error";
import Loading from "../../Loading";
import SwiperCom from "../../Swiper/Swiper";
import { handerData } from "./../../../api/handleData";
import { getAnimeRamdom } from "./../../../api/index";
import Banner from "./../../Banner/Banner";
import "./index.scss";

function Home() {
  const [loading, setLoading] = useState(true);
  const [coverList, setcoverList] = useState([]);
  useEffect(() => {
    handleAsync(async () => {
      setLoading(true);
      let reponse = await getAnimeRamdom(6);

      let arr = reponse.data.data;

      console.log(arr);
      setLoading(false);
      setcoverList(arr);
    })();
  }, []);
  return (
    <main className="mainContainer">
      {loading && <Loading />}
      {!loading && (
        <SwiperCom>
          {coverList.map((el, index) => (
            <SwiperSlide key={index}>
              <Banner key={index} data={el} handleClick={el} />
            </SwiperSlide>
          ))}
        </SwiperCom>
      )}
    </main>
  );
}

export default Home;
