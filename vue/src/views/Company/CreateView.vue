<script setup>
import { ref, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCompanyStore } from "@/stores/company.js";
import AppAlert from "@/components/AppAlert.vue";
import HeaderTwo from "@/components/HeaderTwo.vue";
import InputField from "@/components/InputField.vue";
import ValidationError from "@/components/ValidationError.vue";

const store = useCompanyStore();
// const route = useRoute();
const router = useRouter();
const error = ref(null);
const validationErrors = ref([]);
const company = reactive({
  industry_id: 1,
  owner_id: 1,
  name: "",
  city: "",
});

const onSubmit = async () => {
  const { err, validationErr, data } = await store.store("companies", company);
  error.value = err;
  validationErrors.value = validationErr;
  if (data?.status == 201) {
    router.push({ name: "companies.index" });
  }
};
</script>

<template>
  <HeaderTwo>Dodawanie</HeaderTwo>
  <AppAlert v-if="error" type="danger">{{ error.message }}</AppAlert>
  <!-- <pre>{{ validationErrors }}</pre> -->
  <form @submit.prevent="onSubmit">
    <div>
      <div class="mb-1 w-6/12">
        <InputField
          v-model="company.name"
          name="name"
          id="name"
          placeholder="Nazwa firmy"
        />
        <template v-for="e in validationErrors" :key="e.field">
          <template v-if="e.field == 'name'">
            <ValidationError>{{ e.message }}</ValidationError>
          </template>
        </template>
      </div>
      <div class="mb-1 w-6/12">
        <InputField
          v-model="company.city"
          name="city"
          id="city"
          placeholder="Miasto"
        />
        <template v-for="e in validationErrors" :key="e.field">
          <template v-if="e.field == 'city'">
            <ValidationError>{{ e.message }}</ValidationError>
          </template>
        </template>
      </div>
      <RouterLink :to="{ name: 'companies.index' }" class="btn mr-3"
        >Powrót</RouterLink
      >
      <button type="submit">Wyślij</button>
    </div>
  </form>
</template>
