<template>
  <label class="inline-flex items-center" @click="isChecked != !isChecked">
    <input type="checkbox" name="answer" class="hidden" v-model="isChecked">
    <span class="w-4 h-4 bg-white text-[#FF6A3D] border border-gray-300 rounded-full transition-all duration-200">
      <icon-check :class="{ 'hidden': !isChecked }" />
    </span>
  </label>
  <searchbar-component />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SearchbarComponent from '@/components/ui/SearchbarComponent.vue'
import IconCheck from '@/components/icons/IconCheck.vue'

const isChecked = ref<boolean>(false);
</script>

<style scoped>

</style>


