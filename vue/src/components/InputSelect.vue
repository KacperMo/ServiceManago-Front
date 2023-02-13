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
    class="border border-gray-500 bg-gray-50 hover:border-black hover:bg-white focus:outline-none focus:border-black focus:bg-white p-2 w-full text-base sm:text-base md:text-base lg:text-lg xl:text-xl 2xl:text-2xl"
  >
    <option disabled value="">{{ placeholder }}</option>
    <option v-for="item in items" :key="item.id" :value="item.id">
      {{ item.name }}
    </option>
  </select>
</template>
