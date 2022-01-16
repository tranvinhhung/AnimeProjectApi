import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAnimeWidthId,
  handlePromis,
  hanleListAnimeWithArrayId,
} from "./../api/index";
export const handleAnimeComments = createAsyncThunk(
  "animeComments/handledata",
  async (data, thunkAPI) => {
    let predat = thunkAPI;
    console.log(predat);
    //cach 1
    // const allAnime = await Promise.all([
    //   ...(await handlePromis(getAnimeWidthId, data)),
    // ]);
    // return allAnime;
    // cach2
    let allAnime = await hanleListAnimeWithArrayId(data);
    return allAnime;
  }
);

const initialState = {
  activeComent: false,
  dataBaseComments: [
    {
      idAnimeComment: 0,
      listUsersComment: [
        {
          idUser: 0,
          commentForUser: [
            {
              idComment: 0,
              content: "",
              createAt: 0,
              updateAt: 0,
            },
          ],
        },
      ],
    },
  ],
};

const animeCommentSlice = createSlice({
  name: "animeCommentSlice",
  initialState,
  reducers: {
    handleOpenComment(state) {
      state.activeComent = true;
    },
    handleCloseComment(state) {
      state.activeComent = false;
    },
    addComment(state, action) {},
    removeComment(state, action) {},
    addAnimeCommentID(state, action) {
      state.dataBaseComments.push({
        idAnimeComment: action.payload.idAnime,
        listUsersComment: [
          {
            idUser: 0,
            commentForUser: [
              {
                idComment: 0,
                content: "",
                createAt: 0,
                updateAt: 0,
              },
            ],
          },
        ],
      });
    },
  },
  extraReducers: {
    [handleAnimeComments.fulfilled]: (state, action) => {},
    [handleAnimeComments.pending]: (state, action) => {},
    [handleAnimeComments.rejected]: (state, action) => {},
  },
});

export const {
  addComment,
  removeComment,
  addAnimeCommentID,
  handleOpenComment,
  handleCloseComment,
} = animeCommentSlice.actions;
export default animeCommentSlice;
