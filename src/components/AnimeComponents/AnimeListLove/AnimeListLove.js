import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import { hanleListAnimeWithArrayId } from "./../../../api/index";
import Card from "./../../Card/Card";
import neZuko from "./../../../utils/img/nezuko.png";
const AnimeListLove = () => {
  const listLoveAnimeId = useSelector((state) => state.myUsers.users);
  const [animeLoveList, setanimeLoveList] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
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
  }, [listLoveAnimeId]);
  return (
    <div className="mainContainer genDerList">
      <div style={{ padding: "1rem", fontSize: 30 }}>List animes my Love</div>
      {animeLoveList.length === 0 && (
        <div
          style={{
            fontSize: 25,
            display: "flex",
            flexDirection: "column",
            gap: "3rem",
          }}
        >
          Bạn chưa đăng nhập hãy đăng nhập để add list nhé!!!
          <img
            style={{ width: "30%", alignSelf: "center" }}
            src={neZuko}
            alt="nezukoimg"
          />
        </div>
      )}
      {animeLoveList && (
        <div className="containerListGenderImg">
          {animeLoveList.map((el, index) => (
            <Card key={index} data={el.data.data} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AnimeListLove;
