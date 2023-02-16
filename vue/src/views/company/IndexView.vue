<script setup>
import { useStore } from "@/stores/store.js";
import AppAlert from "@/components/AppAlert.vue";
import HeaderTwo from "@/components/HeaderTwo.vue";
import TableHeader from "@/components/TableHeader.vue";
import TableHeaderRow from "@/components/TableHeaderRow.vue";
import TableData from "@/components/TableData.vue";

const store = useStore();

const { err, collection } = await store.all("companies");

const shortString = (myString) => {
  return myString.substring(0, 4);
};
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
        <TableHeader>LP</TableHeader>
        <TableHeader>ID</TableHeader>
        <TableHeader>Nazwa</TableHeader>
        <TableHeader>Gałąź</TableHeader>
        <TableHeader>NIP/Regon</TableHeader>
      </TableHeaderRow>
    </thead>
    <tbody>
      <tr v-for="(item, index) in collection" :key="item.id">
        <TableData>
          <RouterLink
            :to="{ name: 'companies.show', params: { id: item.id } }"
            title="Pokaż"
            >{{ index + 1 }}</RouterLink
          >
        </TableData>
        <TableData>
          <RouterLink
            :to="{ name: 'companies.show', params: { id: item.id } }"
            :title="item.id"
            >{{ shortString(item.id) }}</RouterLink
          >
        </TableData>
        <TableData>
          <RouterLink
            :to="{ name: 'companies.show', params: { id: item.id } }"
            title="Pokaż"
            >{{ item.name }}</RouterLink
          >
        </TableData>
        <TableData>
          <RouterLink
            v-if="item.industry"
            :to="{ name: 'industries.show', params: { id: item.industry.id } }"
            title="Przejdź"
            >{{ item.industry?.name }}</RouterLink
          >
        </TableData>
        <TableData :title="item.regon">{{ item.nip }}</TableData>
      </tr>
    </tbody>
  </table>
  <AppAlert v-else>Brak danych</AppAlert>
</template>
