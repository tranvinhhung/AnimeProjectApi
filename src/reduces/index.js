import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const acSyn = createAsyncThunk(async (userId, thunkAPI) => {
  return {};
});
const initialState = { value: 0, active: false };

const counterSlice = createSlice({
  name: "popupSlice",
  initialState,
  reducers: {
    handleActiveOpen(state, action) {
      state.active = true;
    },
    handleActiveClose(state, action) {
      state.active = false;
    },
  },
  extraReducers: {
    [acSyn.fulfilled]: (state, action) => {},
    [acSyn.pending]: (state, action) => {},
    [acSyn.rejected]: (state, action) => {},
  },
});

export const { handleActiveOpen, handleActiveClose } = counterSlice.actions;
export default counterSlice;
