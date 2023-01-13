import { defineStore } from "pinia";
import axios from "axios";

export const useCompanyStore = defineStore("company", () => {
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

  return { all };
});
