<template>
  <input
    v-if="!props.isTextArea"
    :value="props.value"
    @input="updateValue"
    :placeholder="props.placeholder"
    :required="props.required"
    :class="[$attrs.class, 'block w-full text-sm h-10 px-4 text-slate-900 bg-gray-100 dark:bg-gray-300 rounded-[8px] border border-slate-200 appearance-none focus:outline-none-500 overflow-ellipsis overflow-hidden']"
    type="text"
  />
  <textarea
    v-if="props.isTextArea"
    :value="props.value"
    @input="updateValue"
    :placeholder="props.placeholder"
    :required="props.required"
    :rows="5"
    :class="[$attrs.class, 'block w-full text-sm h-full px-4 text-slate-900 bg-gray-100 dark:bg-gray-300 rounded-[8px] border border-slate-200 appearance-none focus:outline-none-500 overflow-ellipsis overflow-hidden']"
    type="text"
  />
</template>

<script setup lang="ts">
const props = defineProps({
  value: {
    type: String,
    required: false
  },
  isTextArea: {
    type: Boolean,
    default: false,
    required: false
  },
  placeholder: {
    type: String,
    default: 'Suche...',
    required: false
  },
  required: {
    type: Boolean,
    default: false,
    required: false
  }
});

const emit = defineEmits(['update:value']);
const updateValue = (event: Event) => {
  emit('update:value', (event.target as HTMLInputElement | HTMLTextAreaElement).value);
};
</script>

<style scoped>

</style>
