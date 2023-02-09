import { defineStore } from "pinia";
import { computed, ref, reactive } from "vue";
import axios from "axios";

export const useAuthStore = defineStore("auth", () => {
  const tokenName = "stoken";
  const idName = "sid";
  const emailName = "semail";
  const token = ref(localStorage.getItem(tokenName) || null);

  let user = reactive({
    id: localStorage.getItem(idName) || null,
    email: localStorage.getItem(emailName) || null,
  });

  const isLoggedIn = computed(() => {
    if (token.value == null) {
      return false;
    }

    return true;
  });

  const isGuest = computed(() => {
    if (token.value == null) {
      return true;
    }

    return false;
  });

  async function login(payload) {
    let err = "";
    let res = null;
    try {
      res = await axios.post("login", payload);
      token.value = res.data.token.token;
      user.id = res.data.user.id;
      user.email = res.data.user.email;
      localStorage.setItem(tokenName, res.data.token.token);
      localStorage.setItem(idName, res.data.user.id);
      localStorage.setItem(emailName, res.data.user.email);
    } catch (e) {
      if (e.response?.status == 401) {
        // wrong login or pass
        err = e.response.data;
      } else {
        // network error or other
        err = e.message;
        if (e.response?.data.message) {
          err += ". ";
          err += e.response?.data.message;
        }
      }
    }

    return { err, res };
  }

  async function logout() {
    let err = "";
    let res = null;
    try {
      token.value = null;
      localStorage.removeItem(tokenName);
      localStorage.removeItem(idName);
      localStorage.removeItem(emailName);
      delete user.id;
      delete user.email;
      res = await axios.post("logout");
    } catch (e) {
      err = e.message;
    }

    return { err, res };
  }

  async function register(payload) {
    let err = "";
    let validationErr = "";
    let data = "";
    let res = null;
    try {
      res = await axios.post("register", payload);
      token.value = res.data.token.token;
      user.id = res.data.user.id;
      user.email = res.data.user.email;
      localStorage.setItem(tokenName, res.data.token.token);
      localStorage.setItem(idName, res.data.user.id);
      localStorage.setItem(emailName, res.data.user.email);
    } catch (e) {
      err = e.message;
      validationErr = e.response?.data.errors;
      data = e.response?.data;
    }

    return { err, validationErr, data, res };
  }

  return { token, user, isLoggedIn, isGuest, login, logout, register };
});
