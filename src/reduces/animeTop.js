import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { handleAnimeTop } from "./../api/index";

export const handleAnimeTopAsyncRedux = createAsyncThunk(
  "animeTopList/list",
  async (data, thunkAPI) => {
    let predat = thunkAPI;
    console.log(predat);

    let page = thunkAPI.getState().myAnimeTop.page;
    let dataTop = await handleAnimeTop({ page });
    console.log(dataTop);
    thunkAPI.dispatch(addAnimeTop(dataTop.documents));
    thunkAPI.dispatch(handleInCrePage());
  }
);

const initialState = {
  page: 1,
  data: [],
  hasMore: true,
};

const animeTopSlice = createSlice({
  name: "animeTopSlice",
  initialState,
  reducers: {
    addAnimeTop(state, action) {
      state.data = [...state.data, ...action.payload];
    },
    clearAnimeTop(state, action) {},
    handleHasMore(state, action) {
      state.hasMore = false;
    },
    handleInCrePage(state, action) {
      state.page += 1;
    },
  },
  extraReducers: {
    [handleAnimeTopAsyncRedux.fulfilled]: (state, action) => {},
    [handleAnimeTopAsyncRedux.pending]: (state, action) => {},
    [handleAnimeTopAsyncRedux.rejected]: (state, action) => {},
  },
});

export const { addAnimeTop, clearAnimeTop, handleHasMore, handleInCrePage } =
  animeTopSlice.actions;
export default animeTopSlice;
