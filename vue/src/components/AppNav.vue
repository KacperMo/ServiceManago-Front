<script setup>
import { useAuthStore } from "@/stores/auth.js";

const store = useAuthStore();
</script>

<template>
  <RouterLink :to="{ name: 'home' }">Start</RouterLink>
  <RouterLink :to="{ name: 'about' }">O nas</RouterLink>
  <RouterLink :to="{ name: 'industries.index' }">Gałęzie</RouterLink>
  <RouterLink :to="{ name: 'categories.index' }">Kategorie</RouterLink>
  <RouterLink :to="{ name: 'companies.index' }">Firmy</RouterLink>
  <template v-if="!store.isLoggedIn">
    <RouterLink :to="{ name: 'login' }">Zaloguj</RouterLink>
  </template>
  <template v-if="store.isLoggedIn">
    <RouterLink :to="{ name: 'logout' }">Wyloguj</RouterLink>
  </template>
</template>
