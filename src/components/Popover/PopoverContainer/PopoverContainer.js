import { useState, useEffect } from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { getGender } from "./../../../api/index";
import PopoverItem from "../PopoverItem/PopoverItem";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import "./popoverContainer.scss";
function PopoverEle() {
  const [data, setData] = useState();
  useEffect(() => {
    (async () => {
      try {
        let data = await getGender();
        // console.log(data);
        // data.forEach((element) => {
        //   console.log(element);
        // });
        setData(data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  return (
    <nav className="popover">
      <span>Thể loại</span>
      <ul className="popoverListContainer">
        {data?.map((el, index) => (
          <PopoverItem key={index} gender={el} />
        ))}
      </ul>
    </nav>
  );
}
export default PopoverEle;
