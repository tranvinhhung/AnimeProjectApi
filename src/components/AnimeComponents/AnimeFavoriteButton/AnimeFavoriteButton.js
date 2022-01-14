import React, { useEffect } from "react";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import { useSelector, useDispatch } from "react-redux";
import { SnackbarProvider, useSnackbar } from "notistack";
import {
  handleAddFavorite,
  handleRemoveFavorite,
} from "../../../reduces/animeLogin";
import { handleFavoriteDataOneUserWithEmail } from "../../../reduces/myUsersSlice";
const AnimeFavorite = (props) => {
  const { enqueueSnackbar } = useSnackbar();

  let datalUserLogin = useSelector((state) => state.myLogin.data);
  let favoriteAnimeList = useSelector((state) => state.myLogin.listLoveAnimeId);
  console.log(datalUserLogin);
  console.log(favoriteAnimeList);
  let fullDataUsers = useSelector((state) => state.myUsers.users);
  console.log(fullDataUsers);
  const dispatch = useDispatch();
  const handleAddFavoriteView = async (value) => {
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
      await dispatch(handleAddFavorite({ id: value, checkFavorite: true }));

      enqueueSnackbar("Đã thêm thành công vào list!!!", {
        variant: "success",
      });
    }
  };
  const handleRemoveFavoriteView = async (value) => {
    let tokenUser = localStorage.getItem("token");

    if (tokenUser) {
      await dispatch(handleRemoveFavorite({ id: value, checkFavorite: false }));

      enqueueSnackbar("Đã xóa anime khỏi list thành công !!!", {
        variant: "info",
      });
    }
  };
  let dataUser = fullDataUsers?.filter(
    (el) => el?.user?.email === datalUserLogin?.data?.user?.email
  );

  useEffect(() => {
    (async () => {
      console.log(datalUserLogin?.data?.user);
      console.log(favoriteAnimeList);
      if (Object.keys(datalUserLogin).length > 0 && favoriteAnimeList) {
        await dispatch(
          handleFavoriteDataOneUserWithEmail({
            user: { ...datalUserLogin?.data?.user },
            // listLove: favoriteAnimeList || [],
            listLove: [...favoriteAnimeList],
          })
        );
      }
    })();
  }, [favoriteAnimeList]);

  return (
    <>
      {!localStorage.getItem("token") && (
        <div
          style={{
            padding: "1rem",
            display: "inline-block",
            cursor: "pointer",
            border: "1px solid black",
          }}
          onClick={() => handleAddFavoriteView(props?.idAnime?.id)}
        >
          <BookmarkAddedIcon />
          Add Favorite
        </div>
      )}

      {dataUser[0]?.listLove?.filter((el) => el?.id === props?.idAnime?.id)
        .length === 0 && (
        <div
          style={{
            padding: "1rem",
            display: "inline-block",
            cursor: "pointer",
            border: "1px solid black",
          }}
          onClick={() => handleAddFavoriteView(props?.idAnime?.id)}
        >
          <BookmarkAddedIcon />
          Add Favorite
        </div>
      )}

      {dataUser[0]?.listLove?.filter((el) => el?.id === props?.idAnime?.id)
        .length > 0 && (
        <div
          style={{
            padding: "1rem",
            display: "inline-block",
            cursor: "pointer",
            border: "1px solid black",
          }}
          onClick={() => handleRemoveFavoriteView(props?.idAnime?.id)}
        >
          <BookmarkRemoveIcon />
          Remove Favorite
        </div>
      )}
    </>
  );
};

export default AnimeFavorite;
