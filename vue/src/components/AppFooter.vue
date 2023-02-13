<script setup>
import { useAuthStore } from "@/stores/auth.js";

const store = useAuthStore();
</script>

<template>
  Route name: {{ $router.currentRoute.value.name }} &bull; Route path:
  {{ $router.currentRoute.value.path }} &bull; Route params:
  {{ $router.currentRoute.value.params }}
  <template v-if="store.isLoggedIn">
    &bull; User: {{ store.user.email }}
  </template>
</template>
