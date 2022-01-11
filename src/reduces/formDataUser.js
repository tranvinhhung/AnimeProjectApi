import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { handleLoginApi } from "./../api/userApi";
import { getAnimeWidthId, handlePromis } from "./../api/index";
export const handleFormDataLogin = createAsyncThunk(
  "handleFormDataLogin/data",
  async (data, thunkAPI) => {
    let predat = thunkAPI;
    console.log(data);
    let myData = await handleLoginApi(data);
    // console.log(myData);
    // return myData;
  }
);
export const handleAnimeListFavoriteCurrentUser = createAsyncThunk(
  "handleAnimeListFavoriteCurrentUser/list",
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
  data: {},

  formActive: false,
  activeLogin: false,
  handleData: false,
  isCheckLogin: false,
};

const formDataUserSlice = createSlice({
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
  },
  extraReducers: {
    [handleFormDataLogin.fulfilled]: (state, action) => {
      if (action.payload) {
        state.isCheckLogin = false;
        state.data = { ...action.payload };
      }
    },
    [handleFormDataLogin.pending]: (state, action) => {
      state.isCheckLogin = true;
    },
    [handleFormDataLogin.rejected]: (state, action) => {
      state.isCheckLogin = false;
    },

    [handleAnimeListFavoriteCurrentUser.fulfilled]: (state, action) => {},
    [handleAnimeListFavoriteCurrentUser.pending]: (state, action) => {},
    [handleAnimeListFavoriteCurrentUser.rejected]: (state, action) => {},
  },
});

export const {
  resetFormData,
  activeForm,
  closeForm,
  handleLogin,
  handleSignUp,
} = formDataUserSlice.actions;
export default formDataUserSlice;
