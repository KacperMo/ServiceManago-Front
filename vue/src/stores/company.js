import { defineStore } from "pinia";
import axios from "axios";

export const useCompanyStore = defineStore("company", () => {
  axios.defaults.baseURL = "http://127.0.0.1:3333/";

  async function all(urlFragment) {
    let collection = [];
    let err = null;
    try {
      const res = await axios(urlFragment);
      collection = res.data;
    } catch (e) {
      err = e;
      // if (e.response) {
      //   responseStatus = e.response.status;
      // }
    }

    return { err, collection };
  }

  async function getOne(urlFragment, id) {
    let err = null;
    let data = null;
    try {
      const res = await axios(`${urlFragment}/${id}`);
      data = res.data;
    } catch (e) {
      err = e;
    }

    return { err, data };
  }

  return { all, getOne };
});
