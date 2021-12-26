import { RepeatOneSharp } from "@material-ui/icons";
import axios from "axios";
import base from "./base";
export const getAnimeRamdom = (countRamdom) => {
  return axios.get(`${base.baseUrl}/random/anime/${countRamdom}/false
  `);
};
export const getAnimeWidthId = (idAnime) => {
  return axios.get(`${base.baseUrl}/anime/${idAnime}`);
};
export const songWidthId = (id) => {
  return axios.get(`${base.baseUrl}/song/${id}`);
};

export const getGender = async () => {
  let reponse = await axios.get(`https://api.aniapi.com/v1/resources/1.0/0`);
  let data = reponse.data.data.genres;
  return data;
};
(async () => {
  let arrayGender = await getGender();
})();
export const ramdomValueArrayGender = async (myArr, soLantaoRamdom) => {
  let vitualarr = [];
  for (let i = 0; i < soLantaoRamdom; i++) {
    let num = Math.floor(Math.random() * (myArr.length - i)) + i;
    vitualarr.push(myArr[num]);
  }
  let mainArr = [...new Set(vitualarr)];
  if (mainArr.length === soLantaoRamdom && mainArr != undefined) return mainArr;
  if (mainArr.length < soLantaoRamdom) {
    ramdomValueArrayGender(myArr, soLantaoRamdom);
  }
};
export const listAnimeWithGender = async (gender, per_page = 8, page = 1) => {
  let arr = await axios.get(
    `https://api.aniapi.com/v1/anime?genres=${gender}&nsfw=false&per_page=${per_page}&page=${page}`
  );
  let data = arr.data.data;
  return data;
};

// setInterval(function () {
//   (async () => {
//     let b = await ramdomValueArray([1, 2, 3, 4, 5, 6, 7, 8], 3);
//     if (b) console.log(b);
//   })();
// }, 1500);
