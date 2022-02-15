import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { handleAnimeEpisodeWithQuantity } from "./../api/index";
export const handleAnimeVideoAsync = createAsyncThunk(
  "handleAnimeVideoAsync/data",
  async (data, thunkAPI) => {
    let predat = thunkAPI;
    console.log(predat.getState().myVideo.allLink);
    let { id, number, quality } = data;
    if (!quality) {
      let animeQuatity = await handleAnimeEpisodeWithQuantity({ id, number });
      console.log(animeQuatity);
      return { quality: false, documentData: [...animeQuatity.documents] };
    }
    if (quality) {
      let getQuantity = predat
        .getState()
        .myVideo.allLink.filter((el) => el.quality === quality);
      console.log(quality);
      return { quality: true, documentData: getQuantity[0] };
    }
  }
);

const initialState = {
  config: {
    // lookup the options in the docs for more options
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    preload: "metadata",
    liveui: true,

    sources: [
      {
        src: "",
        type: "video/mp4",
      },
    ],
  },
  allLink: [],
  quality: "",
  isFindData: false,
};

const animeVideosSlice = createSlice({
  name: "animeVideosSlice",
  initialState,
  reducers: {
    handleConfigVideo(state, action) {
      state.config = { ...state.config, sources: [action.payload] };
    },
    resetAnimeVideo(state, action) {
      state.config.sources = [...initialState.config.sources];
      state.allLink = [...initialState.allLink];
    },
  },
  extraReducers: {
    [handleAnimeVideoAsync.fulfilled]: (state, action) => {
      let { quality, documentData } = action.payload;
      if (!quality) {
        state.allLink = [...documentData];
        let videoS = documentData[0];
        state.config = {
          ...state.config,
          sources: [{ src: `${videoS?.video}`, type: "video/mp4" }],
        };
        state.quality = videoS?.quality;
      }
      if (quality) {
        state.config = {
          ...state.config,
          sources: [{ src: `${documentData?.video}`, type: "video/mp4" }],
        };
        state.quality = documentData?.quality;
      }
    },
    [handleAnimeVideoAsync.pending]: (state, action) => {},
    [handleAnimeVideoAsync.rejected]: (state, action) => {},
  },
});

export const { handleConfigVideo, resetAnimeVideo } = animeVideosSlice.actions;
export default animeVideosSlice;
