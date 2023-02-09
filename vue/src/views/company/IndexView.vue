<script setup>
import { useStore } from "@/stores/store.js";
import AppAlert from "@/components/AppAlert.vue";
import HeaderTwo from "@/components/HeaderTwo.vue";
import TableHeader from "@/components/TableHeader.vue";
import TableHeaderRow from "@/components/TableHeaderRow.vue";
import TableData from "@/components/TableData.vue";

const store = useStore();

const { err, resStatus, collection } = await store.all("companies");
</script>

<template>
  <HeaderTwo>Firmy</HeaderTwo>
  <AppAlert v-if="err" type="danger">{{ err.message }}</AppAlert>
  <div v-if="resStatus != 401" class="mb-5">
    <RouterLink :to="{ name: 'companies.create' }">Dodaj</RouterLink>
  </div>
  <table v-if="collection.length" class="w-full text-left">
    <thead>
      <TableHeaderRow>
        <TableHeader>#</TableHeader>
        <TableHeader>Gałąź</TableHeader>
        <TableHeader>Kategoria</TableHeader>
        <TableHeader>Nazwa</TableHeader>
        <TableHeader>Miasto</TableHeader>
        <TableHeader>Numer telefonu</TableHeader>
        <!-- <TableHeader>Utworzono</TableHeader>
        <TableHeader>Zaktualizowano</TableHeader> -->
      </TableHeaderRow>
    </thead>
    <tbody>
      <tr v-for="company in collection" :key="company.id">
        <TableData>{{ company.id }}</TableData>
        <TableData>{{ company.industry?.name }}</TableData>
        <TableData>{{ company.category?.name }}</TableData>
        <TableData>
          <RouterLink
            :to="{ name: 'companies.show', params: { id: company.id } }"
            >{{ company.name }}</RouterLink
          >
        </TableData>
        <TableData>{{ company.city }}</TableData>
        <TableData>{{ company.phone_number }}</TableData>
        <!-- <TableData>{{ company.created_at }}</TableData>
        <TableData>{{ company.updated_at }}</TableData> -->
      </tr>
    </tbody>
  </table>
  <AppAlert v-else>Brak danych</AppAlert>
</template>
