import { configureStore } from "@reduxjs/toolkit";

import counterSlice from "./../reduces/index";
const store = configureStore({
  reducer: {
    mycounter: counterSlice.reducer,
  },
});

export default store;
