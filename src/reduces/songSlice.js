import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const acSyn = createAsyncThunk(async (userId, thunkAPI) => {
  return {};
});
const initialState = {
  song: {
    album: "",
    artist: "",
    preview_url: "",
    title: "",
    year: 0,
  },
};

const songSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    getSong(state, action) {
      state.song = action.payload;
    },
    delSong(state, action) {
      state.song = {
        album: "",
        artist: "",
        preview_url: "",
        title: "",
        year: 0,
      };
    },
  },
  extraReducers: {
    [acSyn.fulfilled]: (state, action) => {},
    [acSyn.pending]: (state, action) => {},
    [acSyn.rejected]: (state, action) => {},
  },
});

export const { getSong, delSong } = songSlice.actions;
export default songSlice;
