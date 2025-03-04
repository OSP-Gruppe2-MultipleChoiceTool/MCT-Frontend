<template>
  <modal-wrapper>
    <div class="w-full h-fit flex flex-col gap-y-3 py-4 bg-gray-200 dark:bg-main-blue border border-gray-600 shadow-lg rounded-lg px-8 sm:px-16 overflow-y-auto dark:text-gray-300 text-main-blue">
      <div class="flex flex-col gap-y-2">
        <p class="text-xl font-bold pb-2 pt-3">Neuen Fragebogen hinzufügen</p>
        <label>Titel</label>
        <input-text-field-component placeholder="Titel" v-model:value="questionnaireTitle" />
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
import { ref } from 'vue'
import InputTextFieldComponent from '@/components/ui/input/InputTextFieldComponent.vue'
import ModalWrapper from '@/components/ui/modal/ModalWrapper.vue'

const emits = defineEmits(['close', 'create']);
const props = defineProps({
  title: {
    type: String,
    required: false,
    default: ''
  }
});

const questionnaireTitle = ref<string>(props.title);

const onHandleCreate = () => {
  const createQuestionnaireData = {
    title: questionnaireTitle.value
  };

  emits('create', createQuestionnaireData);
  questionnaireTitle.value = props.title;
}
</script>
