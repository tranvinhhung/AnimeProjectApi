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
  console.log(arrayList);
  return arrayList;
};
export const handerCollection = async (sesionid) => {};
