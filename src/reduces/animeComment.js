import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
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
    addCommentWithIDanimeAndUserID(state, action) {
      let listDataWithidAnimeComment = state.dataBaseComments.filter(
        (el) => el.idAnimeComment === action.payload.idAnime
      );
      let listDataNotidAnimeComment = state.dataBaseComments.filter(
        (el) => el.idAnimeComment !== action.payload.idAnime
      );
      console.log(current(state));
      let { idAnimeComment, listUsersComment } = listDataWithidAnimeComment[0];
      let filterUserID = listUsersComment.filter(
        (el) => el.idUser === action.payload.user._id
      );
      let filterUserOtherID = listUsersComment.filter(
        (el) => el.idUser != action.payload.user._id
      );
      if (filterUserID.length === 0) {
        filterUserID.push({
          idUserd: action.payload.user._id,
          commentForUser: [
            {
              idComment: 1,
              content: action.payload.content,
              createAt: action.payload.createDate,
              updateAt: 0,
            },
          ],
        });

        state.dataBaseComments = [
          ...listDataNotidAnimeComment,
          {
            idAnimeComment: action.payload.idAnime,
            listUsersComment: [{ ...filterUserID }],
          },
        ];
        console.log(current(state));
        // return;
      }
      if (filterUserID.length > 0) {
        let arr = [...filterUserID[0]?.commentForUser];
        arr.push({
          idComment: arr.length + 1,
          content: action.payload.content,
          createAt: action.payload.createDate,
          updateAt: 0,
        });
        let newdataa = [
          ...listDataNotidAnimeComment,
          {
            idAnimeComment: action.payload.idAnime,
            listUsersComment: [
              ...filterUserOtherID,
              {
                idUser: action.payload.user._id,
                commentForUser: [...arr],
              },
            ],
          },
        ];
        state.dataBaseComments = newdataa;
        console.log(current(state));
      }
    },
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
  addCommentWithIDanimeAndUserID,
} = animeCommentSlice.actions;
export default animeCommentSlice;
