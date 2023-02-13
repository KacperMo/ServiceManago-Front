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
    class="border border-gray-500 bg-gray-50 hover:border-black hover:bg-white focus:outline-none focus:border-black focus:bg-white p-1 w-full text-base sm:text-base md:text-base lg:text-lg xl:text-xl 2xl:text-2xl"
    :placeholder="placeholder"
  />
</template>
