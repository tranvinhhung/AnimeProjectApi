import React, { useEffect } from "react";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import { useSelector, useDispatch } from "react-redux";
import { SnackbarProvider, useSnackbar } from "notistack";
import { handleAddFavorite } from "./../../../reduces/animeLogin";
import { handleFavoriteDataOneUserWithEmail } from "./../../../reduces/myUsersSlice";
const AnimeFavorite = (props) => {
  const { enqueueSnackbar } = useSnackbar();

  let datalUserLogin = useSelector((state) => state?.myLogin?.data);
  let favoriteAnimeList = useSelector(
    (state) => state?.myLogin?.listLoveAnimeId
  );
  console.log(datalUserLogin);
  let fullDataUsers = useSelector((state) => state.myUsers.users);

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
  let dataUser = fullDataUsers?.filter(
    (el) => el?.user?.email === datalUserLogin?.data?.user?.email
  );
  console.log(dataUser[0]?.listLove?.filter((el) => el.id === 2059).length);
  console.log(fullDataUsers);
  useEffect(() => {
    (async () => {
      if (Object.keys(datalUserLogin).length > 0) {
        console.log(datalUserLogin?.data?.user);
        console.log(favoriteAnimeList);
        await dispatch(
          handleFavoriteDataOneUserWithEmail({
            user: datalUserLogin?.data?.user,
            listLove: favoriteAnimeList,
          })
        );
        // let dataUser = await fullDataUsers.filter(
        //   (el) => el?.user?.email === datalUserLogin?.data?.user?.email
        // );
        // console.log(dataUser[0].listLove.filter((el) => el.id === 2059).length);
        // let checkList = await dataUser.filter(
        //   (el) => el.id === props.idAnime.id
        // );
        // console.log(checkList);
      }
    })();
  }, [favoriteAnimeList]);
  return (
    <>
      {Object.keys(datalUserLogin).length === 0 && (
        <div
          style={{ padding: "1rem" }}
          onClick={() => handleAddFavoriteView(props?.idAnime?.id)}
        >
          <BookmarkAddedIcon />
          Add Favorite
        </div>
      )}
      {dataUser[0]?.listLove?.filter((el) => el?.id === props?.idAnime?.id)
        .length === 0 && (
        <div
          style={{ padding: "1rem" }}
          onClick={() => handleAddFavoriteView(props?.idAnime?.id)}
        >
          <BookmarkAddedIcon />
          Add Favorite
        </div>
      )}

      {dataUser[0]?.listLove?.filter((el) => el?.id === props?.idAnime?.id)
        .length > 0 && (
        <span>
          <BookmarkRemoveIcon />
          Remove Favorite
        </span>
      )}
    </>
  );
};

export default AnimeFavorite;
