<script setup>
defineProps({ for: { type: String, required: true } });
</script>

<template>
  <label
    :for="for"
    class="text-gray-700 dark:text-gray-400 text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg 2xl"
    ><slot
  /></label>
</template>
