<script setup>
import { computed } from "vue";

const props = defineProps({
  type: { type: String, default: "primary" },
});

const alertClass = computed(() => {
  if (props.type == "danger") {
    return "bg-red-500";
  }

  return "bg-yellow-300";
});
</script>

<template>
  <div :class="alertClass" class="mb-1 mr-1 px-1 py-1">
    <slot />
  </div>
</template>
