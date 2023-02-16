<script setup>
defineProps({
  items: { type: Array, required: true },
  id: { type: String },
  placeholder: { type: String, default: "Wybierz" },
  modelValue: { type: [String, Number] },
});

defineEmits(["update:modelValue"]);
</script>

<template>
  <select
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    :id="id"
    class="border border-gray-500 dark:border-gray-500 bg-gray-50 dark:bg-gray-600 hover:border-black hover:bg-white dark:hover:bg-gray-400 focus:outline-none focus:border-black dark:focus:border-gray-200 focus:bg-white dark:focus:text-black dark:hover:text-black p-2 w-full text-base sm:text-base md:text-base lg:text-lg xl:text-xl 2xl:text-2xl"
  >
    <option disabled value="">{{ placeholder }}</option>
    <option v-for="item in items" :key="item.id" :value="item.id">
      {{ item.name }}
    </option>
  </select>
</template>
