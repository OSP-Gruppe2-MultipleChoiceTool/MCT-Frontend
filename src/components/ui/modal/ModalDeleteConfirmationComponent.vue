<template>
  <modal-wrapper>
    <div
      class="w-3/4 md:w-1/2 lg:w-1/3 h-auto flex flex-col p-4 items-center justify-center bg-gray-200 dark:bg-main-blue border border-gray-800 shadow-lg rounded-2xl dark:text-gray-300 text-main-blue mx-auto mt-10"
    >
      <div class="flex flex-col">
        <div class="text-center p-3 flex-auto justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-12 h-12 flex items-center text-gray-400 mx-auto"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
            <h2 class="text-xl font-bold py-4">Bist du dir sicher?</h2>
            <p class="text-sm px-2">
              Die Aktion kann nicht rückgängig gemacht werden
            </p>
        </div>
        <div class="flex justify-around p-2 mt-2 text-center gap-x-2">
          <button
            @click="emits('close')"
            class="mb-2 md:mb-0 bg-gray-700 px-5 py-2 text-sm shadow-sm font-medium tracking-widest border-2 border-gray-600 hover:border-gray-700 text-gray-300 rounded-full hover:shadow-lg hover:bg-gray-800 transition ease-in duration-300"
          >
            Abbrechen
          </button>
          <button
            @click="emits('submit')"
            class="bg-red-400 hover:bg-red-500 px-5 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-widest border-2 border-red-300 hover:border-red-500 text-white rounded-full transition ease-in duration-300"
          >
            Löschen
          </button>
        </div>
      </div>
    </div>
  </modal-wrapper>
</template>

<script setup lang="ts">
import ModalWrapper from '@/components/ui/modal/ModalWrapper.vue'
const emits = defineEmits(['close', 'submit']);
</script>

<style scoped>

</style>
