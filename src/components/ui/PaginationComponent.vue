<template>
  <div class="flex justify-between dark:text-gray-200">
    <p>Zeige 1-6 von 999 Aufgaben</p>
    <div class="flex gap-x-2 ml-auto">
      <button-component
        background-color="bg-main-blue dark:bg-gray-600 hover:bg-main-orange"
        text-color="text-gray-300 hover:text-main-blue">
        Zurück
      </button-component>
      <button-component
        background-color="bg-main-orange hover:bg-gray-500"
        text-color="text-gray-300 dark:text-main-blue hover:text-main-orange">
        1
      </button-component>
      <button-component
        background-color="bg-main-blue dark:bg-gray-600 hover:bg-main-orange"
        text-color="text-gray-300 hover:text-main-blue">
        2
      </button-component>
      <button-component
        background-color="bg-main-blue dark:bg-gray-600 hover:bg-main-orange"
        text-color="text-gray-300 hover:text-main-blue">
        3
      </button-component>
      <button-component
        background-color="bg-main-blue dark:bg-gray-600 hover:bg-main-orange"
        text-color="text-gray-300 hover:text-main-blue">
        Vorwärts
      </button-component>
    </div>
  </div>
</template>

<script setup lang="ts">
import ButtonComponent from '@/components/ui/ButtonComponent.vue'
</script>

<style scoped>

</style>
