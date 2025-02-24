<template>
  <button
    class="w-full flex gap-x-2 items-center cursor-pointer p-3 py-1 rounded-lg"
    :class="[props.backgroundColor, props.textColor]">
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
  }
});
</script>

<style scoped>

</style>
