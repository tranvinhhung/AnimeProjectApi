import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const acSynHanleAni = createAsyncThunk(async (data, thunkAPI) => {
  return data;
});
const initialState = {
  data: { count: 0, current_page: 1, documents: [], last_page: 1 },
  foundData: false,
};

const animeGenderSlice = createSlice({
  name: "animeGender",
  initialState,
  reducers: {
    getListGender(state, action) {
      state.data = { ...action.payload };
      state.foundData = true;
    },
    resetListGender(state, action) {
      return initialState;
    },
    notFoundListGender(state) {
      return initialState;
    },
  },
  extraReducers: {
    [acSynHanleAni.fulfilled]: (state, action) => {
      // state.list = action.payload;
    },
    [acSynHanleAni.pending]: (state, action) => {},
    [acSynHanleAni.rejected]: (state, action) => {},
  },
});

export const { getListGender, resetListGender } = animeGenderSlice.actions;
export default animeGenderSlice;
