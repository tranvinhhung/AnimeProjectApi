import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from "redux-persist";
// import storage from "redux-persist/lib/storage";
import animeGenderSlice from "./../reduces/animeGenderList";
import counterSlice from "./../reduces/index";
import songSlice from "../reduces/songSlice";
import animeEpisodeSlice from "../reduces/animeListEpisode";
import animeWatchTodaySlice from "../reduces/animeWatchToday";
import formDataUserSlice from "../reduces/formDataUser";
import formSignUp from "./../reduces/animeSignUp";
import animeLogin from "./../reduces/animeLogin";
import myListUsersSlice from "../reduces/myUsersSlice";
// const persistConfig = {
//   key: "root",
//   version: 1,
//   storage,
// };
const rootReducer = combineReducers({
  mycounter: counterSlice.reducer,
  myAnime: animeGenderSlice.reducer,
  mySong: songSlice.reducer,
  myEpisode: animeEpisodeSlice.reducer,
  myTodayWatchList: animeWatchTodaySlice.reducer,
  myForm: formDataUserSlice.reducer,
  mySignUp: formSignUp.reducer,
  myLogin: animeLogin.reducer,
  myUsers: myListUsersSlice.reducer,
});
// const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  // reducer: persistedReducer,
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // serializableCheck: {
      //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      // },
      serializableCheck: false,
    }),
});
// export let persistor = persistStore(store);
export default store;
