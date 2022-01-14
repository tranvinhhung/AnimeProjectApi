import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import { hanleListAnimeWithArrayId } from "./../../../api/index";
const AnimeListLove = () => {
  const listLoveAnimeId = useSelector((state) => state.myUsers.users);
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
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  return <div></div>;
};

export default AnimeListLove;
