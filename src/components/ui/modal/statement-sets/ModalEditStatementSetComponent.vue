<template>
  <modal-wrapper>
    <form
      @submit.prevent="storeStatementSet"
      class="w-full h-full flex flex-col gap-y-3 py-4 bg-gray-200 dark:bg-main-blue border border-gray-600 shadow-lg rounded-lg px-8 sm:px-16 overflow-y-auto dark:text-gray-300 text-main-blue">
      <div class="flex flex-col gap-y-2">
        <p class="text-xl font-bold pb-2 pt-3">Aussage editieren</p>
        <div class="flex flex-col gap-y-2">
          <span>Kategorie</span>
          <dropdown-input-component
            class="w-full"
            :elements="typeStore.getTypes().map(type => type.title)"
            :current-value="statementTypeValue"
            @on-input-change="handleTypeChange"
          />
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
      </div>
      <div class="flex flex-col gap-y-1">
        <div v-for="(answer, index) in answers" :key="answer.id" class="flex items-center gap-x-2">
          <input-checkbox-text-component
            :placeholder="'Antwort ' + <number>(index + 1)"
            v-model:value="answer.data.statement"
            v-model:checked="answer.data.isCorrect"
            required
          />
          <icon-trash-bin class="hover:text-main-orange cursor-pointer text-3xl"
            @click="() => removeAnswer(index)" />
        </div>
      </div>
      <div class="flex gap-x-5">
        <button type="button" class="flex gap-x-1 items-center hover:text-main-orange" @click="increaseAnswerCount()">
          <icon-plus />
          Hinzufügen
        </button>
      </div>
      <div class="mt-auto sm:-mr-10 flex justify-end gap-x-4">
        <button
          type="button"
          class="p-2 rounded-lg bg-gray-300 hover:bg-main-orange text-main-blue dark:bg-gray-900 dark:text-gray-300 cursor-pointer"
          @click="emits('onClose')">
          Abbrechen
        </button>
        <button
          type="submit"
          class="p-2 rounded-lg bg-main-blue hover:bg-main-orange text-gray-300 dark:bg-gray-300 dark:text-main-blue cursor-pointer">
          Speichern
        </button>
      </div>
    </form>
  </modal-wrapper>
</template>

<script setup lang="ts">
import { type PropType, ref } from 'vue'
import IconUpload from '@/components/icons/IconUpload.vue'
import InputTextFieldComponent from '@/components/ui/input/InputTextFieldComponent.vue'
import IconTrashBin from '@/components/icons/IconTrashBin.vue'
import IconPlus from '@/components/icons/IconPlus.vue'
import InputCheckboxTextComponent from '@/components/ui/input/InputCheckboxTextComponent.vue'
import ModalWrapper from '@/components/ui/modal/ModalWrapper.vue'
import { useTypeStore } from '@/stores/type.ts'
import type {
  CreateStatementType, Statement,
  UpdateStatement,
  UpdateStatementSet,
} from '@/types/Questionnaire.ts'
import DropdownInputComponent from '@/components/ui/dropdown/DropdownInputComponent.vue'
import { push } from 'notivue'
import { isValidGuid } from '@/composables/useDataValidation.ts'
import { IdentifiableData } from '@/composables/identifiableData'

const typeStore = useTypeStore()

const emits = defineEmits(['onClose', 'onEdit']);
const props = defineProps({
  explaination: {
    type: String,
    required: false,
    default: ''
  },
  statementImage: {
    type: String,
    required: false,
    default: ''
  },
  statementTypeValue: {
    type: String,
    required: false,
    default: ''
  },
  answers: {
    type: Array as PropType<Statement[]>,
    required: true
  }
});

const explaination = ref<string>(props.explaination);
const statementImage = ref<string>(props.statementImage);

const statementTypeId = ref<string|null>(null);
const statementTypeValue = ref<string>(props.statementTypeValue);

const fileName = ref<string | null>(null)
const answers = ref<IdentifiableData<UpdateStatement>[]>(
  props.answers.map(answer => new IdentifiableData<UpdateStatement>(answer))
);

const increaseAnswerCount = () => {
  answers.value.push(new IdentifiableData<UpdateStatement>({
    isCorrect: false,
    statement: ''
  }));
}

const removeAnswer = (index: number) => {
  answers.value.splice(index, 1);
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
    statements: answers.value.map(answer => answer.data)
  };

  emits('onEdit', updateStatementSetData)
}
</script>
