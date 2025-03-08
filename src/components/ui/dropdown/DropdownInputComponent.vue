<template>
  <div class="h-10 w-full relative bg-gray-100 dark:bg-gray-300 rounded-lg flex items-center px-2 cursor-pointer select-none dark:text-main-blue" @click="toggleDropdown">
    <input
      v-model="currentValue"
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
import { computed, type PropType, ref } from 'vue'

const emits = defineEmits(['onInputChange']);
const props = defineProps({
  elements: {
    required: true,
    type: Array as PropType<string[]>
  },
  currentValue: {
    required: false,
    type: String,
    default: ''
  }
});

const dropdownOpen = ref(false);
const currentValue = ref<string>(props.currentValue);

const filteredElements = computed(() => {
  if (!currentValue.value) {
    return props.elements;
  }

  const searchTerm = currentValue.value.toLowerCase();

  return props.elements.filter((element) =>
    element.toLowerCase().includes(searchTerm)
  );
});

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const handleSelectEvent = (element: string) => {
  currentValue.value = element;
  emits('onInputChange', currentValue.value)
}

const handleInputEvent = () => {
  emits('onInputChange', currentValue.value)
}
</script>

<style scoped>

</style>
