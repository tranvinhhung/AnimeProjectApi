import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AnimeCommentRow from "../AnimeCommentRow/AnimeCommentRow";
import "./animeCommentContainer.scss";
const AnimeCommentContainer = () => {
  const [activeComent, setactiveComent] = useState(false);
  const handleOpenComments = () => {
    setactiveComent(!activeComent);
  };
  useEffect(() => {
    activeComent &&
      localStorage.getItem("token") &&
      document
        .querySelector(".inputComment")
        .addEventListener("focus", function (e) {
          document.querySelector(".commentInput").classList.add("active");
        });
    activeComent &&
      localStorage.getItem("token") &&
      document
        .querySelector(".inputComment")
        .addEventListener("blur", function (e) {
          document.querySelector(".commentInput").classList.remove("active");
        });
  }, [activeComent]);
  return (
    <div className="wrapper animeCommentContainer">
      {!activeComent && (
        <div onClick={handleOpenComments}>Bấm Để hiện comments...</div>
      )}
      {activeComent && (
        <div className="animeCommentActive">
          <span onClick={handleOpenComments}>Comment here</span>
          <div>
            <AnimeCommentRow />
          </div>

          {/* check có user hay không để hiện cái input hay cái thông báo cần đăng nhập*/}
          <div className="commentInput">
            {localStorage.getItem("token") && (
              <>
                Name User
                <input
                  type="text"
                  className="inputComment"
                  placeholder="nhập comment ở đây...."
                />
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
