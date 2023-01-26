<script setup>
import { useAuthStore } from "@/stores/auth.js";

const store = useAuthStore();
// console.log("foo user", store.token);
</script>

<template>
  <footer class="flex font-light text-xs sm:text-xs md:text-sm lg:text-base">
    <div class="w-1/5 mr-1 p-2 border-t-[1px] border-black">&mdash;&mdash;</div>
    <div class="w-4/5 py-2 border-t-[1px] border-black">
      Route name: {{ $router.currentRoute.value.name }} &bull; Route path:
      {{ $router.currentRoute.value.path }} &bull; Route params:
      {{ $router.currentRoute.value.params }}
      <template v-if="store.isLoggedIn">
        &bull; User: {{ store.user.email }}
      </template>
    </div>
  </footer>
</template>
