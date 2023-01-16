<script setup>
import { useCompanyStore } from "@/stores/company.js";
import AppAlert from "@/components/AppAlert.vue";
import HeaderTwo from "@/components/HeaderTwo.vue";
import TableData from "@/components/TableData.vue";

const store = useCompanyStore();

const { err, collection } = await store.all("http://127.0.0.1:3333/companies");
</script>

<template>
  <HeaderTwo>Firmy</HeaderTwo>
  <AppAlert v-if="err" type="danger">{{ err.message }}</AppAlert>
  <table v-if="collection.length" class="w-full text-left">
    <thead>
      <tr class="border-t-[1px] border-black">
        <th class="border-b-[1px] border-black">#</th>
        <th class="border-b-[1px] border-black">Nazwa</th>
        <th class="border-b-[1px] border-black">Miasto</th>
        <th class="border-b-[1px] border-black">Numer telefonu</th>
        <th class="border-b-[1px] border-black">Utworzono</th>
        <th class="border-b-[1px] border-black">Zaktualizowano</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="company in collection" :key="company.id">
        <TableData>{{ company.id }}</TableData>
        <TableData>{{ company.name }}</TableData>
        <TableData>{{ company.city }}</TableData>
        <TableData>{{ company.phone_number }}</TableData>
        <TableData>{{ company.created_at }}</TableData>
        <TableData>{{ company.updated_at }}</TableData>
      </tr>
    </tbody>
  </table>
  <AppAlert v-else>Brak danych</AppAlert>
</template>
