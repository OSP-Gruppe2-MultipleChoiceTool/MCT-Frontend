<template>
  <button
    class="w-full h-full flex gap-x-2 items-center justify-center cursor-pointer p-3 py-1 rounded-lg"
    :class="[props.backgroundColor, props.textColor, props.customClass]">
    <slot />
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  backgroundColor: {
    type: String,
    required: false,
    default: 'bg-gray-300'
  },
  textColor: {
    type: String,
    required: false,
    default: ''
  },
  customClass: {
    type: String,
    required: false,
    default: ''
  }
});
</script>

<style scoped>

</style>
