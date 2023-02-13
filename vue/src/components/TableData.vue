<script setup>
defineProps({ title: { type: String } });
</script>

<template>
  <td
    :title="title"
    class="border-b-[1px] border-gray-400 py-1 text-xs sm:text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl"
  >
    <slot />
  </td>
</template>
