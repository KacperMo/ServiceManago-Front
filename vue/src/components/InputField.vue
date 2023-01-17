<script setup>
defineProps({
  type: { type: String, default: "text" },
  name: { type: String, required: true },
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
    :name="name"
    :id="id"
    class="border border-gray-900 hover:border-black focus:outline-none focus:border-black p-1 w-6/12"
    :placeholder="placeholder"
  />
</template>
