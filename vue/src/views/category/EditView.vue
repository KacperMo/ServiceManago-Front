<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "@/stores/store.js";
import AppAlert from "@/components/AppAlert.vue";
import HeaderTwo from "@/components/HeaderTwo.vue";
import InputGroup from "@/components/InputGroup.vue";
import InputLabel from "@/components/InputLabel.vue";
import InputSelect from "@/components/InputSelect.vue";
import InputField from "@/components/InputField.vue";
import InputButton from "@/components/InputButton.vue";
import ValidationError from "@/components/ValidationError.vue";

const route = useRoute();
const router = useRouter();
const store = useStore();
const error = ref(null);

const { err: industryError, collection: industries } = await store.all(
  "industries"
);
error.value = industryError;

const { err, data } = await store.getOne("categories", route.params.id);
error.value = err;
const validationErrors = ref([]);

const industryId = ref(data.industry_id?.toString());
const name = ref(data.name);

const onSubmit = async () => {
  const payload = { industryId: industryId.value, name: name.value };

  const { err, validationErr, data } = await store.update(
    "categories",
    route.params.id,
    payload
  );

  error.value = err;
  validationErrors.value = validationErr;

  if (data?.status == 200) {
    router.push({ name: "categories.show", params: { id: route.params.id } });
  }
};

const destroy = async (id) => {
  if (confirm("Potwierdź")) {
    const { err, data } = await store.destroy("categories", id);
    error.value = err;
    if (data?.status == 204) {
      router.push({ name: "categories.index" });
    }
  }
};
</script>

<template>
  <HeaderTwo>Edycja</HeaderTwo>
  <AppAlert v-if="error" type="danger">{{ error.message }}</AppAlert>
  <form v-if="data" @submit.prevent="onSubmit">
    <InputGroup>
      <InputLabel for="industryId">Gałąź</InputLabel>
      <InputSelect
        v-model="industryId"
        :items="industries"
        id="industryId"
        placeholder="Obowiązkowe"
      ></InputSelect>
      <template v-for="e in validationErrors" :key="e.field">
        <template v-if="e.field == 'industryId'">
          <ValidationError>{{ e.message }}</ValidationError>
        </template>
      </template>
    </InputGroup>
    <InputGroup>
      <InputLabel for="name">Kategoria</InputLabel>
      <InputField v-model="name" name="name" id="name" placeholder="Nazwa" />
      <template v-for="e in validationErrors" :key="e.field">
        <template v-if="e.field == 'name'">
          <ValidationError>{{ e.message }}</ValidationError>
        </template>
      </template>
    </InputGroup>
    <InputButton />
    <a
      @click="destroy(route.params.id)"
      href="#delete"
      class="btn btn-danger ml-3"
      >Usuń</a
    >
  </form>
  <AppAlert v-else>Brak danych</AppAlert>
  <p class="py-3">
    <RouterLink
      :to="{ name: 'categories.show', params: { id: route.params.id } }"
      class="btn"
      >Powrót</RouterLink
    >
  </p>
</template>
