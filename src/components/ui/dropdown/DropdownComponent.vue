<template>
  <div class="h-10 w-full relative bg-gray-100 dark:bg-gray-300 rounded-lg flex items-center px-2 cursor-pointer select-none dark:text-main-blue" @click="toggleDropdown">
    <p>{{ currentValue ?? 'Bitte auswählen...' }}</p>
    <icon-chevron-down class="absolute right-2 bg-gray-100 dark:bg-gray-300"/>
    <div v-if="dropdownOpen" class="absolute top-full left-0 w-full bg-gray-100 dark:bg-gray-300 border border-main-blue dark:border-gray-400 rounded-lg mt-1 z-10">
      <p class="px-4 py-2 hover:bg-gray-400 bg-gray-200 cursor-pointer" v-if="hasResetElement" @click="handleReset">{{ props.resetElement }}</p>
      <p class="px-4 py-2 hover:bg-gray-400 cursor-pointer" v-for="(element, index) in props.elements" @click="handleClickEvent(element)">{{ element }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconChevronDown from '@/components/icons/IconChevronDown.vue'
import { computed, type PropType, ref } from 'vue'

const emits = defineEmits(['onSelect', 'onReset']);
const props = defineProps({
  resetElement: {
    required: false,
    type: String
  },
  elements: {
    required: true,
    type: Array as PropType<string[]>
  }
});

const dropdownOpen = ref(false);
const currentValue = ref<string|null>(null);

const hasResetElement = computed(() => props.resetElement !== undefined);

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const handleClickEvent = (element: string) => {
  currentValue.value = element;
  emits('onSelect', element);
}

const handleReset = () => {
  currentValue.value = null;
  emits('onReset');
}
</script>

<style scoped>

</style>
