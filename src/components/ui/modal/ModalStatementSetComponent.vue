<template>
  <modal-wrapper>
    <form
      @submit.prevent="submitModal"
      class="w-full h-full flex flex-col gap-y-3 py-4 bg-gray-200 dark:bg-main-blue border border-gray-600 shadow-lg rounded-lg px-8 sm:px-16 overflow-y-auto dark:text-gray-300 text-main-blue">
      <div class="flex flex-col gap-y-2">
        <p class="text-xl font-bold pb-2 pt-3">Aussagen bearbeiten</p>
        <div class="flex flex-col gap-y-2">
          <span>Kategorie</span>
          <dropdown-input-component
            class="w-full"
            v-model="statementTypeValue"
            :elements="typeStore.getTypes().map(type => type.title)"
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
          :id="'fileInput-' + identifier"
          type="file"
          accept="image/*"
          class="hidden"
          @change="handleFileInputChange"
        />
        <label
          :for="'fileInput-' + identifier"
          class="w-full cursor-pointer inline-flex items-center bg-gray-300 text-slate-900 py-2 px-4 rounded-lg"
        >
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
      <div class="mt-auto sm:-mr-10 flex flex-col sm:flex-row justify-end gap-4">
        <button
          type="button"
          class="p-2 rounded-lg bg-gray-300 hover:bg-main-orange text-main-blue dark:bg-gray-900 dark:text-gray-300 cursor-pointer"
          @click="closeModal">
          Abbrechen
        </button>
        <button
          type="submit"
          class="p-2 rounded-lg bg-main-blue hover:bg-main-orange text-gray-300 dark:bg-gray-300 dark:text-main-blue cursor-pointer">
          Aussagen speichern
        </button>
      </div>
    </form>
  </modal-wrapper>
</template>

<script setup lang="ts">
import { ref, type PropType } from 'vue'
import IconUpload from '@/components/icons/IconUpload.vue'
import InputTextFieldComponent from '@/components/ui/input/InputTextFieldComponent.vue'
import IconTrashBin from '@/components/icons/IconTrashBin.vue'
import IconPlus from '@/components/icons/IconPlus.vue'
import InputCheckboxTextComponent from '@/components/ui/input/InputCheckboxTextComponent.vue'
import ModalWrapper from '@/components/ui/modal/ModalWrapper.vue'
import { useTypeStore } from '@/stores/type.ts'
import type {
  CreateStatementType,
  StatementSetResponse,
  UpdateStatement,
  UpdateStatementSet,
} from '@/types/Questionnaire.ts'
import DropdownInputComponent from '@/components/ui/dropdown/DropdownInputComponent.vue'
import { IdentifiableData } from '@/composables/identifiableData'

const props = defineProps({
  initialValue: {
    type: Object as PropType<StatementSetResponse>,
    required: false,
    default: <StatementSetResponse>{
      id: '',
      statements: []
    }
  },
  clearOnClose: {
    type: Boolean,
    required: false,
    default: false
  }
})

const emits = defineEmits(['onClose', 'onUpdate']);

const typeStore = useTypeStore()
const identifier = Math.floor(Math.random() * 10000);

const explaination = ref<string>(props.initialValue.explaination ?? '');
const base64Image = ref<string | null>(props.initialValue.statementImage ?? null);

const statementTypeValue = ref<string>(props.initialValue.statementType?.title ?? '');

const fileName = ref<string | null>(props.initialValue.statementImage ? 'image.jpeg' : null);
const answers = ref<IdentifiableData<UpdateStatement>[]>(
  props.initialValue.statements.map(statement => new IdentifiableData<UpdateStatement>(statement))
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

const handleFileInputChange = (event: Event): void => {
  if (!(event.target instanceof HTMLInputElement) || !event.target.files) return;

  fileName.value = event.target.files[0] ? event.target.files[0].name : null;
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      base64Image.value = reader.result as string;
    };

    reader.readAsDataURL(file);
  } else {
    base64Image.value = null;
  }
}

const submitModal = async () => {
  let statementTypeId: string | undefined = undefined;
  if (statementTypeValue.value.trim() !== '') {
    const createStatementType = <CreateStatementType>{
      title: statementTypeValue.value
    };

    const statementType = typeStore.getTypeByTitle(statementTypeValue.value)
      ?? await typeStore.createType(createStatementType);
    statementTypeId = statementType?.id;
  }

  const updateStatementSetData = <UpdateStatementSet>{
    explaination: explaination.value,
    statementImage: base64Image.value,
    statementTypeId: statementTypeId,
    statements: answers.value.map(answer => answer.data)
  };

  console.log(updateStatementSetData);
  emits('onUpdate', updateStatementSetData)
  closeModal();
}

const closeModal = () => {
  if (props.clearOnClose) {
    explaination.value = '';
    base64Image.value = null;
    statementTypeValue.value = '';
    fileName.value = null;
    answers.value = [];
  }

  emits('onClose');
}
</script>
