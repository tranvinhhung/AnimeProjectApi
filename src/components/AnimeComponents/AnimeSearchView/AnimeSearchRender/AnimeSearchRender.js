import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { unwrapResult } from "@reduxjs/toolkit";
import { gsap } from "gsap";
import { CSSPlugin } from "gsap/CSSPlugin";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { scrollToTopWhenCheck } from "./../../../../api/handleData";
import {
  handleDetailSearchData,
  handleListCurrentAnimeSearchWithPage,
} from "./../../../../reduces/animeSearch";
import Card from "./../../../Card/Card";
gsap.registerPlugin(CSSPlugin);
const AnimeSearchRender = () => {
  let url = useSelector((state) => state.mySearch.dataSearch?.url);
  let urlDum = useSelector((state) => state.mySearch.dataSearch?.urlDum);
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
  let [searchParams, setSearchParams] = useSearchParams();
  //   let dataChange =useSelector(state => state.)
  const [listSearch, setListSearch] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  console.log(location);
  let tl = gsap.timeline();
  useEffect(() => {
    (async () => {
      try {
        if (url) {
          let trang = searchParams.get("trang");
          // dispatch(handleClearDetailSearchData());
          let cunrentPageApi = trang || 1;
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
          // console.log(unWrapdataSearchApi);
          // console.log(url);
          let index = url.indexOf("&");
          // console.log(index);\
          let getUrlForSearch = "";
          if (index > 0) {
            getUrlForSearch = url.slice(index + 1).replaceAll(" ", "%");
            // console.log(getUrlForSearch);
            navigate(`/search?${getUrlForSearch}&trang=${cunrentPageApi}`);
          } else {
            getUrlForSearch = url.slice(index + 1);
            // console.log(getUrlForSearch);
            navigate(`/search?${getUrlForSearch}&trang=${cunrentPageApi}`);
          }
          console.log(unWrapdataSearchApi);
          if (unWrapdataSearchApi) {
            dispatch(handleDetailSearchData(unWrapdataSearchApi));
          }
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [url, searchParams]);

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
    let trang = Number(searchParams.get("trang"));
    console.log(trang);

    let arr = location.search.split("&");
    console.log(arr);
    let ray2 = [];
    for (let i = 0; i < arr.length - 1; i++) {
      ray2.push(arr[i]);
    }
    let string = ray2.join("&");
    console.log(string);
    navigate(`${location.pathname}${string}&trang=${e.target.value}`);
    // dispatch(handleChangePageValue(e.target.value));
  };
  const handleDecre = () => {
    scrollToTopWhenCheck(1000);

    let trang = Number(searchParams.get("trang"));

    let arr = location.search.split("&");

    let ray2 = [];
    for (let i = 0; i < arr.length - 1; i++) {
      ray2.push(arr[i]);
    }
    let string = ray2.join("&");

    navigate(`${location.pathname}${string}&trang=${trang - 1}`);

    // dispatch(handleChangePageValueDecre());
  };
  const handleIncre = () => {
    scrollToTopWhenCheck(1000);
    let trang = Number(searchParams.get("trang"));

    let arr = location.search.split("&");

    let ray2 = [];
    for (let i = 0; i < arr.length - 1; i++) {
      ray2.push(arr[i]);
    }
    let string = ray2.join("&");

    navigate(`${location.pathname}${string}&trang=${trang + 1}`);
    // dispatch(handleChangePageValueIncre());
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
