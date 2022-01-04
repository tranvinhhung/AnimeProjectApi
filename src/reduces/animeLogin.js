import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { handleLoginApi } from "./../api/userApi";
export const handleLoginRedux = createAsyncThunk(
  "handleLogin/data",
  async (data, thunkAPI) => {
    let myData = await handleLoginApi(data);
    // console.log(myData);
    return myData;
  }
);

const initialState = {
  data: {},

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
    logout() {
      localStorage.removeItem("token");
      return initialState;
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

export const { handleLogin, logout } = formLoginSlice.actions;
export default formLoginSlice;
