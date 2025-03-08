<template>
  <modal-wrapper>
    <form
      @submit.prevent="onHandleCreate"
      class="w-3/4 md:w-1/2 lg:w-1/3 h-auto flex flex-col p-4 justify-center bg-gray-200 dark:bg-main-blue border border-gray-800 shadow-lg rounded-2xl dark:text-gray-300 text-main-blue mx-auto mt-10"
    >
      <div class="flex flex-col gap-y-2">
        <p class="text-xl font-bold pb-2 pt-3">Neuen Fragebogen hinzufügen</p>
        <label>Titel</label>
        <input-text-field-component placeholder="Titel" v-model:value="questionnaireTitle" required />
        <label>Kategorie</label>
        <dropdown-component
          class="w-full"
          :reset-element="'Auswahl entfernen'"
          :elements="typeStore.getTypes().map(type => type.title)"
          v-model="statementTypeValue"
        />
        <p class="text-gray-600 dark:text-gray-400">
          Durch die Auswahl einer Kategorie wird ein neuer Fragebogen erstellt, der alle Aussagen der ausgewählten Kategorie enthält.
        </p>
      </div>
      <div class="mt-5 flex flex-col sm:flex-row justify-end gap-x-4 gap-y-2">
        <button
          type="button"
          class="p-2 rounded-lg bg-gray-300 hover:bg-main-orange text-main-blue dark:bg-gray-900 dark:text-gray-300 cursor-pointer"
          @click="closeModal">
          Abbrechen
        </button>
        <button
          type="submit"
          class="p-2 rounded-lg bg-main-blue hover:bg-main-orange text-gray-300 dark:bg-gray-300 dark:text-main-blue cursor-pointer">
          Fragebogen erstellen
        </button>
      </div>
    </form>
  </modal-wrapper>
</template>


<script setup lang="ts">
import ModalWrapper from '@/components/ui/modal/ModalWrapper.vue'
import DropdownComponent from '@/components/ui/dropdown/DropdownComponent.vue'
import { ref } from 'vue'
import InputTextFieldComponent from '../../input/InputTextFieldComponent.vue';
import type { CreateQuestionnaire } from '@/types/Questionnaire';
import { useTypeStore } from '@/stores/type';

const emits = defineEmits(['close', 'create']);
const props = defineProps({
  title: {
    type: String,
    required: false,
    default: ''
  },
  clearOnClose: {
    type: Boolean,
    required: false,
    default: false
  }
});

const typeStore = useTypeStore()

const statementTypeValue = ref<string | undefined>();
const questionnaireTitle = ref<string>(props.title);

const onHandleCreate = () => {
  const statementType = statementTypeValue.value ?
    typeStore.getTypeByTitle(statementTypeValue.value) :
    undefined;

  emits('create', <CreateQuestionnaire>{
    statementTypeId: statementType?.id,
    title: questionnaireTitle.value
  });
  closeModal();
}

const closeModal = () => {
  if (props.clearOnClose) {
    questionnaireTitle.value = '';
    statementTypeValue.value = undefined;
  }
  emits('close');
}
</script>
