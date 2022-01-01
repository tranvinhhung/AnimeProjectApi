import { configureStore } from "@reduxjs/toolkit";
import { getDefaultMiddleware } from "@reduxjs/toolkit";
import animeGenderSlice from "./../reduces/animeGenderList";
import counterSlice from "./../reduces/index";
import songSlice from "../reduces/songSlice";
import animeEpisodeSlice from "../reduces/animeListEpisode";
import animeWatchTodaySlice from "../reduces/animeWatchToday";
const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});
const store = configureStore({
  reducer: {
    mycounter: counterSlice.reducer,
    myAnime: animeGenderSlice.reducer,
    mySong: songSlice.reducer,
    myEpisode: animeEpisodeSlice.reducer,
    myTodayWatchList: animeWatchTodaySlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(customizedMiddleware),
});

export default store;
