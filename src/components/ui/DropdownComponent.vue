<template>
  <div class="h-10 relative bg-gray-100 rounded-lg flex items-center px-2 cursor-pointer select-none" @click="toggleDropdown">
    <p>Alle Typen...</p>
    <icon-chevron-down class="absolute right-2"/>
    <div v-if="dropdownOpen" class="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-lg mt-1 z-10">
      <p class="px-4 py-2 hover:bg-gray-100 cursor-pointer">Programmierung</p>
      <p class="px-4 py-2 hover:bg-gray-100 cursor-pointer">Datenbanken</p>
      <p class="px-4 py-2 hover:bg-gray-100 cursor-pointer">Jucktnicht</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconChevronDown from '@/components/icons/IconChevronDown.vue'
import { ref } from 'vue'

const dropdownOpen = ref(false);

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}
</script>

<style scoped>

</style>
