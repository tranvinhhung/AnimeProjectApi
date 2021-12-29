import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { handleListEpisodeWitdID } from "./../api/index";
export const acSynHanleEpisode = createAsyncThunk(
  "animeEpisode/list",
  async (data, thunkAPI) => {
    const myData = await handleListEpisodeWitdID(data);
    return myData;
  }
);
const initialState = {
  data: {
    count: 0,
    current_page: 1,
    documents: [],
    last_page: 1,
  },
  foundData: false,
};

const animeEpisodeSlice = createSlice({
  name: "animeGenderSlice",
  initialState,
  reducers: {
    getListEpisode(state, action) {
      state.data = action.payload;
      state.foundData = true;
    },
    resetListEpisode(state, action) {
      return initialState;
    },
    notFoundEpisode(state) {
      return initialState;
    },
  },
  extraReducers: {
    [acSynHanleEpisode.fulfilled]: (state, action) => {
      if (action.payload) {
        state.data = action.payload;
        state.foundData = true;
      } else {
        // state = initialState;
        // state.foundData = false;
        return initialState;
      }
    },
    [acSynHanleEpisode.pending]: (state, action) => {},
    [acSynHanleEpisode.rejected]: (state, action) => {
      return initialState;
    },
  },
});

export const { getListEpisode, resetListEpisode } = animeEpisodeSlice.actions;
export default animeEpisodeSlice;
