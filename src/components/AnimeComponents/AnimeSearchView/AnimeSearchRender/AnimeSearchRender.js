import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { scrollToTopWhenCheck } from "./../../../../api/handleData";
import {
  handleDetailSearchData,
  handleChangePageValue,
  handleClearSearch,
  handleListCurrentAnimeSearchWithPage,
  handleClearDetailSearchData,
  handleChangePageValueIncre,
  handleChangePageValueDecre,
} from "./../../../../reduces/animeSearch";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Card from "./../../../Card/Card";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { unwrapResult } from "@reduxjs/toolkit";
import { gsap } from "gsap";
import { CSSPlugin } from "gsap/CSSPlugin";
gsap.registerPlugin(CSSPlugin);
const AnimeSearchRender = () => {
  let url = useSelector((state) => state.mySearch.dataSearch?.url);
  let currentPage = useSelector(
    (state) => state.mySearch.dataSearch.detailSearchData?.["current_page"]
  );
  let lastPage = useSelector(
    (state) => state.mySearch.dataSearch.detailSearchData?.["last_page"]
  );
  let dataSearDetail = useSelector(
    (state) => state.mySearch.dataSearch.detailSearchData?.documents
  );
  let finData = useSelector((state) => state.mySearch.isFindData);
  //   let dataChange =useSelector(state => state.)
  const [listSearch, setListSearch] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  let tl = gsap.timeline();
  useEffect(() => {
    (async () => {
      try {
        if (!url) {
          navigate("/search");
        }
        if (url) {
          // dispatch(handleClearDetailSearchData());
          let cunrentPageApi = currentPage || 1;
          // let dataSearchApi = await listAnimeSearchApi(url, cunrentPageApi);
          // console.log(dataSearchApi);
          // console.log(url);
          let dataSearchApi = await dispatch(
            handleListCurrentAnimeSearchWithPage({
              url: url,
              page: cunrentPageApi,
            })
          );
          let unWrapdataSearchApi = unwrapResult(dataSearchApi);
          console.log(unWrapdataSearchApi);
          console.log(url);
          let index = url.indexOf("&");
          console.log(index);
          if (index > 0) {
            let getUrlForSearch = url.slice(index + 1).replaceAll(" ", "%");
            console.log(getUrlForSearch);
            navigate(`/search?${getUrlForSearch}&trang=${cunrentPageApi}`);
          }
          if (unWrapdataSearchApi) {
            await dispatch(handleDetailSearchData(unWrapdataSearchApi));
          }
        }
      } catch (err) {
        console.log(err);
      }
    })();
    return () => {};
  }, [url, currentPage]);

  const handleCountPage = (countpage) => {
    let arr = [];
    for (let i = 1; i <= countpage; i++) {
      arr.push(
        <MenuItem key={i} value={i}>
          {i}
        </MenuItem>
      );
    }
    return arr;
    // return <MenuItem></MenuItem>
  };
  const handleChangePage = (e) => {
    scrollToTopWhenCheck(1000);
    dispatch(handleChangePageValue(e.target.value));
  };
  const handleDecre = () => {
    scrollToTopWhenCheck(1000);
    dispatch(handleChangePageValueDecre());
  };
  const handleIncre = () => {
    scrollToTopWhenCheck(1000);
    dispatch(handleChangePageValueIncre());
  };
  useEffect(() => {
    let card;
    if (dataSearDetail) {
      card = document.querySelectorAll(".cardConatiner");
    }

    function hide(elem) {
      gsap.set(elem, { autoAlpha: 0, scale: 0.5 });
    }

    dataSearDetail &&
      (function () {
        card.forEach((el, index) => {
          hide(el);
        });
        tl.to(".cardConatiner", 0.4, {
          autoAlpha: 1,
          scale: 1,

          stagger: {
            from: "random",

            amount: 1.2,
          },
          ease: "Power3.easeOut",
        });
      })();
  }, [dataSearDetail]);
  return (
    <>
      <div className="containerListGenderImg">
        {!finData &&
          location.search &&
          url &&
          dataSearDetail?.map((el, index) => <Card key={index} data={el} />)}
      </div>
      {!location.search && !finData && (
        <div
          style={{ textAlign: "center", fontSize: "3rem", marginTop: "2rem" }}
        >
          Bạn hãy tìm kiếm nào
        </div>
      )}
      {location.search && !finData && !dataSearDetail && (
        <div
          style={{ textAlign: "center", fontSize: "3rem", marginTop: "2rem" }}
        >
          Không có kết quả bạn tìm kiếm
        </div>
      )}
      {!finData && dataSearDetail && location.search && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            /* width: 30%; */
            width: "fit-content",
            textAlign: "center",
            margin: "0 auto",
          }}
        >
          <ArrowBackIosIcon
            onClick={handleDecre}
            style={{ cusor: "pointer", width: "2rem", height: "2rem" }}
          />
          <Box sx={{ width: 100, margin: "1rem 1rem" }}>
            <FormControl fullWidth>
              <InputLabel id="select-label">Trang</InputLabel>
              <Select
                labelId="select-label"
                id="simple-select"
                value={currentPage}
                label="Trang"
                onChange={handleChangePage}
              >
                {/* <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem> */}
                {handleCountPage(lastPage)}
              </Select>
            </FormControl>
          </Box>
          <ArrowForwardIosIcon
            onClick={handleIncre}
            style={{ cusor: "pointer", width: "2rem", height: "2rem" }}
          />
        </div>
      )}
    </>
  );
};

export default AnimeSearchRender;
