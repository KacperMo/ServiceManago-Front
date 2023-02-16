<script setup>
import { useRoute } from "vue-router";
import { useStore } from "@/stores/store.js";
import AppAlert from "@/components/AppAlert.vue";
import HeaderTwo from "@/components/HeaderTwo.vue";
import TableData from "@/components/TableData.vue";

const route = useRoute();
const store = useStore();

const { err, data } = await store.getOne("companies", route.params.id);
</script>

<template>
  <HeaderTwo>Firma</HeaderTwo>
  <AppAlert v-if="err" type="danger">{{ err.message }}</AppAlert>
  <table v-if="data" class="w-full text-left">
    <tbody>
      <tr>
        <TableData>ID</TableData>
        <TableData>{{ data.id }}</TableData>
      </tr>
      <tr>
        <TableData>Nazwa</TableData>
        <TableData>{{ data.name }}</TableData>
      </tr>
      <tr>
        <TableData>Gałąź</TableData>
        <TableData>
          <RouterLink
            v-if="data.industry"
            :to="{ name: 'industries.show', params: { id: data.industry.id } }"
          >
            {{ data.industry.name }}
          </RouterLink>
        </TableData>
      </tr>
      <!-- <tr>
        <TableData>Kategoria</TableData>
        <TableData>
          <RouterLink
            v-if="data.category"
            :to="{ name: 'categories.show', params: { id: data.category.id } }"
          >
            {{ data.category.name }}
          </RouterLink>
        </TableData>
      </tr> -->
      <tr>
        <TableData>NIP</TableData>
        <TableData>{{ data.nip }}</TableData>
      </tr>
      <tr>
        <TableData>Regon</TableData>
        <TableData>{{ data.regon }}</TableData>
      </tr>
      <tr>
        <TableData>Województwo</TableData>
        <TableData>{{ data.province }}</TableData>
      </tr>
      <tr>
        <TableData>Dzielnica</TableData>
        <TableData>{{ data.district }}</TableData>
      </tr>
      <tr>
        <TableData>Gmina</TableData>
        <TableData>{{ data.community }}</TableData>
      </tr>
      <tr>
        <TableData>Miasto</TableData>
        <TableData>{{ data.city }}</TableData>
      </tr>
      <tr>
        <TableData>Numer nieruchomości</TableData>
        <TableData>{{ data.property_number }}</TableData>
      </tr>
      <tr>
        <TableData>Numer mieszkania</TableData>
        <TableData>{{ data.apartment_number }}</TableData>
      </tr>
      <tr>
        <TableData>Kod pocztowy</TableData>
        <TableData>{{ data.zip_code }}</TableData>
      </tr>
      <tr>
        <TableData>Street</TableData>
        <TableData>{{ data.street }}</TableData>
      </tr>
      <tr>
        <TableData>Poczta</TableData>
        <TableData>{{ data.post_city }}</TableData>
      </tr>
      <tr>
        <TableData>Telefon</TableData>
        <TableData>{{ data.phone_number }}</TableData>
      </tr>
      <tr>
        <TableData>Email</TableData>
        <TableData>
          <a :href="`mailto:${data.email}`">{{ data.email }}</a>
        </TableData>
      </tr>
    </tbody>
  </table>
  <AppAlert v-else>Brak danych</AppAlert>
  <p class="py-3">
    <RouterLink :to="{ name: 'companies.index' }" class="btn mr-2"
      >Powrót</RouterLink
    >
    <RouterLink
      :to="{ name: 'companies.edit', params: { id: route.params.id } }"
      class="btn"
      >Edytuj</RouterLink
    >
  </p>
</template>
