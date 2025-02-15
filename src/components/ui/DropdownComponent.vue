<template>
  <div class="h-10 relative bg-gray-100 dark:bg-gray-300 rounded-lg flex items-center px-2 cursor-pointer select-none" @click="toggleDropdown">
    <p>Alle Typen...</p>
    <icon-chevron-down class="absolute right-2"/>
    <div v-if="dropdownOpen" class="absolute top-full left-0 w-full bg-gray-100 dark:bg-gray-300 border border-gray-200 dark:border-gray-400 rounded-lg mt-1 z-10">
      <p class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-400 cursor-pointer" v-for="element in props.elements">{{ element }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconChevronDown from '@/components/icons/IconChevronDown.vue'
import { type PropType, ref } from 'vue'

const props = defineProps({
  elements: {
    required: true,
    type: Array as PropType<string[]>
  }
});

const dropdownOpen = ref(false);

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}
</script>

<style scoped>

</style>
