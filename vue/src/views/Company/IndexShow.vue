<script setup>
import HeaderTwo from "@/components/HeaderTwo.vue";
</script>

<template>
  <HeaderTwo>Firma</HeaderTwo>
  <p>
    <RouterLink :to="{ name: 'companies.index' }">Powrót</RouterLink>
  </p>
</template>
