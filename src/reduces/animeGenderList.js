import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const acSynHanleAni = createAsyncThunk(async (data, thunkAPI) => {
  return data;
});
const initialState = { list: [], loading: false };

const animeGenderSlice = createSlice({
  name: "anime",
  initialState,
  reducers: {},
  extraReducers: {
    [acSynHanleAni.fulfilled]: (state, action) => {
      state.list = action.payload;
    },
    [acSynHanleAni.pending]: (state, action) => {},
    [acSynHanleAni.rejected]: (state, action) => {},
  },
});

export const { handleActiveClose } = animeGenderSlice.actions;
export default animeGenderSlice;
