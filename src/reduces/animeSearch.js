import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  handleGenerateYear,
  getGender,
  listAnimeSearchApi,
} from "./../api/index";

export const handleAnimeSearchAsync = createAsyncThunk(
  "handleAnimeSearch/list",
  async (data, thunkAPI) => {
    let predat = thunkAPI.getState();
    console.log(predat);
    let url = thunkAPI.getState().mySearch.dataSearch.url;
    let gender = thunkAPI.getState().mySearch.dataSearch.genres;
    let format = thunkAPI.getState().mySearch.dataSearch.format;
    let year = thunkAPI.getState().mySearch.dataSearch.year;
    let season = thunkAPI.getState().mySearch.dataSearch.season;
    if (data.name === "Genders") {
      if (data.dataSer) {
        await thunkAPI.dispatch(handleGenderSearch(data.dataSer));
      }
      !data.dataSer &&
        gender &&
        (await thunkAPI.dispatch(handleReMoveSearchGender()));
    }
    if (data.name === "Year") {
      if (data.dataSer) {
        await thunkAPI.dispatch(handleYearSearch(data.dataSer));
      }
      !data.dataSer &&
        year &&
        (await thunkAPI.dispatch(handleReMoveSearchYear()));
    }
    if (data.name === "Season") {
      // console.log(data.dataSer);
      if (data.dataSer) {
        let trandatatonumber = initialState.data.season.indexOf(data.dataSer);
        console.log(trandatatonumber);
        await thunkAPI.dispatch(
          handleSeasonSearch(trandatatonumber.toString())
        );
      }
      !data.dataSer &&
        season &&
        (await thunkAPI.dispatch(handleReMoveSearchSeason()));
    }
    if (data.name === "Format") {
      // console.log(data.dataSer);
      if (data.dataSer.length > 0) {
        let arr = [];
        data.dataSer.forEach((element) => {
          let trandatatonumber = initialState.data.format.indexOf(element);
          arr.push(trandatatonumber);
        });
        let pointFormat = arr.join(",");

        await thunkAPI.dispatch(handleFormatSearch(pointFormat));
      }
      if (!data.dataSer || data.dataSer.length === 0) {
        format && (await thunkAPI.dispatch(handleRemoveSearchFormat()));
      }
    }

    console.log(predat);
  }
);
export const handleAnimeYearAndGendersAsync = createAsyncThunk(
  "handleAnimeYearAndGendersAsync/list",
  async (data, thunkAPI) => {
    let predat = thunkAPI.getState();

    let dataa = await Promise.all([getGender(), handleGenerateYear()]);
    // console.log(dataa);
    return dataa;
  }
);
export const handleListCurrentAnimeSearchWithPage = createAsyncThunk(
  "handleListCurrentAnimeSearchWithPage/list",
  async (data, thunkAPI) => {
    let predat = thunkAPI.getState();
    console.log(data);
    let dataSearchApi = await listAnimeSearchApi({
      url: data.url,
      page: data.page,
    });
    return dataSearchApi.data;
  }
);

const initialState = {
  data: {
    genres: [],
    year: [],
    season: ["WINTER", "SPRING", "SUMMER", "FALL", "UNKNOWN"],
    format: ["TV", "TV_SHORT", "MOVIE", "SPECIAL", "OVA", "ONA", "MUSIC"],
  },
  dataSearch: {
    title: "",
    genres: "",
    year: "",
    season: "",
    format: "",
    detailSearchData: {},
    url: "",
    // urlExamp:
    //   "https://api.aniapi.com/v1/anime?formats=0&year=1999&season=3&genres=Pirates,War,Cyborg&nsfw=true",

    urlDum: "https://api.aniapi.com/v1/anime?nsfw=true",
  },
  isFindData: false,
};

const animeSearchSlice = createSlice({
  name: "animeSearchSlice",
  initialState,
  reducers: {
    handleGenderSearch(state, action) {
      state.dataSearch.genres = action.payload;
    },
    handleYearSearch(state, action) {
      state.dataSearch.year = action.payload;
    },
    handleSeasonSearch(state, action) {
      state.dataSearch.season = action.payload;
    },
    handleFormatSearch(state, action) {
      state.dataSearch.format = action.payload;
    },
    handleClearDetailSearchData(state, action) {
      state.dataSearch.detailSearchData = {};
    },
    handleClearSearch(state) {
      state.dataSearch = { ...initialState.dataSearch };
    },
    handleReMoveSearchGender(state) {
      state.dataSearch.genres = "";
    },
    handleReMoveSearchYear(state) {
      state.dataSearch.year = "";
    },

    handleReMoveSearchSeason(state) {
      state.dataSearch.season = "";
    },
    handleRemoveSearchFormat(state) {
      state.dataSearch.format = "";
    },
    handleDetailSearchData(state, action) {
      state.dataSearch.detailSearchData = { ...action.payload };
      // state.dataSearch.detailSearchData["current_page"] = 1;
      state.isFindData = false;
    },
    resetPageValue(state, action) {
      state.dataSearch.detailSearchData["current_page"] = 1;
    },

    handleChangePageValue(state, action) {
      state.dataSearch.detailSearchData["current_page"] = action.payload;
    },

    handleChangePageValueIncre(state, action) {
      state.dataSearch.detailSearchData["current_page"] += 1;
    },
    handleChangePageValueDecre(state, action) {
      state.dataSearch.detailSearchData["current_page"] -= 1;
    },
    handleFinData(state) {
      state.isFindData = true;
    },
  },
  extraReducers: {
    [handleAnimeSearchAsync.fulfilled]: (state, action) => {
      state.isFindData = false;
      console.log(state.dataSearch);
      if (
        !state.dataSearch.gender &&
        !state.dataSearch.year &&
        !state.dataSearch.season &&
        !state.dataSearch.format
      ) {
        state.dataSearch.url = "";
        state.dataSearch.detailSearchData = {};
        // return;
      }
      let url = initialState.dataSearch.urlDum;
      if (state.dataSearch.genres) {
        url += `&genres=${state.dataSearch.genres}`;
      }
      if (state.dataSearch.year) {
        url += `&year=${state.dataSearch.year}`;
      }
      if (state.dataSearch.season) {
        url += `&season=${state.dataSearch.season}`;
      }
      if (state.dataSearch.format) {
        url += `&formats=${state.dataSearch.format}`;
      }
      if (url != initialState.dataSearch.urlDum) {
        state.dataSearch.url = url;
      } else {
        state.dataSearch.url = "";
      }
    },
    [handleAnimeSearchAsync.pending]: (state, action) => {
      state.isFindData = true;
    },
    [handleAnimeSearchAsync.rejected]: (state, action) => {
      state.isFindData = false;
    },

    //handleAnimeYearAndGendersAsync
    [handleAnimeYearAndGendersAsync.fulfilled]: (state, action) => {
      state.isFindData = false;
      let [gender, year] = action.payload;
      state.data.genres = [...gender];
      state.data.year = [...year];
      console.log(action.payload);
    },
    [handleAnimeYearAndGendersAsync.pending]: (state, action) => {
      state.isFindData = true;
    },
    [handleAnimeYearAndGendersAsync.rejected]: (state, action) => {
      state.isFindData = false;
    },
    //handleListCurrentAnimeSearchWithPage
    [handleListCurrentAnimeSearchWithPage.fulfilled]: (state, action) => {
      state.isFindData = false;
    },
    [handleListCurrentAnimeSearchWithPage.pending]: (state, action) => {
      state.isFindData = true;
    },
    [handleListCurrentAnimeSearchWithPage.rejected]: (state, action) => {
      state.isFindData = false;
    },
  },
});

export const {
  handleGenders,
  handleYear,
  handleGenderSearch,
  handleYearSearch,
  handleSeasonSearch,
  handleFormatSearch,
  handleClearSearch,
  handleReMoveSearchGender,
  handleReMoveSearchYear,
  handleReMoveSearchSeason,
  handleRemoveSearchFormat,
  handleDetailSearchData,
  handleChangePageValue,
  handleClearDetailSearchData,
  resetPageValue,
  handleChangePageValueIncre,
  handleChangePageValueDecre,
} = animeSearchSlice.actions;
export default animeSearchSlice;
