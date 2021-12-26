import { configureStore } from "@reduxjs/toolkit";
import animeGenderSlice from "./../reduces/animeGenderList";
import counterSlice from "./../reduces/index";
const store = configureStore({
  reducer: {
    mycounter: counterSlice.reducer,
    myAnime: animeGenderSlice.reducer,
  },
});

export default store;
