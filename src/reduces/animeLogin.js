import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { handleLoginApi } from "./../api/userApi";
import { addUser } from "./myUsersSlice";
export const handleLoginRedux = createAsyncThunk(
  "handleLogin/data",
  async (data, thunkAPI) => {
    let myData = await handleLoginApi(data);
    let listUserData = await thunkAPI.getState();
    console.log(listUserData);
    console.log(myData);
    if (myData) {
      let checkUser = listUserData?.myUsers?.users?.filter(
        (el) => el?.user?.email === myData?.data?.user?.email
      );
      if (checkUser.length === 0)
        thunkAPI.dispatch(addUser({ user: myData.data.user }));
      if (checkUser.length > 0) console.log("user tồn tại");
    }

    return myData;
  }
);

const initialState = {
  data: {},
  listLoveAnimeId: [{ id: null, checkFavorite: false }],
  handleData: false,
  checkLogin: false,
};

const formLoginSlice = createSlice({
  name: "formDataUserSlice",
  initialState,
  reducers: {
    activeForm(state) {
      state.formActive = true;
    },
    closeForm(state) {
      state.formActive = false;
    },
    handleLogin(state) {
      state.activeLogin = true;
    },
    handleSignUp(state) {
      state.activeLogin = false;
    },
    logout(state) {
      localStorage.removeItem("token");

      state.data = {};
      state.listLoveAnimeId = [];
    },
    handleAddFavorite(state, action) {
      state.listLoveAnimeId.push({ ...action.payload });
    },
    handleRemoveFavorite(state, action) {
      let newarray = state.listLoveAnimeId.filter(
        (el) => el.id !== action.payload.id
      );
      state.listLoveAnimeId = [...newarray];
    },
  },
  extraReducers: {
    [handleLoginRedux.fulfilled]: (state, action) => {
      if (action.payload) {
        state.checkLogin = false;
        state.data = { ...action.payload };
      }
    },
    [handleLoginRedux.pending]: (state, action) => {
      state.checkLogin = true;
    },
    [handleLoginRedux.rejected]: (state, action) => {
      state.checkLogin = false;
    },
  },
});

export const { handleLogin, logout, handleAddFavorite, handleRemoveFavorite } =
  formLoginSlice.actions;
export default formLoginSlice;
