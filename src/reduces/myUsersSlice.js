import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAnimeWidthId, handlePromis } from "./../api/index";
export const handleAnimeListFavoriteUser = createAsyncThunk(
  "listAnimeFavoriteForUser/list",
  async (data, thunkAPI) => {
    let predat = thunkAPI;
    console.log(predat);
    const allAnime = await Promise.all([
      ...(await handlePromis(getAnimeWidthId, data)),
    ]);
    return allAnime;
  }
);

const initialState = {
  users: [],
};

const myListUsersSlice = createSlice({
  name: "myListUsersSlice",
  initialState,
  reducers: {
    handleFavoriteDataOneUserWithEmail(state, action) {
      let datafiter = state.users.filter(
        (el) => el?.user?.email !== action.payload.user.email
      );
      state.users = [...datafiter, { ...action.payload }];
    },
    getDataFavoriteUser(state, action) {
      return state.user.filter(
        (el) => el?.user?.email === action.payload.email
      );
    },
    // addFavoriteAnime(state,action){
    //   state.users.
    // }
  },
  extraReducers: {
    [handleAnimeListFavoriteUser.fulfilled]: (state, action) => {},
    [handleAnimeListFavoriteUser.pending]: (state, action) => {},
    [handleAnimeListFavoriteUser.rejected]: (state, action) => {},
  },
});

export const { addUser, handleFavoriteDataOneUserWithEmail } =
  myListUsersSlice.actions;
export default myListUsersSlice;
