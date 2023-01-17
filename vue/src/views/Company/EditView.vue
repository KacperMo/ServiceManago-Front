<script setup>
import { reactive } from "vue";
import { useRoute } from "vue-router";
import { useCompanyStore } from "@/stores/company.js";
import AppAlert from "@/components/AppAlert.vue";
import HeaderTwo from "@/components/HeaderTwo.vue";
import InputField from "@/components/InputField.vue";

const route = useRoute();
const store = useCompanyStore();
const { err, data } = await store.getOne("companies", route.params.id);
const company = reactive({
  name: data?.name,
  city: data?.city,
});

const onSubmit = () => {
  console.log("on submit");
  console.log(company);
};
</script>

<template>
  <HeaderTwo>Edycja</HeaderTwo>
  <AppAlert v-if="err" type="danger">{{ err.message }}</AppAlert>
  <form v-if="data" @submit.prevent="onSubmit">
    <!-- <input type="text" v-model="company.name" /> -->
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
    <div>
      <button type="submit">Wyślij</button>
    </div>
  </form>
  <AppAlert v-else>Brak danych</AppAlert>
  <p class="py-3">
    <RouterLink
      :to="{ name: 'companies.show', params: { id: route.params.id } }"
      class="btn"
      >Powrót</RouterLink
    >
  </p>
</template>
