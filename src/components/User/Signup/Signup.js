import React from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import InputField from "../../InputField/InputField";
import { yupResolver } from "@hookform/resolvers";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { activeForm, closeForm } from "../../../reduces/formDataUser";
import { handleLogin, handleSignUp } from "./../../../reduces/formDataUser";
import { handleSignUpApi } from "./../../../api/userApi";
import { unwrapResult } from "@reduxjs/toolkit";
import { SnackbarProvider, useSnackbar } from "notistack";
import { formDataUserSignUp } from "./../../../reduces/animeSignUp";
import "./signup.scss";
const validationSchema = yup.object().shape({
  password: yup
    .string()
    .required("bắt buộc nhập")
    .min(8, "nhập trên 8 kí tự")
    .max(100, "nhập dưới 100 kí tự"),
  passwordConfirm: yup
    .string()
    .required("bắt buộc nhập")
    .oneOf(
      [yup.ref("password"), null],
      "nhập chưa khớp mật khẩu vui lòng nhập lại"
    ),
  email: yup.string().email().required("bắt buộc nhâp"),
  name: yup.string().trim().required("bắt buộc nhâp"),
});

export default function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  let active = useSelector((state) => state.myForm.formActive);
  let handleSignup = useSelector((state) => state.mySignUp.isCheckSignUp);
  const { register, handleSubmit, errors, reset, getValues } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: { email: "", password: "", passwordConfirm: "" },
  });
  const onSubmit = async (data) => {
    try {
      if (Object.keys(data).length > 0) {
        console.log(data);
        // let myFormData = await handleSignUpApi(data);
        // console.log(myFormData);
        let myFormData = await dispatch(formDataUserSignUp(data));
        let handleData = unwrapResult(myFormData);
        console.log(handleData);
        if (handleData.status === "error") {
          throw new Error(handleData);
        }
        if (handleData.status === "success") {
          // await navigate("/login");
          await dispatch(handleLogin());
          enqueueSnackbar(
            "Bạn đã tạo tài khoản thành công ,Hãy đăng nhập nhé!!!",
            { variant: "success" }
          );
        }
      }
    } catch (error) {
      console.log(error);
      if (error.message === "Network Error") {
        reset({ ...getValues(), password: "", passwordConfirm: "" });
        enqueueSnackbar("Đã có lỗi gì đấy mong bạn thử lại sau!!!", {
          variant: "error",
        });
      } else {
        reset({ ...getValues(), password: "", passwordConfirm: "" });
        enqueueSnackbar("Tài khoản đã tồn tại mong bạn nhập lại!!!", {
          variant: "error",
        });
      }
    }
  };

  const handleClickOpen = () => {
    dispatch(activeForm());
  };

  const handleClose = () => {
    dispatch(closeForm());
    // navigate("/home");
  };
  const changeLogin = () => {
    // navigate("/login");
    dispatch(handleLogin());
  };
  const handleErorMessenger = (error) => {
    return <div className="errorMessenger">{error}</div>;
  };
  return (
    <>
      <Dialog
        open={active}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent sx={{ height: "100%" }}>
          <div className={!handleSignup ? `process` : `process active`}>
            <div id="preloader">
              <div id="loader"></div>
            </div>
          </div>
          <div className={!handleSignup ? `signup` : `signup overlay`}>
            <h1>Đăng kí</h1>
            <AccountCircleIcon sx={{ height: 80, width: 80 }} />
            <form onSubmit={handleSubmit(onSubmit)} className="form">
              <InputField
                name="name"
                variant="outlined"
                label="Fullname"
                inputRef={register}
                error={errors.name}
                isFocus
                fullWidth
              />
              {errors?.name && (
                <div className="errorMessenger">{`${errors?.name.message}`}</div>
              )}
              {!errors.fullname && <div className="errorMessenger"></div>}
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

              <InputField
                name="passwordConfirm"
                type="password"
                variant="outlined"
                label="RepassWord"
                inputRef={register}
                error={errors.passwordConfirm}
                fullWidth
              />
              {errors?.passwordConfirm && (
                <div className="errorMessenger">{`${errors?.passwordConfirm.message}`}</div>
              )}
              {!errors.passwordConfirm && (
                <div className="errorMessenger"></div>
              )}
              {/* {errors?.repassword && <p>Chưa trùng khớp</p> } */}
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={!handleSignup ? false : true}
              >
                Submit
              </Button>
            </form>
            <div className="changeGL">
              Have a account?<h2 onClick={changeLogin}>Login now </h2>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Thoát
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
