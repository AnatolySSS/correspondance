import axios from "axios";
// import { getPercentCompleted } from "../redux/reducers/preloader-reducer";

const instance = axios.create({
  withCredentials: true,
  baseURL: '/',
  headers: {
    "x-access-token": localStorage.getItem('accessToken'),
  }
});

// const config ={
//   onDownloadProgress: function (progressEvent) {
//     console.log(progressEvent);
//     const percentCompleted = (progressEvent.loaded / 91567840) * 100
//     getPercentCompleted(percentCompleted)
//     console.log(percentCompleted);
//     // let preloader = document.getElementsByClassName("p-progressbar")[0]
//     // preloader.setAttribute('value', percentCompleted)
//     // console.log(preloader);
//   },
// }

export const DataAPI = {
  async getData(type) {
    const responce = await instance
      .post(`getData`, { type });
    return responce.data;
  },
  // async addData(type, rowData, rowId) {
  //   const responce = await instance
  //     .post(`addData`, { type, rowData });
  //   return responce.data;
  // },
  // async updateData(type, rowData, rowId) {
  //   const responce = await instance
  //     .put(`updateData`, { type, rowData, rowId });
  //   return responce.data;
  // },
  // async deleteData(type, rowId) {
  //   const responce = await instance
  //     .delete(`deleteData`, {data: { type, rowId }});
  //   return responce.data;
  // },
  async uploadData(type, data) {
    const responce = await instance
      .post(`uploadData`, { type, data });
    return responce.data;
  },
}

export const AuthAPI = {
  async me() {
    const responce = await instance
      .get(`auth/me`, {headers: {
        "x-access-token": localStorage.getItem('accessToken'),
      }});
    return responce.data;
  },
  async login(login, password) {
    const responce = await instance
      .post(`auth/login`, { login, password });
    return responce.data;
  },
  async logout() {
    const responce = await instance
      .get(`auth/logout`, {headers: {
        "x-access-token": localStorage.getItem('accessToken'),
      }});
    return responce.data;
  },
}