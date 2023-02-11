<script setup>
import { useRoute } from "vue-router";
import { useStore } from "@/stores/store.js";
import AppAlert from "@/components/AppAlert.vue";
import HeaderTwo from "@/components/HeaderTwo.vue";
import TableData from "@/components/TableData.vue";

const route = useRoute();
const store = useStore();

const { err, data } = await store.getOne("categories", route.params.id);
</script>

<template>
  <HeaderTwo>Kategoria</HeaderTwo>
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
    </tbody>
  </table>
  <AppAlert v-else>Brak danych</AppAlert>
  <p class="py-3">
    <RouterLink :to="{ name: 'categories.index' }" class="btn mr-2"
      >Powrót</RouterLink
    >
    <!-- <RouterLink
      :to="{ name: 'industries.edit', params: { id: route.params.id } }"
      class="btn"
      >Edytuj</RouterLink
    > -->
  </p>
</template>
