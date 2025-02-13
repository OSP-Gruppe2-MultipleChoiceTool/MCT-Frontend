<template>
  <main class="w-full py-4 overflow-y-scroll">
    <div class="flex flex-col gap-y-3 pb-3">
      <div class="w-full flex items-center pb-5 pt-2 gap-x-5 max-h-10">
        <searchbar-component class="w-5/6" />
        <dropdown-component class="w-1/6" />
      </div>
      <div class="w-full flex justify-between">
        <div class="flex gap-x-2">
          <button-component
            background-color="bg-gray-300 hover:bg-[#1A2238]"
            text-color="hover:text-gray-300"
          >
            <icon-edit-square />
            Import CSV
          </button-component>
          <button-component
            background-color="bg-gray-300 hover:bg-[#1A2238]"
            text-color="hover:text-gray-300"
          >
            <icon-edit-square />
            Export
          </button-component>
          <button-component
            background-color="bg-gray-300 hover:bg-[#1A2238]"
            text-color="hover:text-gray-300"
          >
            <icon-edit-square />
            Share
          </button-component>
        </div>
        <div class="flex gap-x-2 ml-auto">
          <button-component
            background-color="bg-[#1A2238] hover:bg-[#FF6A3D]"
            text-color="text-gray-300 hover:text-[#1A2238]"
          >
            <icon-plus />
            Neue Frage
          </button-component>
        </div>
      </div>
    </div>

    <div class="h-screen grid grid-rows-6 gap-y-2 pb-6">
      <question-listing-component />
      <question-listing-component />
      <question-listing-component />
      <question-listing-component />
      <question-listing-component />
      <question-listing-component />
    </div>

    <pagination-component />
  </main>
</template>

<script setup lang="ts">
import QuestionListingComponent from '@/components/features/question/QuestionListingComponent.vue'
import SearchbarComponent from '@/components/ui/SearchbarComponent.vue'
import DropdownComponent from '@/components/ui/DropdownComponent.vue'
import IconEditSquare from '@/components/icons/IconEditSquare.vue'
import IconPlus from '@/components/icons/IconPlus.vue'
import ButtonComponent from '@/components/ui/ButtonComponent.vue'
import PaginationComponent from '@/components/ui/PaginationComponent.vue'
</script>
