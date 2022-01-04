import { configureStore } from "@reduxjs/toolkit";
import { getDefaultMiddleware } from "@reduxjs/toolkit";
import animeGenderSlice from "./../reduces/animeGenderList";
import counterSlice from "./../reduces/index";
import songSlice from "../reduces/songSlice";
import animeEpisodeSlice from "../reduces/animeListEpisode";
import animeWatchTodaySlice from "../reduces/animeWatchToday";
import formDataUserSlice from "../reduces/formDataUser";
import formSignUp from "./../reduces/animeSignUp";
import animeLogin from "./../reduces/animeLogin";
const store = configureStore({
  reducer: {
    mycounter: counterSlice.reducer,
    myAnime: animeGenderSlice.reducer,
    mySong: songSlice.reducer,
    myEpisode: animeEpisodeSlice.reducer,
    myTodayWatchList: animeWatchTodaySlice.reducer,
    myForm: formDataUserSlice.reducer,
    mySignUp: formSignUp.reducer,
    myLogin: animeLogin.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
