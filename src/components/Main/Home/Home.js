import React, { useEffect, useState } from "react";
// import Swiper core and required modules
// Import Swiper styles
import { SwiperSlide } from "swiper/react";
import { handleAsync } from "../../Error/Error";
import Loading from "../../Loading";
import SwiperCom from "../../SwiperCom/SwiperCom";
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
import Collection from "../../Collections/CollectionContai/CollectionConta";
import { useNavigate } from "react-router-dom";
function Home() {
  const [loading, setLoading] = useState(true);
  const [coverList, setcoverList] = useState([]);
  const [listGender, setListGender] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      window.scrollTo(0, 0);
      setLoading(true);
      // let reponse = await getAnimeRamdom(6);
      // let animeGender = await handerAnime();
      // console.log(animeGender);
      let allArrHandle = await Promise.all([
        getAnimeRamdom(10),
        handerAnime(4),
      ]);
      // console.log(allArrHandle);
      let [arr, listGender] = allArrHandle;
      let arrr = await arr.data.data;

      // console.log(arrr);

      let listGenderr = listGender.filter((el) => el["status_code"] === 200);

      setcoverList(arrr);
      setListGender(listGenderr);
      setLoading(false);
    })();
  }, []);
  useEffect(() => {});
  const handleNavigateTop100 = () => {
    navigate("/top-100-anime");
  };
  return (
    <>
      {/* <Header /> */}
      <main className="mainContainer">
        {loading && <Loading />}
        {!loading && (
          <>
            <Section
              list={coverList}
              classs="bannerContainer"
              data={{}}
              lop="banner"
            ></Section>
            {listGender?.map((el, index) => (
              <Section
                key={index}
                gender={el.gender}
                list={el.data.documents}
                classs="genderContainer"
                data={{ slidesPerView: 5 }}
                lop="gender"
              ></Section>
            ))}

            <Collection list={[0, 1, 2, 3, 4]} />
            <div onClick={handleNavigateTop100}>top 100 anime</div>
          </>
        )}
      </main>
      {/* <Footer /> */}
    </>
  );
}

export default Home;
