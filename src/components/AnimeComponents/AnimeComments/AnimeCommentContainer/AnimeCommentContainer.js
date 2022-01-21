import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import AnimeCommentRow from "../AnimeCommentRow/AnimeCommentRow";
import {
  addComment,
  removeComment,
  addAnimeCommentID,
  handleCloseComment,
  handleOpenComment,
} from "./../../../../reduces/animeComment";
import "./animeCommentContainer.scss";
const AnimeCommentContainer = (props) => {
  const [activeComent, setactiveComent] = useState(false);
  const dispatch = useDispatch();
  const inputComment = useRef();
  let listComment = useSelector((state) => state.myComments.dataBaseComments);
  let currentUser = useSelector((state) => state.myLogin?.data?.data?.user);
  let activeComment = useSelector((state) => state.myComments.activeComent);
  const handleOpenComments = () => {
    dispatch(handleOpenComment());
  };
  const handleCloseComments = () => {
    dispatch(handleCloseComment());
  };
  useEffect(() => {
    activeComment &&
      localStorage.getItem("token") &&
      document
        .querySelector(".inputComment")
        .addEventListener("focus", function (e) {
          document.querySelector(".commentInput").classList.add("active");
        });
    activeComment &&
      localStorage.getItem("token") &&
      document
        .querySelector(".inputComment")
        .addEventListener("blur", function (e) {
          document.querySelector(".commentInput").classList.remove("active");
        });
  }, [activeComment]);
  useEffect(() => {
    try {
      dispatch(handleCloseComment());
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
            }
          } catch (err) {
            throw new Error(err);
          }
        })();
    } catch (err) {
      console.log(err);
    }
  }, [props.idAnime]);
  const handleComment = (e) => {
    e.preventDefault();
    console.log(inputComment.current.value);
    console.log(currentUser, props.idAnime);
    inputComment.current.value = "";
  };
  return (
    <div className="wrapper animeCommentContainer">
      {!activeComment && (
        <div onClick={handleOpenComments}>Bấm Để hiện comments...</div>
      )}
      {activeComment && (
        <div className="animeCommentActive">
          <span onClick={handleCloseComments}>Comment here</span>
          <div>
            <AnimeCommentRow />
          </div>

          {/* check có user hay không để hiện cái input hay cái thông báo cần đăng nhập*/}
          <div className="commentInput">
            {localStorage.getItem("token") && (
              <>
                <form id="formComment" onSubmit={handleComment}>
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
            {!localStorage.getItem("token") && (
              <>Hãy đăng nhập để comment bạn nhé!!!</>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnimeCommentContainer;