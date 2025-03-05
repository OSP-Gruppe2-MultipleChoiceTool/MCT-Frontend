<template>
  <main class="w-full py-4 overflow-y-auto">
    <div class="flex flex-col gap-y-3 pb-3">
      <div class="w-full pb-5">
        <input-text-field-component class="w-1/2 sm:w-4/6" v-model:value="currentTextFilter" />
      </div>
      <div class="flex gap-x-2 flex-wrap text-3xl sm:text-lg md:text-sm">
        <div>
          <button-component
            background-color="bg-main-blue dark:bg-gray-600 hover:bg-main-orange"
            text-color="text-gray-300 hover:text-main-blue"
            @click="showCreateByTypeModal = true">
            <icon-plus />
            <span class="hidden sm:inline">Kategorie bündeln</span>
          </button-component>
        </div>
        <div class="ml-auto">
          <button-component
            background-color="bg-main-blue dark:bg-gray-600 hover:bg-main-orange"
            text-color="text-gray-300 hover:text-main-blue"
            @click="showCreateModal = true">
            <icon-plus />
            <span class="hidden sm:inline">Neuer Fragebogen</span>
          </button-component>
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-y-2 pb-5" v-if="!questionStore.isLoading && questionStore.getQuestionnaires().length > 0">
      <questionnaire-list-item-component
        class="my-2"
        v-for="question in filteredQuestionnaires.slice(startIndex, endIndex)"
        :key="question.id"
        :id="question.id" :title="question.title" :statement-sets="question.statementSets"
        @on-edit="(editData) => onHandleEdit(question.id, editData)"
        @on-delete="onHandleDelete(question.id)"
      />
    </div>
    <div v-else-if="!questionStore.isLoading && questionStore.getQuestionnaires().length === 0">
      <p>No Statements found</p>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>

    <pagination-component
      :max-per-page="elementsPerPage"
      :item-count="filteredQuestionnaires.length"
      v-model:start-index="startIndex" v-model:end-index="endIndex"
    />

    <modal-create-questionnaire-component
      v-show="showCreateModal"
      @close="showCreateModal = false"
      @create="onHandleCreate"
    />
    <modal-create-questionnaire-by-type-component
      v-show="showCreateByTypeModal"
      @close="showCreateByTypeModal = false"
      @create="onHandleCreateByType"
      :type-elements="typeStore.getTypes().map(type => type.title)"
    />
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import QuestionnaireListItemComponent from '@/components/ui/list/QuestionnaireListItemComponent.vue'
import InputTextFieldComponent from '@/components/ui/input/InputTextFieldComponent.vue'
import IconPlus from '@/components/icons/IconPlus.vue'
import ButtonComponent from '@/components/ui/ButtonComponent.vue'
import PaginationComponent from '@/components/ui/PaginationComponent.vue'
import { useQuestionnairesStore } from '@/stores/questionnaires.ts'
import ModalCreateQuestionnaireComponent
  from '@/components/ui/modal/questionnaire/ModalCreateQuestionnaireComponent.vue'
import type { CreateQuestionnaire } from '@/types/Questionnaire.ts'
import ModalCreateQuestionnaireByTypeComponent
  from '@/components/ui/modal/questionnaire/ModalCreateQuestionnaireByTypeComponent.vue'
import { useTypeStore } from '@/stores/type.ts'
import { push } from 'notivue'
import router from '@/router'

const questionStore = useQuestionnairesStore();
const typeStore = useTypeStore();

const currentTextFilter = ref<string>('');

const filteredQuestionnaires = computed(() => {
  return questionStore.getQuestionnaires().filter(questionnaire =>
    questionnaire.title?.toLowerCase().includes(currentTextFilter.value.toLowerCase())
  );
});

const showCreateModal = ref<boolean>(false);
const showCreateByTypeModal = ref<boolean>(false);

const elementsPerPage = ref<number>(6);
const startIndex = ref<number>(0);
const endIndex = ref<number>(elementsPerPage.value);

const onHandleCreate = async (data: CreateQuestionnaire) => {
  await questionStore.createQuestionnaire(data);
  showCreateModal.value = false;
}

const onHandleCreateByType = async (typeTitle: string) => {
  const typeByTitle = typeStore.getTypeByTitle(typeTitle);

  if (typeof typeByTitle === 'undefined') {
    push.error('Fragebogen konnte nicht erstellt werden');
    return;
  }

  const typeId = await questionStore.createQuestionnaireByTypeId(typeByTitle.id);
  showCreateByTypeModal.value = false;

  await router.push({ name: 'statement-listing', params: { id: typeId } });
}

const onHandleEdit = async (id: string, data: CreateQuestionnaire) => {
  await questionStore.editQuestionnaire(id, data);
}

const onHandleDelete = (guid: string) => {
  questionStore.deleteQuestionnaire(guid);
}

onMounted(async () => {
  questionStore.isLoading = true;

  await typeStore.fillTypes();
  await questionStore.fillQuestionnaires();

  questionStore.isLoading = false;
})
</script>
