<script setup>
import { useRoute } from "vue-router";
import { useCompanyStore } from "@/stores/company.js";
import AppAlert from "@/components/AppAlert.vue";
import HeaderTwo from "@/components/HeaderTwo.vue";
import TableData from "@/components/TableData.vue";

const route = useRoute();
const store = useCompanyStore();

const { err, data } = await store.getOne("companies", route.params.id);
console.log(err, data);
</script>

<template>
  <HeaderTwo>Firma</HeaderTwo>
  <AppAlert v-if="err" type="danger">{{ err.message }}</AppAlert>
  <table v-if="data" class="w-full text-left">
    <tbody>
      <tr>
        <TableData>#</TableData>
        <TableData>{{ data.id }}</TableData>
      </tr>
      <tr>
        <TableData>Nazwa</TableData>
        <TableData>{{ data.name }}</TableData>
      </tr>
      <tr>
        <TableData>Miasto</TableData>
        <TableData>{{ data.city }}</TableData>
      </tr>
    </tbody>
  </table>
  <AppAlert v-else>Brak danych</AppAlert>
  <p class="py-3">
    <RouterLink :to="{ name: 'companies.index' }" class="btn"
      >Powrót</RouterLink
    >
  </p>
</template>
