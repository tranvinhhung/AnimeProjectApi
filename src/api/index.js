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
  let data = reponse?.data?.data?.genres;
  return data;
};

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
export const listAnimeWithGender = async (gender, per_page = 20, page = 1) => {
  let arr = await axios.get(
    `https://api.aniapi.com/v1/anime?genres=${gender}&nsfw=false&per_page=${per_page}&page=${page}`
  );
  let data = arr?.data;
  // console.log(data);
  return data;
};

export const listAnimeEpisole = async (idani) => {
  let arr = await axios.get(
    `https://api.aniapi.com/v1/episode?anime_id=${idani}&source=dreamsub&locale=it`
  );
  let data = arr?.data?.data;
  return data;
};
export const listAnimeEpisoleToday = async ({ perPage = 21, page = 1 }) => {
  // let width = window.screen.width;

  // if (width < 500) perPage = 9;
  let arr = await axios.get(
    `https://api.aniapi.com/v1/episode?number=1&per_page=${perPage}&page=${page}&is_dub=true&locale=it`
  );
  let data = arr?.data?.data;
  return data;
};

export const handleListEpisodeWitdID = async ({
  id,
  page = 1,
  perPage = 32,
}) => {
  let list = await axios.get(
    `https://api.aniapi.com/v1/episode?anime_id=${id}&is_dub=true&locale=it&page=${page}&per_page=${perPage}`
  );
  let myData = await list?.data?.data;
  return myData;
};
export const handlePromis = (fc, arr) => {
  return arr.map((el) => {
    return fc(el);
  });
};

// export const handleListEpisodeWitdID = async ({
//   id,
//   page = 1,
//   perPage = 32,
// }) => {
//   let list = await axios.get(
//     `https://api.aniapi.com/v1/episode?anime_id=${id}&source=gogoanime_dub&locale=en&page=${page}&per_page=${perPage}`
//   );
//   let myData = await list?.data?.data;
//   return myData;
// };
export const hanleListAnimeWithArrayId = async (arrId) => {
  const allAnime = await Promise.all([
    ...(await handlePromis(getAnimeWidthId, arrId)),
  ]);
  return allAnime;
};
export const handleGenerateYear = () => {
  let year = [];
  let day = new Date();
  let yearNow = day.getFullYear();
  console.log(yearNow);
  for (let i = yearNow; i >= 1940; i--) {
    year.push(i);
  }
  console.log(year);
  return year;
};
export const listAnimeSearchApi = async ({ url, page = 1, per_page = 21 }) => {
  // let width = window.screen.width;
  // console.log(width);
  // if (width < 500) per_page = 9;
  let arr = await axios.get(`${url}&per_page=${per_page}&page=${page}`);
  let data = arr?.data;
  // console.log(data);
  return data;
};
export const handleAnimeTop = async ({ per_page = 20, page }) => {
  let arr = await axios.get(
    `https://api.aniapi.com/v1/anime?sort_fields=score&sort_directions=-1&per_page=${per_page}&page=${page}`
  );
  let data = arr?.data.data;
  // console.log(data);
  return data;
};

export const handleAnimeEpisodeWithQuantity = async ({ id, number }) => {
  let list = await axios.get(
    `https://api.aniapi.com/v1/episode?anime_id=${id}&number=${number}&is_dub=false&locale=it`
  );
  let myData = await list?.data?.data;
  return myData;
};
