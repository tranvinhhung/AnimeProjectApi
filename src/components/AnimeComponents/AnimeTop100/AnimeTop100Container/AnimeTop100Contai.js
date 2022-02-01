import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { handleAnimeTop } from "../../../../api/index";
import {
  handleHasMore,
  handleAnimeTopAsyncRedux,
  addAnimeTop,
} from "../../../../reduces/animeTop";
import "./AnimeTop100.scss";
import { unwrapResult } from "@reduxjs/toolkit";
import Card from "./../../../Card/Card";
import { gsap } from "gsap";
import { CSSPlugin } from "gsap/CSSPlugin";
import LoadingNew from "./../../../Loading/LoadingNew/LoadingNew";
gsap.registerPlugin(CSSPlugin);
const AnimeTop100Contai = () => {
  const top100aniHas = useSelector((state) => state.myAnimeTop.hasMore);
  const top100aniData = useSelector((state) => state.myAnimeTop?.data);
  const top100AniPage = useSelector((state) => state.myAnimeTop?.page);
  const dispatch = useDispatch();
  let tl = gsap.timeline();
  let fetchMoreData = async () => {
    try {
      if (top100aniData.length >= 100) {
        dispatch(handleHasMore());
        return;
      }
      let dataTop = await dispatch(handleAnimeTopAsyncRedux());
      let dataHanle = unwrapResult(dataTop);
      console.log(top100aniHas);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    window.scroll(0, 0);
    (async () => {
      try {
        let data = await handleAnimeTop({ page: top100AniPage });
        if (data) {
          dispatch(addAnimeTop(data.documents));
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  useEffect(() => {
    top100aniData &&
      (function () {
        tl.to(".cardConatiner", 0.4, {
          autoAlpha: 1,
          scale: 1,

          stagger: {
            from: "random",

            amount: 1.2,
          },
          ease: "Power3.easeOut",
        });
      })();
  }, [top100aniData]);
  return (
    <div className="mainContainer">
      <h1 className="top100Tile">Top 100 anime</h1>
      {top100aniData.length > 0 && (
        <InfiniteScroll
          dataLength={top100aniData?.length}
          next={fetchMoreData}
          hasMore={top100aniHas}
          loader={<LoadingNew isFindata={true} />}
        >
          <div className="top100animeConati">
            {top100aniData?.map((data, index) => (
              <div className="top100item" key={index}>
                <Card data={data} />
              </div>
            ))}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
};

export default AnimeTop100Contai;
