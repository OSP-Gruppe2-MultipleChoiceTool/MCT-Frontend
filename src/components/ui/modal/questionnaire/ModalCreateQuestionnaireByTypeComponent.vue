<template>
  <modal-wrapper>
    <div class="w-full h-fit flex flex-col gap-y-3 py-4 bg-gray-200 dark:bg-main-blue border border-gray-600 shadow-lg rounded-lg px-8 sm:px-16 dark:text-gray-300 text-main-blue">
      <div class="flex flex-col gap-y-2">
        <p class="text-xl font-bold pb-2 pt-3">Neuen Fragebogen hinzufügen</p>
        <label>Kategorie</label>
        <dropdown-component
          class="w-full"
          :elements="props.typeElements"
          @on-select="onHandleSelect"
        />
      </div>
      <div class="mt-auto flex justify-end gap-x-4">
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
            dark:bg-gray-300 dark:text-main-blue
            cursor-pointer
          "
          @click="onHandleCreate">
          Fragebogen erstellen
        </button>
      </div>
    </div>
  </modal-wrapper>
</template>


<script setup lang="ts">
import ModalWrapper from '@/components/ui/modal/ModalWrapper.vue'
import DropdownComponent from '@/components/ui/dropdown/DropdownComponent.vue'
import { type PropType, ref } from 'vue'

const emits = defineEmits(['close', 'create']);
const props = defineProps({
  typeElements: {
    type: Array as PropType<string[]>,
    required: true
  }
});

const selectedTypeTitle = ref<string>('');

const onHandleSelect = (typeTitle: string) => {
  selectedTypeTitle.value = typeTitle;
}

const onHandleCreate = () => {
  if (selectedTypeTitle.value === '') {
    return;
  }

  emits('create', selectedTypeTitle.value);
}
</script>
