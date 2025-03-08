<template>
  <div class="h-10 w-full relative bg-gray-100 dark:bg-gray-300 rounded-lg flex items-center px-2 cursor-pointer select-none dark:text-main-blue" @click="toggleDropdown">
    <input
      v-model="internalValue"
      @input="handleInputEvent"
      placeholder="Suchen oder erstellen..."
      class="w-full border-none bg-transparent focus:outline-none"
    />
    <icon-chevron-down class="absolute right-2 bg-gray-100 dark:bg-gray-300"/>
    <div v-if="dropdownOpen && filteredElements.length > 0" class="absolute top-full left-0 w-full bg-gray-100 dark:bg-gray-300 border border-main-blue dark:border-gray-400 rounded-lg mt-1 z-10">
      <p class="px-4 py-2 hover:bg-gray-400 cursor-pointer" v-for="(element, index) in filteredElements" @click="handleSelectEvent(element)">{{ element }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconChevronDown from '@/components/icons/IconChevronDown.vue'
import { computed, type PropType, ref, watch } from 'vue'

const emits = defineEmits(['update:modelValue']);
const props = defineProps({
  elements: {
    required: true,
    type: Array as PropType<string[]>
  },
  modelValue: {
    required: false,
    type: String,
    default: ''
  }
});

const dropdownOpen = ref(false);
const internalValue = ref<string>(props.modelValue);

watch(() => props.modelValue, (newValue) => {
  internalValue.value = newValue;
});

const filteredElements = computed(() => {
  if (!internalValue.value) {
    return props.elements;
  }

  const searchTerm = internalValue.value.toLowerCase();

  return props.elements.filter((element) =>
    element.toLowerCase().includes(searchTerm)
  );
});

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const handleSelectEvent = (element: string) => {
  internalValue.value = element;
  emits('update:modelValue', internalValue.value)
}

const handleInputEvent = () => {
  emits('update:modelValue', internalValue.value)
}
</script>

<style scoped>

</style>
