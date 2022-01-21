import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { handleGenerateYear, getGender } from "./../api/index";
export const handleAnimeSearchAsync = createAsyncThunk(
  "handleAnimeSearch/list",
  async (data, thunkAPI) => {
    let predat = thunkAPI.getState();
    console.log(predat);
    if (data.name === "Genders") {
      thunkAPI.dispatch(handleGenderSearch(data.dataSer));
    }
    if (data.name === "Year") {
      thunkAPI.dispatch(handleYearSearch(data.dataSer));
    }
    if (data.name === "Season") {
      thunkAPI.dispatch(handleSeasonSearch(data.dataSer));
    }
    if (data.name === "Format") {
      thunkAPI.dispatch(handleFormatSearch(data.dataSer));
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
    genres: [],
    year: [],
    season: [],
    format: [],
  },
  url: "https://api.aniapi.com/v1/anime?",
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
      state.dataSearch = { ...initialState.dataSearch };
    },
  },
  extraReducers: {
    [handleAnimeSearchAsync.fulfilled]: (state, action) => {},
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
} = animeSearchSlice.actions;
export default animeSearchSlice;
