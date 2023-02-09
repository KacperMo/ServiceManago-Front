<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth.js";
import AppAlert from "@/components/AppAlert.vue";
import HeaderTwo from "@/components/HeaderTwo.vue";
import InputGroup from "@/components/InputGroup.vue";
import InputField from "@/components/InputField.vue";

const router = useRouter();
const store = useAuthStore();
const email = ref("");
const password = ref("");
const error = ref("");
const response = ref("");

const onSubmit = async () => {
  const payload = { email: email.value, password: password.value };
  const { err, res } = await store.login(payload);
  error.value = err;
  response.value = res;
  if (response.value?.status === 200) {
    router.push({ name: "home" });
  }
};
</script>

<template>
  <HeaderTwo>Logowanie</HeaderTwo>
  <AppAlert v-if="error" type="danger">{{ error }}</AppAlert>
  <form @submit.prevent="onSubmit">
    <InputGroup>
      <InputField v-model="email" name="login" id="login" placeholder="Login" />
    </InputGroup>
    <InputGroup>
      <InputField
        v-model="password"
        name="password"
        id="password"
        placeholder="Hasło"
        type="password"
      />
    </InputGroup>
    <button type="submit">Wyślij</button>
  </form>
  <p class="mt-3">
    <RouterLink :to="{ name: 'register' }">Załóż konto</RouterLink>
  </p>
</template>
