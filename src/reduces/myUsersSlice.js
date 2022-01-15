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
  users: [{ user: {}, listLove: [] }],
};

const myListUsersSlice = createSlice({
  name: "myListUsersSlice",
  initialState,
  reducers: {
    handleFavoriteDataOneUserWithEmail(state, action) {
      console.log(action.payload);

      let oThersmyUser = state.users.filter(
        (el) => el.user._id !== action.payload.user._id
      );
      let thisUser = state.users.filter(
        (el) => el.user._id === action.payload.user._id
      );
      const [userCurrent] = thisUser;
      const { user, listLove } = userCurrent;
      listLove.push({ id: action.payload.id });
      let newUser = { ...userCurrent, listLove };
      state.users = [...oThersmyUser, newUser];
    },
    getDataFavoriteUser(state, action) {
      return state.user.filter(
        (el) => el?.user?.email === action.payload.email
      );
    },
    handleRemoveFavoriteAnimeListIdAll(state, action) {
      console.log(action.payload);
      let oThersmyUser = state.users.filter(
        (el) => el.user._id !== action.payload.user._id
      );
      let thisUser = state.users.filter(
        (el) => el.user._id === action.payload.user._id
      );
      const [userCurrent] = thisUser;
      const { user, listLove } = userCurrent;
      let newListLove = listLove.filter((el) => el.id !== action.payload.id);
      let newUser = { ...userCurrent, listLove: newListLove };
      state.users = [...oThersmyUser, newUser];
    },
    addUser(state, action) {
      console.log(action.payload);
      state.users.push({ user: action.payload.user, listLove: [] });
    },
  },
  extraReducers: {
    [handleAnimeListFavoriteUser.fulfilled]: (state, action) => {},
    [handleAnimeListFavoriteUser.pending]: (state, action) => {},
    [handleAnimeListFavoriteUser.rejected]: (state, action) => {},
  },
});

export const {
  addUser,
  handleFavoriteDataOneUserWithEmail,
  handleRemoveFavoriteAnimeListIdAll,
} = myListUsersSlice.actions;
export default myListUsersSlice;
