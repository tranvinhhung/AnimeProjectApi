import React from "react";
import { handleChangeDay } from "./../../../../api/handleData";
const AnimeCommentRow = (props) => {
  return (
    <div className="aniCommentRow">
      <span>{props.data.name}</span>
      <p className="animeCommentContent">{props.data.content}</p>
      <p>{handleChangeDay(props.data.createAt)}</p>
    </div>
  );
};

export default AnimeCommentRow;
