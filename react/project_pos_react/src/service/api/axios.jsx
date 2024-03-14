import axios from "axios";
import { redirect, useNavigate } from "react-router-dom";

// const headers = {
//   "Content-Type": "application/json",
//   "Authorization": `${localStorage.getItem("token")}`
// };

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  validateStatus: function(status) {
    return status < 400;
  },
});

const apiTest = axios.create({
  baseURL: import.meta.env.VITE_API_GO_URL,

});


api.interceptors.request.use(function(config) {
  config.headers["Content-Type"] = "application/json";
  config.headers.Authorization = localStorage.getItem("token");
  return config;
});

api.interceptors.response.use(
  (response) => {
    var mainData = response.data;
    // if (mainData.hasOwnProperty('data') && !mainData.data.hasOwnProperty('user')){
    //   return mainData.data
    // }
    return mainData;
  },
  (error) => {
    if (error.response.status == 401) {
      localStorage.clear();
      window.location.href = "/auth/login";
      return;
    }
    alert(error.response.data);
    return Promise.reject(error);
  }
);

const apiUpload = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  validateStatus: function(status) {
    return status < 400;
  },
});

apiUpload.interceptors.request.use(function(config) {
  config.headers["Content-Type"] = "multipart/form-data";
  config.headers.Authorization = localStorage.getItem("token");
  return config;
});

apiUpload.interceptors.response.use(
  (response) => {
    var mainData = response.data;
    // if (mainData.hasOwnProperty('data') && !mainData.data.hasOwnProperty('user')){
    //   return mainData.data
    // }
    return mainData;
  },
  (error) => {
    if (error.response.status == 401) {
      localStorage.clear();
      window.location.href = "/auth/login";
      return;
    }
    alert(error.response.data);
    return Promise.reject(error);
  }
);



const AxiosInterceptorsSetup = (navigate) => {};

function AxiosInterceptorNavigate() {
  let navigate = useNavigate();
  AxiosInterceptorsSetup(navigate);
  return <></>;
}



export { api, AxiosInterceptorNavigate, apiUpload };
