<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth.js";
import AppAlert from "@/components/AppAlert.vue";
import HeaderTwo from "@/components/HeaderTwo.vue";

const store = useAuthStore();
const router = useRouter();

const { err, res } = await store.logout();
if (res?.data.revoked) {
  router.push({ name: "home" });
}
</script>

<template>
  <HeaderTwo>Wylogowanie</HeaderTwo>
  <AppAlert v-if="err" type="danger">{{ err }}</AppAlert>
</template>
