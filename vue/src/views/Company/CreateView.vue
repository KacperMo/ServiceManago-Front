<script setup>
import { ref, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCompanyStore } from "@/stores/company.js";
import AppAlert from "@/components/AppAlert.vue";
import HeaderTwo from "@/components/HeaderTwo.vue";
import InputField from "@/components/InputField.vue";

const store = useCompanyStore();
// const route = useRoute();
const router = useRouter();
const error = ref(null);
const company = reactive({
  industry_id: 1,
  owner_id: 1,
  name: "",
  city: "",
});

const onSubmit = async () => {
  const { err, data } = await store.store("companies", company);
  error.value = err;
  if (data?.status == 201) {
    router.push({ name: "companies.index" });
  }
};
</script>

<template>
  <HeaderTwo>Dodawanie</HeaderTwo>
  <AppAlert v-if="error" type="danger">{{ error.message }}</AppAlert>
  <form @submit.prevent="onSubmit">
    <div>
      <div class="mb-1">
        <InputField
          v-model="company.name"
          name="name"
          id="name"
          placeholder="Nazwa firmy"
        />
      </div>
      <div class="mb-1">
        <InputField
          v-model="company.city"
          name="city"
          id="city"
          placeholder="Miasto"
        />
      </div>
      <RouterLink :to="{ name: 'companies.index' }" class="btn mr-3"
        >Powrót</RouterLink
      >
      <button type="submit">Wyślij</button>
    </div>
  </form>
</template>
