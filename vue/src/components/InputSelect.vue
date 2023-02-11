<script setup>
defineProps({
  items: { type: Array, required: true },
  id: { type: String },
  placeholder: { type: String, default: "Wybierz" },
  modelValue: { type: String },
});

defineEmits(["update:modelValue"]);
</script>

<template>
  <select
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    :id="id"
    class="border border-gray-900 hover:border-black focus:outline-none focus:border-black bg-white p-2 w-full"
  >
    <option disabled value="">{{ placeholder }}</option>
    <option v-for="item in items" :key="item.id" :value="item.id">
      {{ item.name }}
    </option>
  </select>
</template>
