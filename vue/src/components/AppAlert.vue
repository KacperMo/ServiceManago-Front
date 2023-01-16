<script setup>
import { computed } from "vue";

const props = defineProps({
  type: {
    type: String,
    default: "primary",
  },
});

const alertClass = computed(() => {
  if (props.type == "danger") {
    return "bg-red-500";
  }

  return "bg-yellow-300";
});
console.log(props.type);
</script>
<template>
  <div :class="alertClass" class="py-1">
    <slot />
  </div>
</template>
