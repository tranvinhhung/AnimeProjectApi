import React, { useEffect, useState } from "react";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import { useSelector, useDispatch } from "react-redux";
import { SnackbarProvider, useSnackbar } from "notistack";
import {
  handleAddFavorite,
  handleRemoveFavorite,
} from "../../../reduces/animeLogin";
import {
  handleFavoriteDataOneUserWithEmail,
  handleRemoveFavoriteAnimeListIdAll,
  addUser,
} from "../../../reduces/myUsersSlice";
const AnimeFavorite = (props) => {
  const { enqueueSnackbar } = useSnackbar();

  let fullDataUsers = useSelector((state) => state.myUsers?.users);

  let currentUser = useSelector((state) => state.myLogin?.data?.data?.user);
  console.log(fullDataUsers);
  console.log(currentUser);
  const dispatch = useDispatch();
  const handleAddFavoriteView = async (value, user) => {
    let tokenUser = localStorage.getItem("token");

    if (!tokenUser) {
      enqueueSnackbar(
        "Bạn chưa Đăng nhập !Hãy đăng nhập để thêm vào list sau nhé!!!",
        {
          variant: "error",
        }
      );
    }
    if (tokenUser) {
      await dispatch(
        handleFavoriteDataOneUserWithEmail({ id: value, user: user })
      );

      enqueueSnackbar("Đã thêm thành công vào list!!!", {
        variant: "success",
      });
    }
  };
  const handleRemoveFavoriteView = async (value, user) => {
    let tokenUser = localStorage.getItem("token");

    if (tokenUser) {
      await dispatch(
        handleRemoveFavoriteAnimeListIdAll({ id: value, user: user })
      );

      enqueueSnackbar("Đã xóa anime khỏi list thành công !!!", {
        variant: "info",
      });
    }
  };
  const findUserFilterIdLove = (fullUser, currentUser, idAnime) => {
    let dataCurrentUser = fullUser.filter(
      (el) => el.user.email === currentUser.email
    );
    let [arr] = dataCurrentUser;
    let { user, listLove } = arr;
    let checkId = listLove.filter((el) => el.id === idAnime);
    if (!checkId || checkId.length === 0) {
      return (
        <div
          style={{
            padding: "1rem",
            display: "inline-block",
            cursor: "pointer",
            border: "1px solid black",
            marginTop: "1.2rem",
          }}
          onClick={() => handleAddFavoriteView(idAnime, currentUser)}
        >
          <BookmarkAddedIcon />
          Add Favorite
        </div>
      );
    }
    if (checkId.length != 0) {
      return (
        <div
          style={{
            padding: "1rem",
            display: "inline-block",
            cursor: "pointer",
            border: "1px solid black",
            marginTop: "1.2rem",
          }}
          onClick={() => handleRemoveFavoriteView(idAnime, currentUser)}
        >
          <BookmarkRemoveIcon />
          Remove Favorite
        </div>
      );
    }
  };

  return (
    <>
      {!currentUser && (
        <div
          style={{
            padding: "1rem",
            display: "inline-block",
            cursor: "pointer",
            border: "1px solid black",
            marginTop: "1.2rem",
          }}
          onClick={() => handleAddFavoriteView(props?.idAnime?.id)}
        >
          <BookmarkAddedIcon />
          Add Favorite
        </div>
      )}
      {currentUser &&
        Object.keys(currentUser).length > 0 &&
        findUserFilterIdLove(fullDataUsers, currentUser, props?.idAnime?.id)}
      {/* {haveUser &&
        dataCurrentUser[0]?.listLove?.filter(
          (el) => el?.id === props?.idAnime?.id
        ).length === 0 && (
          <div
            style={{
              padding: "1rem",
              display: "inline-block",
              cursor: "pointer",
              border: "1px solid black",
            }}
            onClick={() =>
              handleAddFavoriteView(props?.idAnime?.id, datalUserLogin)
            }
          >
            <BookmarkAddedIcon />
            Add Favorite
          </div>
        )}

      {
        <div
          style={{
            padding: "1rem",
            display: "inline-block",
            cursor: "pointer",
            border: "1px solid black",
          }}
          onClick={() =>
            handleRemoveFavoriteView(props?.idAnime?.id, datalUserLogin)
          }
        >
          <BookmarkRemoveIcon />
          Remove Favorite
        </div>
      } */}
    </>
  );
};

export default AnimeFavorite;
