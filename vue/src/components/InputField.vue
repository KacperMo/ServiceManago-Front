<script setup>
defineProps({
  type: { type: String, default: "text" },
  id: { type: String },
  placeholder: { type: String },
  modelValue: { type: String },
});

defineEmits(["update:modelValue"]);
</script>

<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    :type="type"
    :id="id"
    class="dark:text-black border border-gray-500 dark:border-gray-500 bg-gray-50 dark:bg-gray-600 hover:border-black hover:bg-white dark:hover:bg-gray-400 dark:hover:text-black focus:outline-none focus:border-black dark:focus:border-gray-200 dark:focus:text-black focus:bg-white dark:focus:bg-gray-400 p-1 w-full text-base sm:text-base md:text-base lg:text-lg xl:text-xl 2xl:text-2xl"
    :placeholder="placeholder"
  />
</template>
