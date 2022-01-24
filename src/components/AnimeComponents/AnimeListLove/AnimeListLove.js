import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import { hanleListAnimeWithArrayId } from "./../../../api/index";
import Card from "./../../Card/Card";
import neZuko from "./../../../utils/img/nezuko.png";
import { gsap } from "gsap";
import { CSSRulePlugin } from "gsap/CSSRulePlugin";
import "./animeListLove.scss";
gsap.registerPlugin(CSSRulePlugin);
const AnimeListLove = () => {
  const listLoveAnimeId = useSelector((state) => state.myUsers.users);
  let currentUser = useSelector((state) => state.myLogin?.data?.data?.user);
  // console.log(currentUser);
  const [animeLoveList, setanimeLoveList] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setanimeLoveList([]);
    }
    (async () => {
      try {
        if (token) {
          let decode = jwt_decode(token);
          let idUser = decode.id;

          let animeListLoveFilterWithId = listLoveAnimeId.filter(
            (el) => el.user._id === idUser
          );
          console.log(animeListLoveFilterWithId);
          let listId = animeListLoveFilterWithId[0]?.listLove
            ?.filter((el) => (el.id ? true : false))
            .map((el) => el.id);
          console.log(listId);
          let myDataListLove = await hanleListAnimeWithArrayId(listId);
          console.log(myDataListLove);
          setanimeLoveList(myDataListLove);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  useEffect(() => {
    window.scroll(0, 0);
    let tl = gsap.timeline();
    tl.to(".animateTag", {
      width: "100%",
    }).to(".animateTag", {
      autoAlpha: 0,
    });
    !currentUser &&
      (() => {
        // let rule = CSSRulePlugin.getRule(".myClass:before");

        // tl.to(".animateTag", {
        //   width: "100%",
        // })
        tl.to(".animateTag", {
          autoAlpha: 0,
        })

          .from(".listloveTitle", {
            yPercent: 100,
          })
          .from(".spanNot", {
            yPercent: 150,
          })
          .to(
            ".nezuko",
            {
              autoAlpha: 1,
            },
            "+=0.1"
          )
          .from(".chucmung", 0.1, {
            autoAlpha: 0,
          })
          .from(
            ".nammoi",
            {
              autoAlpha: 0,
            },
            "-=0.1"
          );
      })();
  }, [currentUser]);
  return (
    <div className="mainContainer genDerList listLovecontainer">
      <div style={{ overflow: "hidden" }}>
        <div
          className="listloveTitle"
          style={{ padding: "1rem", fontSize: 30 }}
        >
          List animes my Love
        </div>
      </div>
      <div className="animateTag"></div>
      {currentUser && animeLoveList.length > 0 && (
        <div className="containerListGenderImg listLoveanime">
          {animeLoveList.map((el, index) => (
            <Card key={index} data={el.data.data} />
          ))}
        </div>
      )}
      {currentUser && animeLoveList.length === 0 && (
        <div
          style={{
            fontSize: 25,
            display: "flex",
            flexDirection: "column",
            gap: "3rem",
          }}
        >
          <p style={{ overflow: "hidden" }}>
            <span className="nolist">
              List Của Bạn đang rỗng hãy add List đi nhé!!!
            </span>
          </p>
          <img
            style={{ width: "30%", alignSelf: "center" }}
            src={neZuko}
            alt="nezukoimg"
          />
        </div>
      )}
      {!currentUser && (
        <div
          style={{
            fontSize: 25,
            display: "flex",
            flexDirection: "column",
            gap: "3rem",
          }}
        >
          <p style={{ overflow: "hidden" }}>
            <span className="spanNot">
              Bạn chưa đăng nhập hãy đăng nhập để add list nhé!!!
            </span>
          </p>
          <div className="chucmung">Chúc mừng</div>
          <img
            className="nezuko"
            style={{ width: "30%", alignSelf: "center", opacity: 0 }}
            src={neZuko}
            alt="nezukoimg"
          />
          <div className="nammoi">Năm mới</div>
        </div>
      )}
    </div>
  );
};

export default AnimeListLove;
