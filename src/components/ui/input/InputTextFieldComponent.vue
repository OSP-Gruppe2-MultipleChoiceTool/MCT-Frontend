<template>
  <input
    v-if="!props.isTextArea"
    :placeholder="props.placeholder"
    class="block w-full text-sm h-10 px-4 text-slate-900 bg-gray-100 dark:bg-gray-300 rounded-[8px] border border-slate-200 appearance-none focus:outline-none
    -500 overflow-ellipsis overflow-hidden text-nowrap"
    type="text"
  />
  <textarea
    v-if="props.isTextArea"
    :placeholder="props.placeholder"
    :rows="5"
    class="block w-full text-sm h-full px-4 text-slate-900 bg-gray-100 dark:bg-gray-300 rounded-[8px] border border-slate-200 appearance-none focus:outline-none
    -500 overflow-ellipsis overflow-hidden text-nowrap"
    type="text"
  />
</template>

<script setup lang="ts">
const props = defineProps({
  isTextArea: {
    type: Boolean,
    default: false,
    required: false
  },
  placeholder: {
    type: String,
    default: 'Suche...',
    required: false
  }
});
</script>

<style scoped>

</style>
