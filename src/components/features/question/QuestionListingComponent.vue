<template>
  <article class="w-full bg-gray-100 rounded px-3 py-1 flex flex-col justify-around relative">
    <div class="absolute bg-gray-500/50 rounded-full -top-2 -left-2 text-lg p-0.5">
      <icon-check class="text-gray-500 hover:text-[#FF6A3D]" />
    </div>
    <div class="absolute top-2 right-2 flex">
      <icon-edit-square class="hover:text-[#FF6A3D] cursor-pointer" />
      <icon-trash-bin class="hover:text-[#FF6A3D] cursor-pointer" />
    </div>
    <div class="flex gap-2 items-center text-xs">
      <p class="bg-gray-200 px-3 py-1 rounded-full">Programmierung</p>
      <p>ID: Q-001</p>
    </div>
    <p>
      Explain the concept of object-oriented programming in your own words.
    </p>
    <div class="flex gap-2 text-xs divide-x">
      <p class="pr-2">4 options</p>
      <p>Erstellt: 13.02.2025</p>
    </div>
  </article>
</template>

<script setup lang="ts">
import IconEditSquare from '@/components/icons/IconEditSquare.vue'
import IconTrashBin from '@/components/icons/IconTrashBin.vue'
import IconCheck from '@/components/icons/IconCheck.vue'
</script>

<style scoped>

</style>
