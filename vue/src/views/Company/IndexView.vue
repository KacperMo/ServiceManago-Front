<script setup>
import { useCompanyStore } from "@/stores/company.js";
import AppAlert from "@/components/AppAlert.vue";

const store = useCompanyStore();

const { err, collection } = await store.all("http://127.0.0.1:3333/companies");
</script>

<template>
  <h2>Firmy</h2>
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
        <td class="border-b-[1px] border-black">{{ company.id }}</td>
        <td class="border-b-[1px] border-black">{{ company.name }}</td>
        <td class="border-b-[1px] border-black">{{ company.city }}</td>
        <td class="border-b-[1px] border-black">{{ company.phone_number }}</td>
        <td class="border-b-[1px] border-black">{{ company.created_at }}</td>
        <td class="border-b-[1px] border-black">{{ company.updated_at }}</td>
      </tr>
    </tbody>
  </table>
  <AppAlert v-else>Brak danych</AppAlert>
</template>
