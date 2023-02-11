<script setup>
defineProps({ title: { type: String } });
</script>

<template>
  <td :title="title" class="border-b-[1px] border-gray-500 py-1"><slot /></td>
</template>
