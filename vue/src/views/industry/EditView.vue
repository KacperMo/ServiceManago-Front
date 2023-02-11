<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "@/stores/store.js";
import AppAlert from "@/components/AppAlert.vue";
import HeaderTwo from "@/components/HeaderTwo.vue";
import InputGroup from "@/components/InputGroup.vue";
import InputField from "@/components/InputField.vue";
import InputButton from "@/components/InputButton.vue";
import ValidationError from "@/components/ValidationError.vue";

const route = useRoute();
const router = useRouter();
const store = useStore();
const error = ref(null);

const { err, data } = await store.getOne("industries", route.params.id);
error.value = err;
const validationErrors = ref([]);

const name = ref(data.name);

const onSubmit = async () => {
  const payload = { name: name.value };

  const { err, validationErr, data } = await store.update(
    "industries",
    route.params.id,
    payload
  );

  error.value = err;
  validationErrors.value = validationErr;

  if (data?.status == 200) {
    router.push({ name: "industries.show", params: { id: route.params.id } });
  }
};

const destroy = async (id) => {
  const { err, data } = await store.destroy("industries", id);
  error.value = err;
  if (data?.status == 204) {
    router.push({ name: "industries.index" });
  }
};
</script>

<template>
  <HeaderTwo>Edycja</HeaderTwo>
  <AppAlert v-if="error" type="danger">{{ error.message }}</AppAlert>
  <form v-if="data" @submit.prevent="onSubmit">
    <InputGroup>
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
      :to="{ name: 'industries.show', params: { id: route.params.id } }"
      class="btn"
      >Powrót</RouterLink
    >
  </p>
</template>
