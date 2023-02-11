<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "@/stores/store.js";
import AppAlert from "@/components/AppAlert.vue";
import HeaderTwo from "@/components/HeaderTwo.vue";
import InputGroup from "@/components/InputGroup.vue";
import InputField from "@/components/InputField.vue";
import InputLabel from "../../components/InputLabel.vue";
import InputButton from "@/components/InputButton.vue";
import ValidationError from "@/components/ValidationError.vue";

const store = useStore();
const router = useRouter();
const error = ref(null);
const validationErrors = ref([]);

const name = ref("");

const onSubmit = async () => {
  const payload = { name: name.value };
  const { err, validationErr, data } = await store.store("industries", payload);
  error.value = err;
  validationErrors.value = validationErr;

  if (data?.status == 201) {
    router.push({ name: "industries.index" });
  }
};
</script>

<template>
  <HeaderTwo>Dodawanie</HeaderTwo>
  <AppAlert v-if="error" type="danger">{{ error }}</AppAlert>
  <form @submit.prevent="onSubmit">
    <InputGroup>
      <InputLabel for="name">Nazwa</InputLabel>
      <InputField v-model="name" id="name" placeholder="Obowiązkowe" />
      <template v-for="e in validationErrors" :key="e.field">
        <template v-if="e.field == 'name'">
          <ValidationError>{{ e.message }}</ValidationError>
        </template>
      </template>
    </InputGroup>
    <div class="pt-2">
      <RouterLink :to="{ name: 'industries.index' }" class="btn mr-3"
        >Powrót</RouterLink
      >
      <InputButton />
    </div>
  </form>
</template>
