export const handleAsync = (fn) => {
  return () => {
    fn().catch((error) => {
      console.log(error);
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      console.log(error.request);
      throw new Error(error);
    });
  };
};
