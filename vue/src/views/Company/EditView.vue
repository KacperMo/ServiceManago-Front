<script setup>
import { ref, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCompanyStore } from "@/stores/company.js";
import AppAlert from "@/components/AppAlert.vue";
import HeaderTwo from "@/components/HeaderTwo.vue";
import InputGroup from "@/components/InputGroup.vue";
import InputField from "@/components/InputField.vue";
import InputButton from "@/components/InputButton.vue";
import ValidationError from "@/components/ValidationError.vue";

const route = useRoute();
const router = useRouter();
const store = useCompanyStore();
const error = ref(null);

const { err: error1, data } = await store.getOne("companies", route.params.id);
error.value = error1;
const validationErrors = ref([]);
const company = reactive({
  industryId: data?.industryId,
  owner_id: 1,
  id: data?.id,
  name: data?.name,
  city: data?.city,
});

const onSubmit = async () => {
  const editingCompany = {
    industryId: 1,
    owner_id: 1,
    id: company.id,
    name: company.name,
    city: company.city,
  };

  const {
    err: error1,
    validationErr,
    data,
  } = await store.update("companies", company.id, editingCompany);

  error.value = error1;
  validationErrors.value = validationErr;

  if (data?.status == 200) {
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
    <InputGroup>
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
    </InputGroup>
    <InputGroup>
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
    </InputGroup>
    <InputButton />
    <a @click="destroy(company.id)" href="#delete" class="btn btn-danger ml-3"
      >Usuń</a
    >
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
