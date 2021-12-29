import React from "react";
import "./collectioncard.scss";
function ColectionCard(props) {
  const id = props.seasonId;
  const handleColetion = (id) => {
    if (id == 0) return "Mùa Đông";
    if (id == 1) return "Mùa Xuân";
    if (id == 2) return "Mùa Hè";
    if (id == 3) return "Mùa Thu";
    if (id == 4) return "UNkow Mùa";
  };
  return <div className="cardColection">{handleColetion(id)}</div>;
}

export default ColectionCard;
