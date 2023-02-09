<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "@/stores/store.js";
import AppAlert from "@/components/AppAlert.vue";
import HeaderTwo from "@/components/HeaderTwo.vue";
import InputGroup from "@/components/InputGroup.vue";
import InputField from "@/components/InputField.vue";
import InputSelect from "@/components/InputSelect.vue";
import InputButton from "@/components/InputButton.vue";
import ValidationError from "@/components/ValidationError.vue";

const store = useStore();
const router = useRouter();
const error = ref(null);
const validationErrors = ref([]);
const industryId = ref("0");
const company = reactive({
  industryId: 1,
  owner_id: 1,
  name: "",
  city: "",
});

const { err: industryError, collection: industries } = await store.all(
  "industries"
);
error.value = industryError;
// console.log(error.value, industries);

const { err: categoryError, collection: categories } = await store.all(
  "categories"
);
error.value = categoryError;
// console.log(error.value, categories);

const onSubmit = async () => {
  company.industryId = industryId.value;
  // console.log(company);
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
  <AppAlert v-if="error" type="danger">{{ error }}</AppAlert>
  <form @submit.prevent="onSubmit">
    <InputGroup>
      <InputSelect
        v-model="industryId"
        :items="industries"
        id="industryId"
      ></InputSelect>
    </InputGroup>
    <InputGroup>
      <InputField v-model="company.name" id="name" placeholder="Nazwa firmy" />
      <template v-for="e in validationErrors" :key="e.field">
        <template v-if="e.field == 'name'">
          <ValidationError>{{ e.message }}</ValidationError>
        </template>
      </template>
    </InputGroup>
    <InputGroup>
      <InputField v-model="company.city" id="city" placeholder="Miasto" />
      <template v-for="e in validationErrors" :key="e.field">
        <template v-if="e.field == 'city'">
          <ValidationError>{{ e.message }}</ValidationError>
        </template>
      </template>
    </InputGroup>
    <RouterLink :to="{ name: 'companies.index' }" class="btn mr-3"
      >Powrót</RouterLink
    >
    <InputButton />
  </form>
</template>
