import { createSlice, createAsyncThunk, AsyncThunk } from "@reduxjs/toolkit";

const nameReducer = "homeReducer";

export const getDataApi: any = createAsyncThunk(
  `${nameReducer}/getData`,
  async (data, thunkAPI) => {
    thunkAPI.dispatch(setDataAnime(data))
    return [];
  }
);
const initialState = { data: 0 };

const counterSlice = createSlice({
  name: nameReducer,
  initialState,
  reducers: {
    setDataAnime(state, action) {
      state.data = action.payload;
    },
  },
  extraReducers: {
    [getDataApi.fulfilled]: (state, action) => {},
    [getDataApi.pending]: (state, action) => {},
    [getDataApi.rejected]: (state, action) => {},
  },
});

export const { setDataAnime } = counterSlice.actions;
export default counterSlice;
