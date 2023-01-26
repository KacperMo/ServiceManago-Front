<script setup>
import { useAuthStore } from "@/stores/auth.js";

const store = useAuthStore();
console.log("foo user", store.token);
</script>

<template>
  <div class="w-1/5 mr-1 p-2 border-t-[1px] border-black">
    <div>
      <RouterLink :to="{ name: 'home' }">Strona główna</RouterLink>
    </div>
    <div>
      <RouterLink :to="{ name: 'about' }">O nas</RouterLink>
    </div>
    <div>
      <RouterLink :to="{ name: 'companies.index' }">Firmy</RouterLink>
    </div>
    <div v-if="!store.isLoggedIn">
      <RouterLink :to="{ name: 'login' }">Zaloguj</RouterLink>
    </div>
    <div v-if="store.isLoggedIn">
      <RouterLink :to="{ name: 'logout' }">Wyloguj</RouterLink>
    </div>
  </div>
</template>
