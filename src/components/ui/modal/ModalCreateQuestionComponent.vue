<template>
  <modal-wrapper>
    <div class="relative w-full h-full flex flex-col gap-y-3 py-4 bg-gray-200 dark:bg-main-blue border border-gray-600 shadow-lg rounded-lg px-16 overflow-y-auto text-gray-300">
      <div class="flex flex-col gap-y-2">
        <p class="text-xl font-bold pb-2 pt-3">Neue Frage hinzufügen</p>
        <div class="flex flex-col gap-y-2">
          <span>Kategorie</span>
          <dropdown-component
            class="w-full"
            :elements="typeStore.getTypes().map(type => type.name)"
          />
        </div>
        <div class="flex flex-col gap-y-2">
          <span>Frage</span>
          <searchbar-component class="" />
        </div>
        <label for="explanation">Erklärung</label>
        <searchbar-component class="h-50" :is-text-area="true" />
      </div>
      <div class="flex justify-between items-center gap-x-2">
        <icon-upload class="text-gray-300" />
        <input type="file" id="fileInput" class="hidden" @change="handleFileInputChange">
        <label for="fileInput" class="w-full cursor-pointer inline-flex items-center bg-gray-300 text-slate-900 py-2 px-4 rounded-lg">
          {{ fileName ?? 'Bild hochladen...'}}
        </label>
        <icon-trash-bin class="hover:text-main-orange cursor-pointer" />
      </div>
      <div class="flex flex-col gap-y-1">
        <div v-for="n in 3" :key="n" class="flex items-center gap-x-2">
          <input-checkbox-test-component />
          <icon-trash-bin class="hover:text-main-orange cursor-pointer" />
        </div>
      </div>
      <div class="flex gap-x-5">
        <button class="flex gap-x-1 items-center hover:text-main-orange">
          <icon-plus />
          Option hinzufügen
        </button>
        <button class="flex gap-x-1 items-center hover:text-main-orange">
          <icon-shuffle />
          Mischen
        </button>
      </div>
      <div class="absolute right-0 bottom-0 p-5 flex gap-x-4">
        <button class="p-2 bg-gray-300 text-main-blue dark:bg-gray-900 dark:text-gray-300 rounded-lg" @click="emits('close')">Abbrechen</button>
        <button class="p-2 bg-main-blue dark:bg-gray-300 dark:text-main-blue rounded-lg">Frage speichern</button>
      </div>
    </div>
  </modal-wrapper>
</template>


<script setup lang="ts">
import { ref } from 'vue'
import IconUpload from '@/components/icons/IconUpload.vue'
import DropdownComponent from '@/components/ui/DropdownComponent.vue'
import SearchbarComponent from '@/components/ui/SearchbarComponent.vue'
import IconTrashBin from '@/components/icons/IconTrashBin.vue'
import IconPlus from '@/components/icons/IconPlus.vue'
import IconShuffle from '@/components/icons/IconShuffle.vue'
import InputCheckboxTestComponent from '@/components/ui/input/InputCheckboxTestComponent.vue'
import ModalWrapper from '@/components/ui/modal/ModalWrapper.vue'
import { useTypeStore } from '@/stores/type.ts'
const typeStore = useTypeStore();

const emits = defineEmits(['close']);

const fileName = ref<string|null>(null);

const handleFileInputChange = (event: Event): void => {
  if (!event.target) return;
  fileName.value = event.target.files[0] ? event.target.files[0].name : null;
}
</script>
