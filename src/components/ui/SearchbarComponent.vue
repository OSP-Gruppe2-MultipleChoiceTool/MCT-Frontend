<template>
  <input
    v-if="!props.isTextArea"
    value=""
    placeholder="Suche..."
    class="block w-full text-sm h-10 px-4 text-slate-900 bg-gray-100 rounded-[8px] border border-slate-200 appearance-none focus:outline-none
    -500 overflow-ellipsis overflow-hidden text-nowrap"
    type="text"
  />
  <textarea
    v-if="props.isTextArea"
    value=""
    :rows="5"
    placeholder="Suche..."
    class="block w-full text-sm h-10 px-4 text-slate-900 bg-gray-100 rounded-[8px] border border-slate-200 appearance-none focus:outline-none
    -500 overflow-ellipsis overflow-hidden text-nowrap h-full"
    type="text"
  />
</template>

<script setup lang="ts">
const props = defineProps( {
  isTextArea: {
    type: Boolean,
    default: false,
    required: false
  },

})

</script>

<style scoped>

</style>
