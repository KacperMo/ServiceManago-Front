import { defineStore } from "pinia";
import { computed, ref } from "vue";
import axios from "axios";

export const useAuthStore = defineStore("auth", () => {
  const tokenName = "stoken";
  const token = ref(localStorage.getItem(tokenName) || null);

  async function login(payload) {
    let err = "";
    let data = "";
    let res = null;
    try {
      res = await axios.post("login", payload);
      token.value = res.data.token;
      localStorage.setItem(tokenName, res.data.token);
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
      res = await axios.post("logout");
    } catch (e) {
      err = e.message;
    }

    return { err, res };
  }

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

  return { token, isLoggedIn, isGuest, login, logout };
});
