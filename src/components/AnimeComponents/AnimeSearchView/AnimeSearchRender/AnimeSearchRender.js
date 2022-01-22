import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listAnimeSearchApi } from "./../../../../api/index";
import {
  handleDetailSearchData,
  handleChangePageValue,
  handleClearSearch,
} from "./../../../../reduces/animeSearch";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Card from "./../../../Card/Card";
const AnimeSearchRender = () => {
  let url = useSelector((state) => state.mySearch.dataSearch.url);
  let currentPage = useSelector(
    (state) => state.mySearch.dataSearch.detailSearchData?.["current_page"]
  );
  let lastPage = useSelector(
    (state) => state.mySearch.dataSearch.detailSearchData?.["last_page"]
  );
  let dataSearDetail = useSelector(
    (state) => state.mySearch.dataSearch.detailSearchData?.documents
  );
  //   let dataChange =useSelector(state => state.)
  const [listSearch, setListSearch] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      try {
        if (!url) {
          navigate("/search");
        }
        if (url && url != "") {
          let cunrentPageApi = currentPage || 1;
          let dataSearchApi = await listAnimeSearchApi(url, cunrentPageApi);
          console.log(dataSearchApi);
          console.log(url);
          let index = url.indexOf("&");
          console.log(index);
          if (index > 0) {
            let getUrlForSearch = url.slice(index + 1).replaceAll(" ", "%");
            console.log(getUrlForSearch);
            navigate(`/search?${getUrlForSearch}`);
          }

          dispatch(handleDetailSearchData(dataSearchApi.data));
        }
      } catch (err) {
        console.log(err);
      }
    })();
    return () => {};
  }, [url, currentPage]);
  const handleChangePage = (e) => {
    dispatch(handleChangePageValue(e.target.value));
  };
  return (
    <>
      <div className="containerListGenderImg">
        {dataSearDetail?.map((el, index) => (
          <Card key={index} data={el} />
        ))}
        {!dataSearDetail && !url && <div>Bạn hay tìm kiếm</div>}
        {!dataSearDetail && url && <div>Không có kết quả bạn tìm</div>}
      </div>
      {/* <Box sx={{ width: 120, margin: "0 auto" }}>
          <FormControl fullWidth>
            <InputLabel id="select-label">Trang</InputLabel>
            <Select
              labelId="select-label"
              id="simple-select"
              value={currentPage}
              label="Trang"
              onChange={handleChangePage}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Box> */}
    </>
  );
};

export default AnimeSearchRender;
