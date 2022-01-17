import { yupResolver } from "@hookform/resolvers";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useSnackbar } from "notistack";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { activeForm, closeForm } from "../../../reduces/formDataUser";
import InputField from "../../InputField/InputField";
import { handleLoginRedux } from "./../../../reduces/animeLogin";
import { unwrapResult } from "@reduxjs/toolkit";
import { handleSignUp } from "./../../../reduces/formDataUser";
import { handleLoginApi } from "./../../../api/userApi";
const validationSchema = yup.object().shape({
  password: yup
    .string()
    .required("bắt buộc nhập")
    .min(8, "nhập trên 8 kí tự")
    .max(100, "nhập dưới 100 kí tự"),

  email: yup.string().email().required("bắt buộc nhâp"),
});

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  let active = useSelector((state) => state.myForm.formActive);
  let checkLogin = useSelector((state) => state.myLogin.checkLogin);
  const { register, handleSubmit, errors, reset, getValues } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: { email: "", password: "" },
  });
  const onSubmit = async (data) => {
    try {
      // let dataa = await handleLoginApi(data);
      // console.log(dataa);
      let data1 = await dispatch(handleLoginRedux(data));
      let data2 = unwrapResult(data1);
      if (data2.status === "success") {
        localStorage.setItem("token", data2.token);
        dispatch(closeForm());
        // navigate("/home");
        enqueueSnackbar("Đăng nhập thành công!!!", {
          variant: "success",
        });
      }
      console.log(data2);
    } catch (error) {
      console.log(error);
      reset({ ...getValues(), password: "" });
      enqueueSnackbar("Tài  khoản hoặc mật khẩu sai !!!", {
        variant: "error",
      });
    }
  };
  const handleClickOpen = () => {
    dispatch(activeForm());
  };

  const handleClose = () => {
    dispatch(closeForm());
    // navigate("/home");
  };
  const changeSignUp = () => {
    // navigate("/signup");
    dispatch(handleSignUp());
  };
  return (
    <Dialog
      open={active}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent sx={{ height: "100%" }}>
        <div className={!checkLogin ? `process` : `process active`}>
          <div id="preloader">
            <div id="loader"></div>
          </div>
        </div>
        <div className={!checkLogin ? `signup` : `signup overlay`}>
          <h1>Đăng nhập</h1>
          <AccountCircleIcon sx={{ height: 100, width: 100 }} />
          <form onSubmit={handleSubmit(onSubmit)} className="form">
            <InputField
              name="email"
              variant="outlined"
              label="Email"
              inputRef={register}
              error={errors.email}
              isFocus
              fullWidth
            />
            {errors?.email && (
              <div className="errorMessenger">{`${errors?.email.message}`}</div>
            )}
            {!errors.email && <div className="errorMessenger"></div>}
            <InputField
              name="password"
              type="password"
              variant="outlined"
              label="Password"
              inputRef={register}
              error={errors.password}
              fullWidth
            />
            {errors?.password && (
              <div className="errorMessenger">{`${errors?.password.message}`}</div>
            )}
            {!errors.password && <div className="errorMessenger"></div>}

            <Button
              type="submit"
              variant="contained"
              disabled={!checkLogin ? false : true}
              fullWidth
            >
              Submit
            </Button>
          </form>
          <div className="changeGL">
            No a account?<h2 onClick={changeSignUp}>SignUp now </h2>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          Thoát
        </Button>
      </DialogActions>
    </Dialog>
  );
}
