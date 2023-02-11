<script setup>
import { useStore } from "@/stores/store.js";
import AppAlert from "@/components/AppAlert.vue";
import HeaderTwo from "@/components/HeaderTwo.vue";
import TableHeader from "@/components/TableHeader.vue";
import TableHeaderRow from "@/components/TableHeaderRow.vue";
import TableData from "@/components/TableData.vue";

const store = useStore();

const { err, collection } = await store.all("companies");
// console.log(err);
</script>

<template>
  <HeaderTwo>Firmy</HeaderTwo>
  <AppAlert v-if="err" type="danger">{{ err }}</AppAlert>
  <div v-else class="mb-5">
    <RouterLink :to="{ name: 'companies.create' }" class="btn"
      >Dodaj</RouterLink
    >
  </div>
  <table v-if="collection.length" class="w-full text-left">
    <thead>
      <TableHeaderRow>
        <TableHeader>#</TableHeader>
        <TableHeader>Nazwa</TableHeader>
        <TableHeader>Gałąź</TableHeader>
        <TableHeader>Kategoria</TableHeader>
        <!-- <TableHeader>Miasto</TableHeader>
        <TableHeader>Numer telefonu</TableHeader> -->
        <TableHeader>NIP/Regon</TableHeader>
      </TableHeaderRow>
    </thead>
    <tbody>
      <tr v-for="company in collection" :key="company.id">
        <TableData :title="company.id">{{
          company.id.substring(0, 4)
        }}</TableData>
        <TableData>
          <RouterLink
            :to="{ name: 'companies.show', params: { id: company.id } }"
            >{{ company.name }}</RouterLink
          >
        </TableData>
        <TableData>{{ company.industry?.name }}</TableData>
        <TableData>{{ company.category?.name }}</TableData>
        <!-- <TableData>{{ company.city }}</TableData>
        <TableData>{{ company.phone_number }}</TableData> -->
        <TableData>{{ company.nip }} {{ company.regon }}</TableData>
      </tr>
    </tbody>
  </table>
  <AppAlert v-else>Brak danych</AppAlert>
</template>
