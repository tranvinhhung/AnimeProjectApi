import React from "react";
import { useNavigate } from "react-router-dom";
import slugify from "slugify";
import { resetListGender } from "./../../../.../../reduces/animeGenderList";
import { useDispatch } from "react-redux";
function PopoverItem(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleNavigate = async (gender) => {
    await dispatch(resetListGender());
    await navigate(
      `/gender?name=${slugify(gender, {
        replacement: "-",
        remove: undefined,
        lower: true,
        strict: false,
        locale: "vi",
        trim: true,
      })}&trang=1`,
      { state: { gender: gender } }
    );
  };
  return (
    <li
      style={
        props.isStyle
          ? {
              backgroundColor: props.isStyle,
            }
          : { border: "1px solid black" }
      }
      onClick={() => handleNavigate(props.gender)}
    >
      {props.gender}
    </li>
  );
}

export default PopoverItem;
