import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAnimeWidthId,
  handlePromis,
  hanleListAnimeWithArrayId,
} from "./../api/index";
export const handleAnimeWatchToday = createAsyncThunk(
  "animeTodayWatch/list",
  async (data, thunkAPI) => {
    let predat = thunkAPI;
    console.log(predat);
    //cach 1
    // const allAnime = await Promise.all([
    //   ...(await handlePromis(getAnimeWidthId, data)),
    // ]);
    // return allAnime;
    // cach2
    let allAnime = await hanleListAnimeWithArrayId(data);
    return allAnime;
  }
);

const initialState = {
  data: [],

  isFindData: false,
};

const animeWatchTodaySlice = createSlice({
  name: "animeWatchTodaySlice",
  initialState,
  reducers: {
    getListTodayWatch(state, action) {
      state.data = action.payload;
      state.isFindData = true;
    },
    resetListTodayWatch(state, action) {
      return initialState;
    },
    notFoundListTodayWatch(state) {
      return initialState;
    },
  },
  extraReducers: {
    [handleAnimeWatchToday.fulfilled]: (state, action) => {
      if (action.payload) {
        state.data = [...action.payload];
        state.isFindData = false;
      } else {
        // state = initialState;
        // state.foundData = false;
        return initialState;
      }
    },
    [handleAnimeWatchToday.pending]: (state, action) => {
      state.isFindData = true;
    },
    [handleAnimeWatchToday.rejected]: (state, action) => {
      state.isFindData = false;
      return initialState;
    },
  },
});

export const { resetListTodayWatch } = animeWatchTodaySlice.actions;
export default animeWatchTodaySlice;
