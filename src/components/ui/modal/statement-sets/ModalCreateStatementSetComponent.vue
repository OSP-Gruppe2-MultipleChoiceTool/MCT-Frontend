<template>
  <modal-wrapper>
    <div
      class="w-full h-full flex flex-col gap-y-3 py-4 bg-gray-200 dark:bg-main-blue border border-gray-600 shadow-lg rounded-lg px-8 sm:px-16 overflow-y-auto dark:text-gray-300 text-main-blue">
      <div class="flex flex-col gap-y-2">
        <p class="text-xl font-bold pb-2 pt-3">Neue Frage hinzufügen</p>
        <div class="flex flex-col gap-y-2">
          <span>Kategorie</span>
          <dropdown-input-component
            class="w-full"
            :elements="typeStore.getTypes().map(type => type.title)"
            @on-input-change="handleTypeChange" />
        </div>
        <label for="explanation">Erklärung</label>
        <input-text-field-component
          class="h-50"
          :is-text-area="true"
          placeholder="Erklärung..."
          v-model:value="explaination" />
      </div>
      <div class="flex justify-between items-center gap-x-2">
        <icon-upload />
        <input
          type="file"
          id="fileInput"
          class="hidden"
          @change="handleFileInputChange" />
        <label
          for="fileInput"
          class="w-full cursor-pointer inline-flex items-center bg-gray-300 text-slate-900 py-2 px-4 rounded-lg">
          {{ fileName ?? 'Bild hochladen...' }}
        </label>
        <icon-trash-bin class="hover:text-main-orange cursor-pointer" />
      </div>
      <div class="flex flex-col gap-y-1">
        <div v-for="(answer, index) in answers" :key="index" class="flex items-center gap-x-2">
          <input-checkbox-text-component
            :placeholder="'Antwort ' + <number>(index + 1)"
            v-model:value="answer.statement"
            v-model:checked="answer.isCorrect"
          />
        </div>
      </div>
      <div class="flex gap-x-5">
        <button class="flex gap-x-1 items-center hover:text-main-orange" @click="increaseAnswerCount()">
          <icon-plus />
          Hinzufügen
        </button>
        <button class="flex gap-x-1 items-center hover:text-main-orange" @click="reduceAnswerCount()">
          <icon-minus />
          Entfernen
        </button>
        <button class="flex gap-x-1 items-center hover:text-main-orange">
          <icon-shuffle />
          Mischen
        </button>
      </div>
      <div class="mt-auto sm:-mr-10 flex justify-end gap-x-4">
        <button
          class="p-2 rounded-lg bg-gray-300 hover:bg-main-orange text-main-blue dark:bg-gray-900 dark:text-gray-300 cursor-pointer"
          @click="emits('close')">
          Abbrechen
        </button>
        <button
          class="p-2 rounded-lg bg-main-blue hover:bg-main-orange text-gray-300 dark:bg-gray-300 dark:text-main-blue cursor-pointer"
          @click="storeStatementSet">
          Frage speichern
        </button>
      </div>
    </div>
  </modal-wrapper>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import IconUpload from '@/components/icons/IconUpload.vue'
import InputTextFieldComponent from '@/components/ui/input/InputTextFieldComponent.vue'
import IconTrashBin from '@/components/icons/IconTrashBin.vue'
import IconPlus from '@/components/icons/IconPlus.vue'
import IconShuffle from '@/components/icons/IconShuffle.vue'
import InputCheckboxTextComponent from '@/components/ui/input/InputCheckboxTextComponent.vue'
import ModalWrapper from '@/components/ui/modal/ModalWrapper.vue'
import { useTypeStore } from '@/stores/type.ts'
import type {
  CreateStatementType,
  UpdateStatement,
  UpdateStatementSet,
} from '@/types/Questionnaire.ts'
import IconMinus from '@/components/icons/IconMinus.vue'
import { useStatementStore } from '@/stores/statements.ts'
import { isValidGuid } from '@/composables/useDataValidation.ts'
import DropdownInputComponent from '@/components/ui/dropdown/DropdownInputComponent.vue'
import { push } from 'notivue'

const statementStore = useStatementStore();
const typeStore = useTypeStore()

const emits = defineEmits(['close']);

const explaination = ref<string>('');
const statementImage = ref<string>('');

const statementTypeId = ref<string|null>(null);
const statementTypeValue = ref<string>('');

const fileName = ref<string | null>(null)
const answers = ref<UpdateStatement[]>([]);

const increaseAnswerCount = () => {
  answers.value.push(<UpdateStatement>{
    isCorrect: false,
    statement: ''
  });
}

const reduceAnswerCount = () => {
  answers.value.pop();
}

const handleTypeChange = (selectedTypeTitle: string): void => {
  const localTitle = typeStore.getTypeByTitle(selectedTypeTitle);

  if (typeof localTitle !== 'undefined') {
    statementTypeId.value = localTitle.id;
    return;
  }

  statementTypeValue.value = selectedTypeTitle;
}

const handleFileInputChange = (event: Event): void => {
  if (!(event.target instanceof HTMLInputElement) || !event.target.files) return;
  fileName.value = event.target.files[0] ? event.target.files[0].name : null;

  statementImage.value = <string>fileName.value;
}

const storeStatementSet = async () => {
  if (statementTypeId.value === null && (statementTypeValue.value.trim()) !== '') {
    const createStatementType = <CreateStatementType>{
      title: statementTypeValue.value
    };

    const statementType = await typeStore.createType(createStatementType);
    if (statementType !== null) {
      statementTypeId.value = statementType.id;
    }
  }

  if (statementTypeId.value !== null && !isValidGuid(statementTypeId.value)) {
    push.error('Es Problem mit der Kategorie ist aufgetreten!');

    statementTypeId.value = null;
  }

  const updateStatementSetData = <UpdateStatementSet>{
    explaination: explaination.value,
    statementImage: statementImage.value,
    statementTypeId: statementTypeId.value,
    statements: answers.value
  };

  await statementStore.createStatementSet(updateStatementSetData);
  emits('close');
}
</script>
