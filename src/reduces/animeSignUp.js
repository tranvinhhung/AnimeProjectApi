import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { handleSignUpApi } from "./../api/userApi";
export const formDataUserSignUp = createAsyncThunk(
  "formDataUserSignUp/data",
  async (data, thunkAPI) => {
    let predat = thunkAPI;
    const handleSignUp = await handleSignUpApi(data);
    console.log(handleSignUp);

    return handleSignUp;
  }
);

const initialState = {
  formData: {},

  error: {},
  isCheckSignUp: false,
};

const formUserSignUpSlice = createSlice({
  name: "formDataUserSlice",
  initialState,
  reducers: {
    handleSignUp(state) {
      state.activeLogin = false;
    },
  },
  extraReducers: {
    [formDataUserSignUp.fulfilled]: (state, action) => {
      if (action.payload) {
        state.isCheckSignUp = false;
        state.formData = { ...action.payload };
      }
    },
    [formDataUserSignUp.pending]: (state, action) => {
      state.isCheckSignUp = true;
    },
    [formDataUserSignUp.rejected]: (state, action) => {
      state.isCheckSignUp = false;
      state.formData = { ...action.payload };
    },
  },
});

export const {
  resetFormData,
  activeForm,
  closeForm,

  handleSignUp,
} = formUserSignUpSlice.actions;
export default formUserSignUpSlice;
