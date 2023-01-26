import { defineStore } from "pinia";
import { computed, ref, reactive } from "vue";
import axios from "axios";

export const useAuthStore = defineStore("auth", () => {
  const tokenName = "stoken";
  const token = ref(localStorage.getItem(tokenName) || null);
  let user = reactive({});

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
    let data = "";
    let res = null;
    try {
      res = await axios.post("login", payload);
      token.value = res.data.token.token;
      user.id = res.data.user.id;
      user.email = res.data.user.email;
      localStorage.setItem(tokenName, res.data.token.token);
    } catch (e) {
      err = e.message;
      if (e.response) {
        data = e.response.data;
      }
    }

    return { err, data, res };
  }

  async function logout() {
    let err = "";
    let res = null;
    try {
      token.value = null;
      localStorage.removeItem(tokenName);
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
      localStorage.setItem(tokenName, res.data.token.token);
    } catch (e) {
      err = e.message;
      validationErr = e.response?.data.errors;
      data = e.response?.data;
    }

    return { err, validationErr, data, res };
  }

  return { token, user, isLoggedIn, isGuest, login, logout, register };
});
