import axios from "axios";
export const handleSignUpApi = async (data) => {
  let myFormData = await axios.post(
    "http://localhost:3000/api/v1/users/signup",
    data
  );
  // if(myFormData){

  // }
  console.log(myFormData);
  return myFormData.data;
  //   if (myFormData.data.status === "error") {
  //     // console.log(myFormData);
  //     return myFormData.data;
  //     // throw new Error(myFormData.data);
  //   }
  //   if (myFormData.data.status === "success") {
  //     // console.log(myFormData);
  //     return myFormData.data;
  //   }
};
export const handleLoginApi = async (data) => {
  let myFormData = await axios.post(
    "http://localhost:3000/api/v1/users/login",
    data
  );

  console.log(myFormData);
  return myFormData.data;
};
