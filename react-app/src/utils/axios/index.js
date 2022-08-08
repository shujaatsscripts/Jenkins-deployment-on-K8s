import axios from "axios";
import store from "../../redux/store";
import { message } from "antd";
// export const baseUrl = "http://localhost:5001"; //! local
export const baseUrl = "https://api.3cix.com"; //! aws containerized

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("bcix_auth");

  if (token) {
    config.headers.common.authorization = token;
    // return config;
  }
  return config;
});

// Response interceptor for API calls
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    // console.clear();
    console.log("error", error?.response);
    // message.error(error?.response?.data?.message);
    if (error?.response?.status === 401) {
      store.dispatch({ type: "auth/auth_logout" });
      window.location.replace(`${baseUrl}/login`);
      // window.location.replace(`http://localhost:3001/login`);
    } else {
      return error.response;
    }
  }
);

export default axios;
