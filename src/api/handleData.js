import {
  getGender,
  ramdomValueArrayGender,
  listAnimeWithGender,
} from "./index";
export const handerData = (data) => {
  let array = data.map((el) => {
    let relaship = el.relationships.map((el) =>
      el.type === "manga" ? el.id : ""
    );
    let id = relaship.join("");
    return {
      id,
      fileName: el.attributes.fileName,
    };
  });
  return array;
};
export const handerAnime = async (count) => {
  let arrayList = [];
  let reponseAnimeList = await getGender();
  let ramdomGender = await ramdomValueArrayGender(reponseAnimeList, count);
  for (let i = 0; i < ramdomGender.length; i++) {
    let ray = await listAnimeWithGender(ramdomGender[i]);
    if (ray["status_code"] === 200) {
      arrayList.push({ ...ray, gender: ramdomGender[i] });
    }
  }
  // console.log(arrayList);
  return arrayList;
};
export const handerCollection = async (sesionid) => {};

export const handleChangeDay = (date) => {
  let day = new Date(date);
  const options = {
    hour: "2-digit",
    minute: "numeric",
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "short",
    //   dateStyle: "short",
  };

  let a = new Intl.DateTimeFormat("en-US", options).format(day);
  let b = a.replaceAll(",", " ");
  console.log(b);
  return b;
};
export const scrollToTopWhenCheck = (width) => {
  return window.screen.width < width ? window.scroll(0, 0) : null;
};
