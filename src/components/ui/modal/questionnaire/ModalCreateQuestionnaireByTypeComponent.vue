<template>
  <modal-wrapper>
    <form
      @submit.prevent="onHandleCreate"
      class="w-full h-fit flex flex-col gap-y-3 py-4 bg-gray-200 dark:bg-main-blue border border-gray-600 shadow-lg rounded-lg px-8 sm:px-16 dark:text-gray-300 text-main-blue">
      <div class="flex flex-col gap-y-2">
        <p class="text-xl font-bold pb-2 pt-3">Neuen Fragebogen hinzufügen</p>
        <label>Kategorie</label>
        <dropdown-component
          class="w-full"
          :elements="typeStore.getTypes().map(type => type.title)"
          @on-select="onHandleSelect"
        />
        <label>Titel</label>
        <input-text-field-component placeholder="Titel" v-model:value="questionnaireTitle" required />
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
          type="submit"
          class="
            p-2 rounded-lg
            bg-main-blue hover:bg-main-orange text-gray-300
            dark:bg-gray-300 dark:text-main-blue
            cursor-pointer
          ">
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
import type { CreateQuestionnaire, StatementType } from '@/types/Questionnaire';
import { useTypeStore } from '@/stores/type';

const emits = defineEmits(['close', 'create']);
const props = defineProps({
  title: {
    type: String,
    required: false,
    default: ''
  }
});

const typeStore = useTypeStore()

const statementTypeId = ref<string|undefined>(undefined);
const statementTypeValue = ref<string>('');
const questionnaireTitle = ref<string>(props.title);

const onHandleSelect = (typeTitle: string) => {
  const localTitle = typeStore.getTypeByTitle(typeTitle);

  if (typeof localTitle !== 'undefined') {
    statementTypeId.value = localTitle.id;
    return;
  }

  statementTypeValue.value = typeTitle;
}

const onHandleCreate = () => {
  if (!statementTypeId.value) {
    return;
  }

  emits('create', <CreateQuestionnaire>{
    statementTypeId: statementTypeId.value,
    title: questionnaireTitle.value
  });
}
</script>
