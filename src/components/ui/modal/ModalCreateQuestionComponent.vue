<template>
  <modal-wrapper>
    <div class="w-full h-full flex flex-col gap-y-3 py-4 bg-gray-200 dark:bg-main-blue border border-gray-600 shadow-lg rounded-lg px-8 sm:px-16 overflow-y-auto dark:text-gray-300 text-main-blue">
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
          <input-text-field-component class="" />
        </div>
        <label for="explanation">Erklärung</label>
        <input-text-field-component class="h-50" :is-text-area="true" />
      </div>
      <div class="flex justify-between items-center gap-x-2">
        <icon-upload />
        <input type="file" id="fileInput" class="hidden" @change="handleFileInputChange">
        <label for="fileInput" class="w-full cursor-pointer inline-flex items-center bg-gray-300 text-slate-900 py-2 px-4 rounded-lg">
          {{ fileName ?? 'Bild hochladen...'}}
        </label>
        <icon-trash-bin class="hover:text-main-orange cursor-pointer" />
      </div>
      <div class="flex flex-col gap-y-1">
        <div v-for="n in 3" :key="n" class="flex items-center gap-x-2">
          <input-checkbox-text-component />
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
      <div class="mt-auto sm:-mr-10 flex justify-end gap-x-4">
        <button
          class="
            p-2 rounded-lg
            bg-gray-300 hover:bg-main-orange text-main-blue
            dark:bg-gray-900 dark:text-gray-300
            cursor-pointer
          "
          @click="emits('close')">
          Abbrechen
        </button>
        <button
          class="
            p-2 rounded-lg
            bg-main-blue hover:bg-main-orange text-gray-300
            dark:bg-gray-300 dark:text-main-blue dark:text-main-blue
            cursor-pointer
          "
          @click="">
          Frage speichern
        </button>
      </div>
    </div>
  </modal-wrapper>
</template>


<script setup lang="ts">
import { ref } from 'vue'
import IconUpload from '@/components/icons/IconUpload.vue'
import DropdownComponent from '@/components/ui/DropdownComponent.vue'
import InputTextFieldComponent from '@/components/ui/input/InputTextFieldComponent.vue'
import IconTrashBin from '@/components/icons/IconTrashBin.vue'
import IconPlus from '@/components/icons/IconPlus.vue'
import IconShuffle from '@/components/icons/IconShuffle.vue'
import InputCheckboxTextComponent from '@/components/ui/input/InputCheckboxTextComponent.vue'
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
