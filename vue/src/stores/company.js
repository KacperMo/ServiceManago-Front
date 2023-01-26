import { defineStore } from "pinia";
import axios from "axios";
import { useAuthStore } from "./auth";

export const useCompanyStore = defineStore("company", () => {
  async function all(urlFragment) {
    const authStore = useAuthStore();
    let collection = [];
    let err = null;
    let resStatus = null;
    try {
      const res = await axios(urlFragment, {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      });
      collection = res.data;
    } catch (e) {
      err = e;
      if (e.response) {
        resStatus = e.response.status;
      }
    }

    return { err, resStatus, collection };
  }

  async function getOne(urlFragment, id) {
    const authStore = useAuthStore();
    let err = null;
    let data = null;
    try {
      const res = await axios(`${urlFragment}/${id}`, {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      });
      data = res.data;
    } catch (e) {
      err = e;
    }

    return { err, data };
  }

  async function store(urlFragment, payload) {
    const authStore = useAuthStore();
    let err = null;
    let validationErr = [];
    let data = null;
    try {
      data = await axios.post(urlFragment, payload, {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      });
    } catch (e) {
      err = e;
      if (e.response?.data.message) {
        err.message = e.response.data.message;
        // validationErrors.value = e.response.data.errors;
        // validationErr = e.response.data.errors;
      }
      if (e.response?.data.errors) {
        // err.message = e.response.data.message;
        validationErr = e.response.data.errors;
        // validationErr = e.response.data.errors;
      }
    }

    return { err, validationErr, data };
  }

  async function update(urlFragment, id, payload) {
    const authStore = useAuthStore();
    let err = null;
    let data = null;
    try {
      data = await axios.put(urlFragment + "\\" + id, payload, {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      });
    } catch (e) {
      err = e;
      // if (e.response?.data) {
      //   validationErr = e.response.data.errors;
      // }
    }

    return { err, data };
  }

  async function destroy(urlFragment, id) {
    const authStore = useAuthStore();
    let err = null;
    let data = null;
    try {
      data = await axios.delete(urlFragment + "\\" + id, {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      });
    } catch (e) {
      console.log(e);
      err = e;
    }

    return { err, data };
  }

  return { all, getOne, store, update, destroy };
});
