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
