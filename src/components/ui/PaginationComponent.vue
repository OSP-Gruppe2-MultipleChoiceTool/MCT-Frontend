<template>
  <div class="flex justify-between">
    <p>Zeige 1-6 von 999 Aufgaben</p>
    <div class="flex gap-x-2 ml-auto">
      <button-component>
        Zurück
      </button-component>
      <button-component background-color="bg-[#1A2238]" text-color="text-gray-300">
        1
      </button-component>
      <button-component>
        2
      </button-component>
      <button-component>
        3
      </button-component>
      <button-component>
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
