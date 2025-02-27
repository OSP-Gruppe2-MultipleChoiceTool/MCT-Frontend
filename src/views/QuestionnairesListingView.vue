<template>
  <main class="w-full py-4 overflow-y-auto">
    <div class="flex flex-col gap-y-3 pb-3">
      <div class="w-full pb-5">
        <input-text-field-component class="w-1/2 sm:w-4/6" v-model:value="currentTextFilter" />
      </div>
      <div class="flex gap-x-2 flex-wrap text-3xl sm:text-lg md:text-sm">
        <div>
          <button-component
            background-color="bg-gray-300 hover:bg-gray-500"
            text-color="hover:text-gray-300">
            <icon-edit-square />
            <span class="hidden sm:inline">CSV Importieren</span>
          </button-component>
        </div>
        <div>
          <button-component
            background-color="bg-gray-300 hover:bg-gray-500"
            text-color="hover:text-gray-300">
            <icon-edit-square />
            <span class="hidden sm:inline">Exportieren</span>
          </button-component>
        </div>
        <div>
          <button-component
            background-color="bg-gray-300 hover:bg-gray-500"
            text-color="hover:text-gray-300">
            <icon-edit-square />
            <span class="hidden sm:inline">Teilen</span>
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

    <div class="flex flex-col gap-y-2 pb-5">
      <questionnaire-list-item-component
        class="my-2"
        v-for="question in questionStore.getQuestionnaires().slice(startIndex, endIndex)"
        :id="question.id" :title="question.title" :statement-sets="question.statementSets"
      />
    </div>

    <pagination-component
      :max-per-page="elementsPerPage"
      :item-count="questionStore.getQuestionnaires().length"
      v-model:start-index="startIndex" v-model:end-index="endIndex"
    />

    <modal-create-questionnaire-component
      v-show="showCreateModal"
      @close="showCreateModal = false"
      @create="handleCreate"
      
    />
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import QuestionnaireListItemComponent from '@/components/ui/list/QuestionnaireListItemComponent.vue'
import InputTextFieldComponent from '@/components/ui/input/InputTextFieldComponent.vue'
import IconEditSquare from '@/components/icons/IconEditSquare.vue'
import IconPlus from '@/components/icons/IconPlus.vue'
import ButtonComponent from '@/components/ui/ButtonComponent.vue'
import PaginationComponent from '@/components/ui/PaginationComponent.vue'
import { useQuestionnairesStores } from '@/stores/questionnaires.ts'
import ModalCreateQuestionnaireComponent
  from '@/components/ui/modal/ModalCreateQuestionnaireComponent.vue'

import router from '@/router'

const questionStore = useQuestionnairesStores();

const showCreateModal = ref<boolean>(false);

const currentTextFilter = ref<string|null>(null);

const elementsPerPage = ref<number>(6);
const startIndex = ref<number>(0);
const endIndex = ref<number>(elementsPerPage.value);

const handleCreate = () => {
  questionStore.createQuestionnaire
  router.push({ name: 'home'})
}

onMounted(() => {
  questionStore.fillQuestionnaires();
})


</script>
