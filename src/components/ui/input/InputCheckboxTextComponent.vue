<template>
  <label class="inline-flex items-center" @click="isChecked != !isChecked">
    <input type="checkbox" name="answer" class="hidden" v-model="isChecked">
    <span class="w-4 h-4 bg-white text-[#FF6A3D] border border-gray-300 rounded-full transition-all duration-200">
      <icon-check :class="{ 'hidden': !isChecked }" />
    </span>
  </label>
  <input-text-field-component
    :placeholder="props.placeholder"
    v-model:value="textValue"
  />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import InputTextFieldComponent from '@/components/ui/input/InputTextFieldComponent.vue'
import IconCheck from '@/components/icons/IconCheck.vue'

const emits = defineEmits(['update:checked', 'update:value']);
const props = defineProps({
  placeholder: {
    type: String,
    required: true
  },
  checked: {
    type: Boolean,
    required: false,
    default: false
  },
  value: {
    type: String,
    required: true
  }
});

const isChecked = ref<boolean>(props.checked ?? false);
watch(isChecked, (newValue) => {
  emits('update:checked', newValue);
});

const textValue = ref<string>('');
watch(textValue, (newValue) => {
  emits('update:value', newValue);
});
</script>

<style scoped>

</style>


