import { configureStore } from "@reduxjs/toolkit";
import animeGenderSlice from "./../reduces/animeGenderList";
import counterSlice from "./../reduces/index";
import songSlice from "../reduces/songSlice";
import animeEpisodeSlice from "../reduces/animeListEpisode";
const store = configureStore({
  reducer: {
    mycounter: counterSlice.reducer,
    myAnime: animeGenderSlice.reducer,
    mySong: songSlice.reducer,
    myEpisode: animeEpisodeSlice.reducer,
  },
});

export default store;
