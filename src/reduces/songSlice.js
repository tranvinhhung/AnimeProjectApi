import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const songacSyn = createAsyncThunk(async (userId, thunkAPI) => {
  return {};
});
const initialState = {
  song: {
    album: "",
    artist: "",
    preview_url: "",
    title: "",
    year: 0,
    type: 0,
  },
};

const songSlice = createSlice({
  name: "songSlice",
  initialState,
  reducers: {
    getSong(state, action) {
      state.song = action.payload;
    },
    delSong(state, action) {
      state.song = {
        ...initialState.song,
      };
    },
  },
  extraReducers: {
    [songacSyn.fulfilled]: (state, action) => {},
    [songacSyn.pending]: (state, action) => {},
    [songacSyn.rejected]: (state, action) => {},
  },
});

export const { getSong, delSong } = songSlice.actions;
export default songSlice;
