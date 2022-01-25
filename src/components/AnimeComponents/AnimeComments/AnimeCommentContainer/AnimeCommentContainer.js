import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import AnimeCommentRow from "../AnimeCommentRow/AnimeCommentRow";
import {
  addComment,
  removeComment,
  addAnimeCommentID,
  handleCloseComment,
  handleOpenComment,
  addCommentWithIDanimeAndUserID,
  getAllAnimeCommentCurrentWithId,
} from "./../../../../reduces/animeComment";
import "./animeCommentContainer.scss";
const AnimeCommentContainer = (props) => {
  const dispatch = useDispatch();
  const inputComment = useRef();
  let listComment = useSelector((state) => state.myComments.dataBaseComments);
  let currentUser = useSelector((state) => state.myLogin?.data?.data?.user);
  let activeComment = useSelector((state) => state.myComments.activeComent);
  let currentCommentId = useSelector(
    (state) => state.myComments?.commentCurrentDB
  );
  console.log(currentCommentId);
  const handleOpenComments = () => {
    dispatch(handleOpenComment());
  };
  const handleCloseComments = () => {
    dispatch(handleCloseComment());
  };
  useEffect(() => {
    activeComment &&
      currentUser &&
      document
        .querySelector(".inputComment")
        .addEventListener("focus", function (e) {
          document.querySelector(".commentInput").classList.add("active");
        });
    activeComment &&
      currentUser &&
      document
        .querySelector(".inputComment")
        .addEventListener("blur", function (e) {
          document.querySelector(".commentInput").classList.remove("active");
        });
  }, [activeComment, currentCommentId]);
  useEffect(() => {
    try {
      props.idAnime &&
        (async () => {
          try {
            let arrayId = listComment.filter(
              (el) => el.idAnimeComment === props.idAnime
            );
            if (arrayId.length === 0) {
              dispatch(addAnimeCommentID({ idAnime: props.idAnime }));
            }
            if (arrayId.length > 0) {
              // dispatch(
              //   getAllAnimeCommentCurrentWithId({ idAnime: props.idAnime })
              // );
              currentCommentId && handleListComment(currentCommentId);
            }
          } catch (err) {
            throw new Error(err);
          }
        })();
    } catch (err) {
      console.log(err);
    }
  }, [props.idAnime, listComment]);
  useEffect(() => {
    dispatch(handleCloseComment());
  }, [props.idAnime]);
  const handleComment = ({ user, idAnime }) => {
    console.log(inputComment.current.value);
    console.log(currentUser, props.idAnime);
    if (inputComment.current.value.trim()) {
      let createDate = new Date();
      dispatch(
        addCommentWithIDanimeAndUserID({
          content: inputComment.current.value,
          user,
          idAnime,
          createDate,
        })
      );
      dispatch(getAllAnimeCommentCurrentWithId({ idAnime: props.idAnime }));
      inputComment.current.value = "";
    }
  };
  const handleListComment = (arr) => {
    console.log(arr);
    if (arr.length > 0) {
      let [a] = arr;
      let { idAnimeComment, listUsersComment } = a;
      let ray = listUsersComment.map((el1) => {
        let arr = el1.commentForUser.map((el2, index) => {
          return {
            idUser: el1.idUser,
            name: el1.nameUser,
            content: el2.content,
            createAt: el2.createAt,
          };
        });
        return arr.filter((el, index) => index >= 1);
      });
      let data = [...ray].flat().sort((a, b) => a.createAt - b.createAt);

      console.log(data);
      return data.map((el, index) => <AnimeCommentRow data={el} key={index} />);
    }
    // for (let iidAnimeComment,listUsersComment = 0; i < arr; i++) {
    //   for (let i = 0; i < arr[i].commentForUser.length; i++) {
    //     console.log(arr[i].commentForUser);
    //   }
    // }
  };

  return (
    <div className="wrapper animeCommentContainer">
      {!activeComment && (
        <div onClick={handleOpenComments}>Bấm Để hiện comments...</div>
      )}
      {activeComment && (
        <div className="animeCommentActive">
          <span onClick={handleCloseComments}>Comment here</span>
          {currentCommentId.length > 0 && (
            <div className="animeListComContai active">
              {handleListComment(currentCommentId)}
            </div>
          )}
          {currentCommentId.length === 0 && (
            <div className="animeListComContai">
              Hiện tại chưa có comment bạn hãy comment nào !!!
            </div>
          )}
          {/* check có user hay không để hiện cái input hay cái thông báo cần đăng nhập*/}
          <div className="commentInput">
            {currentUser && (
              <>
                <form
                  id="formComment"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleComment({
                      user: currentUser,
                      idAnime: props.idAnime,
                    });
                  }}
                >
                  <label htmlFor="commentID">{currentUser.name}</label>
                  <input
                    type="text"
                    name="commentInput"
                    id="commentID"
                    className="inputComment"
                    placeholder="nhập comment ở đây...."
                    ref={inputComment}
                  />

                  <button type="submit">button</button>
                </form>
              </>
            )}
            {!currentUser && <>Hãy đăng nhập để comment bạn nhé!!!</>}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnimeCommentContainer;
