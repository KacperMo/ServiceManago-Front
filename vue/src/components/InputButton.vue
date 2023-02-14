<script setup>
defineProps({
  type: { type: String, default: "submit" },
});
</script>

<template>
  <button
    :type="type"
    class="border-[1px] border-black dark:border-gray-600 px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 text-sm sm:text-sm md:text-base lg:text-lg"
  >
    <slot>Wyślij</slot>
  </button>
</template>
