import React, { useEffect, useState } from "react";
// import Swiper core and required modules
// Import Swiper styles
import { useNavigate } from "react-router-dom";
import Collection from "../../Collections/CollectionContai/CollectionConta";
import Loading from "../../Loading";
import Section from "../../Section/Section";
import { handerAnime } from "../../../api/handleData";
import { handleAnimeTop } from "../../../api/index";
import "./home.scss";

function Home() {
  // const [loading, setLoading] = useState(true);
  // const [coverList, setcoverList] = useState([]);
  // const [listGender, setListGender] = useState([]);
  // const navigate = useNavigate();

  // const handleNavigateTop100 = () => {
  //   navigate("/top-100-anime");
  // };

  // useEffect(() => {
  //   document.title = "Home";
  //   (async () => {
  //     window.scrollTo(0, 0);
  //     setLoading(true);
  //     // let reponse = await getAnimeRamdom(6);
  //     // let animeGender = await handerAnime();
  //     // console.log(animeGender);
  //     let allArrHandle = await Promise.all([
  //       // getAnimeRamdom(10),
  //       handleAnimeTop({ per_page: 20, page: 1 }),
  //       handerAnime(4),
  //     ]);
  //     // console.log(allArrHandle);
  //     let [arr, listGender] = allArrHandle;

  //     setcoverList(arr?.documents);
  //     // setListGender(listGenderr);
  //     setLoading(false);
  //   })();
  // }, []);

  useEffect(() => {});

  return (
    <>
      {/* <Header /> */}
      <main className="mainContainer">
        {/* {loading && <Loading />} */}
        {/* {!loading && (
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
            <section
              className="genderContainer top100wrap"
              onClick={handleNavigateTop100}
            >
              top 100 anime
              <figure>
                <img
                  src="https://3.bp.blogspot.com/-yKT-n-nCbrU/WmCm8PV95rI/AAAAAAAAtzA/ChnCm_9XXYM8kjxpkaBfRRnkto-TSDuvQCEwYBhgL/s1600/hinh-nen-may-tinh-anime-de-thuong-6.jpg"
                  alt=""
                />
              </figure>
            </section>
          </>
        )} */}
        12313
      </main>
      {/* <Footer /> */}
    </>
  );
}

export default Home;
