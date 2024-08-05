import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { activeForm } from "../../reduces/formDataUser";
import { logout } from "./../../reduces/animeLogin";
import { handleClearDetailSearchData } from "./../../reduces/animeSearch";
import PopoverEle from "./../Popover/PopoverContainer/PopoverContainer";
import Login from "./../User/Login/Login";
import Signup from "./../User/Signup/Signup";
import "./header.scss";
const Header = () => <>HEADER</>;

export default Header;
