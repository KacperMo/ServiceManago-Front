import { defineStore } from "pinia";
import axios from "axios";

export const useCompanyStore = defineStore("company", () => {
  // axios.defaults.baseURL = "http://127.0.0.1:3333/";

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

  async function store(urlFragment, payload) {
    let err = null;
    let validationErr = [];
    let data = null;
    try {
      data = await axios.post(urlFragment, payload);
    } catch (e) {
      // console.log(e);
      err = e;
      if (e.response?.data.message) {
        console.log(e.response.data.message);
        err.message = e.response.data.message;
        // validationErrors.value = e.response.data.errors;
        // validationErr = e.response.data.errors;
      }
      if (e.response?.data.errors) {
        console.log(e.response.data.errors);
        // err.message = e.response.data.message;
        validationErr = e.response.data.errors;
        // validationErr = e.response.data.errors;
      }
    }

    // console.log(err);

    return { err, validationErr, data }; //  validationErr
  }

  async function update(urlFragment, id, payload) {
    let err = null;
    let data = null;
    try {
      data = await axios.put(urlFragment + "\\" + id, payload);
    } catch (e) {
      console.log(e);
      // err = e;
      // if (e.response?.data) {
      //   validationErr = e.response.data.errors;
      // }
    }

    return { err, data };
  }

  async function destroy(urlFragment, id) {
    let err = null; // { message: "Some error" };
    let data = null;
    try {
      data = await axios.delete(urlFragment + "\\" + id);
    } catch (e) {
      console.log(e);
      err = e;
    }

    return { err, data };
  }

  return { all, getOne, store, update, destroy };
});
