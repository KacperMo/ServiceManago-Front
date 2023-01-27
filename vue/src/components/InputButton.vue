<script setup>
defineProps({
  type: { type: String, default: "submit" },
});
</script>

<template>
  <button
    :type="type"
    class="border-[1px] border-black px-2 py-0.5 hover:bg-gray-100"
  >
    <slot>Wyślij</slot>
  </button>
</template>
