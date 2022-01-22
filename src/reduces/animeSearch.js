import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { handleGenerateYear, getGender } from "./../api/index";

export const handleAnimeSearchAsync = createAsyncThunk(
  "handleAnimeSearch/list",
  async (data, thunkAPI) => {
    let predat = thunkAPI.getState();
    console.log(predat);
    let url = thunkAPI.getState().mySearch.dataSearch.url;
    if (data.name === "Genders") {
      if (data.dataSer) {
        await thunkAPI.dispatch(handleGenderSearch(data.dataSer));
      }
      if (!data.dataSer) {
        await thunkAPI.dispatch(handleReMoveSearchGender());
      }
    }
    if (data.name === "Year") {
      if (data.dataSer) {
        await thunkAPI.dispatch(handleYearSearch(data.dataSer));
      }
      if (!data.dataSer) {
        await thunkAPI.dispatch(handleReMoveSearchYear());
      }
    }
    if (data.name === "Season") {
      // console.log(data.dataSer);
      if (data.dataSer) {
        let trandatatonumber = initialState.data.season.indexOf(data.dataSer);

        await thunkAPI.dispatch(handleSeasonSearch(trandatatonumber));
      }
      if (!data.dataSer) {
        await thunkAPI.dispatch(handleReMoveSearchSeason());
      }
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
        await thunkAPI.dispatch(handleRemoveSearchFormat());
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
    handleClearSearch(state, action) {
      state.dataSearch.detailSearchData = {
        ...initialState.dataSearch.detailSearchData,
      };
      state.dataSearch = {
        ...initialState.dataSearch,
      };

      state.dataSearch.url = "";
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
    },
    handleChangePageValue(state, action) {
      state.dataSearch.detailSearchData["current_page"] = action.payload;
    },
  },
  extraReducers: {
    [handleAnimeSearchAsync.fulfilled]: (state, action) => {
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
    [handleAnimeSearchAsync.pending]: (state, action) => {},
    [handleAnimeSearchAsync.rejected]: (state, action) => {},
    [handleAnimeYearAndGendersAsync.fulfilled]: (state, action) => {
      let [gender, year] = action.payload;
      state.data.genres = [...gender];
      state.data.year = [...year];
      console.log(action.payload);
    },
    [handleAnimeYearAndGendersAsync.pending]: (state, action) => {},
    [handleAnimeYearAndGendersAsync.rejected]: (state, action) => {},
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
} = animeSearchSlice.actions;
export default animeSearchSlice;
