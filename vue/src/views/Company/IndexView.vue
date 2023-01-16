<script setup>
import { useCompanyStore } from "@/stores/company.js";
import AppAlert from "@/components/AppAlert.vue";
import HeaderTwo from "@/components/HeaderTwo.vue";
import TableHeader from "@/components/TableHeader.vue";
import TableHeaderRow from "@/components/TableHeaderRow.vue";
import TableData from "@/components/TableData.vue";

const store = useCompanyStore();

const { err, collection } = await store.all("http://127.0.0.1:3333/companies");
</script>

<template>
  <HeaderTwo>Firmy</HeaderTwo>
  <AppAlert v-if="err" type="danger">{{ err.message }}</AppAlert>
  <table v-if="collection.length" class="w-full text-left">
    <thead>
      <TableHeaderRow>
        <TableHeader>#</TableHeader>
        <TableHeader>Nazwa</TableHeader>
        <TableHeader>Miasto</TableHeader>
        <TableHeader>Numer telefonu</TableHeader>
        <TableHeader>Utworzono</TableHeader>
        <TableHeader>Zaktualizowano</TableHeader>
      </TableHeaderRow>
    </thead>
    <tbody>
      <tr v-for="company in collection" :key="company.id">
        <TableData>{{ company.id }}</TableData>
        <TableData>
          <RouterLink
            :to="{ name: 'companies.show', params: { id: company.id } }"
            >{{ company.name }}</RouterLink
          >
        </TableData>
        <TableData>{{ company.city }}</TableData>
        <TableData>{{ company.phone_number }}</TableData>
        <TableData>{{ company.created_at }}</TableData>
        <TableData>{{ company.updated_at }}</TableData>
      </tr>
    </tbody>
  </table>
  <AppAlert v-else>Brak danych</AppAlert>
</template>
