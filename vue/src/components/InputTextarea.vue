<script setup>
defineProps({
  id: { type: String },
  placeholder: { type: String },
  modelValue: { type: String },
});

defineEmits(["update:modelValue"]);
</script>

<template>
  <textarea
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    :id="id"
    class="border border-gray-900 hover:border-black focus:outline-none focus:border-black p-1 w-full"
    :placeholder="placeholder"
  ></textarea>
</template>
