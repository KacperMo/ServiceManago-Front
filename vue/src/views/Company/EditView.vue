<script setup>
import { ref, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCompanyStore } from "@/stores/company.js";
import AppAlert from "@/components/AppAlert.vue";
import HeaderTwo from "@/components/HeaderTwo.vue";
import InputField from "@/components/InputField.vue";

const route = useRoute();
const router = useRouter();
const store = useCompanyStore();
const error = ref(null);

const { err: error1, data } = await store.getOne("companies", route.params.id);
error.value = error1;

const company = reactive({
  id: data?.id,
  name: data?.name,
  city: data?.city,
});

const onSubmit = async () => {
  // console.log("on submit");
  // console.log(company);
  const editingCompany = {
    id: company.id,
    name: company.name,
    city: company.city,
  };
  const { err: error1, data } = await store.update(
    "companies",
    company.id,
    editingCompany
  );
  error.value = error1;

  if (data.status == 200) {
    router.push({ name: "companies.show", params: { id: company.id } });
  }
};

const destroy = async (id) => {
  const { err: error1, data } = await store.destroy("companies", id);
  error.value = error1;
  if (data?.status == 204) {
    router.push({ name: "companies.index" });
  }
};
</script>

<template>
  <HeaderTwo>Edycja</HeaderTwo>
  <AppAlert v-if="error" type="danger">{{ error.message }}</AppAlert>
  <form v-if="data" @submit.prevent="onSubmit">
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
      <a @click="destroy(company.id)" href="#delete" class="btn btn-danger ml-3"
        >Usuń</a
      >
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
