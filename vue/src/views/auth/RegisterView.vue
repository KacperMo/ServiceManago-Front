<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth.js";
import AppAlert from "@/components/AppAlert.vue";
import HeaderTwo from "@/components/HeaderTwo.vue";
import InputGroup from "@/components/InputGroup.vue";
import InputField from "@/components/InputField.vue";
import ValidationError from "@/components/ValidationError.vue";

const router = useRouter();
const store = useAuthStore();
const email = ref("staszek@tlen.pl");
const password = ref("12345678");
const errorMessage = ref("");
const validationErrors = ref([]);
const response = ref("");

const onSubmit = async () => {
  const payload = { email: email.value, password: password.value };
  const { err, validationErr, data, res } = await store.register(payload);
  errorMessage.value = err;
  validationErrors.value = validationErr;
  response.value = res;
  if (response.value?.status === 200) {
    router.push({ name: "login" });
  }
};
</script>

<template>
  <HeaderTwo>Zakładanie konta</HeaderTwo>
  <AppAlert v-if="errorMessage" type="danger">{{ errorMessage }}</AppAlert>
  <form @submit.prevent="onSubmit">
    <InputGroup>
      <InputField
        v-model="email"
        type="email"
        name="login"
        id="login"
        placeholder="Login"
        autofocus="true"
      />
      <template v-for="e in validationErrors" :key="e.field">
        <template v-if="e.field == 'email'">
          <ValidationError>{{ e.message }}</ValidationError>
        </template>
      </template>
    </InputGroup>
    <InputGroup>
      <InputField
        v-model="password"
        name="password"
        id="password"
        placeholder="Hasło"
      />
      <template v-for="e in validationErrors" :key="e.field">
        <template v-if="e.field == 'password'">
          <ValidationError>{{ e.message }}</ValidationError>
        </template>
      </template>
    </InputGroup>
    <button type="submit">Wyślij</button>
  </form>
</template>
