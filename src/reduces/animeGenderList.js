import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const acSyn = createAsyncThunk(async (data, thunkAPI) => {
  return data;
});
const initialState = { list: [], loading: false };

const animeGenderSlice = createSlice({
  name: "anime",
  initialState,
  reducers: {},
  extraReducers: {
    [acSyn.fulfilled]: (state, action) => {
      state.list = action.payload;
    },
    [acSyn.pending]: (state, action) => {},
    [acSyn.rejected]: (state, action) => {},
  },
});

export const { handleActiveClose } = animeGenderSlice.actions;
export default animeGenderSlice;
