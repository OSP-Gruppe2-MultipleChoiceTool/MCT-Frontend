<template>
  <main class="w-full py-4 overflow-y-auto">
    <div class="flex flex-col gap-y-3 pb-3">
      <div class="w-full flex items-center pb-5 pt-2 gap-x-2 max-h-10">
        <input-text-field-component class="w-1/2 sm:w-4/6" />
        <dropdown-component
          class="w-1/2 text-sm sm:w-2/6 sm:text-base"
          :elements="typeStore.getTypes().map(type => type.name)"
        />
      </div>
      <div class="flex gap-x-2 flex-wrap text-3xl sm:text-lg md:text-sm">
        <div>
          <button-component
            background-color="bg-gray-300 hover:bg-gray-500"
            text-color="hover:text-gray-300">
            <icon-edit-square />
            <span class="hidden sm:inline">Import CSV</span>
          </button-component>
        </div>
        <div>
          <button-component
            background-color="bg-gray-300 hover:bg-gray-500"
            text-color="hover:text-gray-300">
            <icon-edit-square />
            <span class="hidden sm:inline">Export</span>
          </button-component>
        </div>
        <div>
          <button-component
            background-color="bg-gray-300 hover:bg-gray-500"
            text-color="hover:text-gray-300">
            <icon-edit-square />
            <span class="hidden sm:inline">Share</span>
          </button-component>
        </div>
        <div class="ml-auto">
          <button-component
            background-color="bg-main-blue dark:bg-gray-600 hover:bg-main-orange"
            text-color="text-gray-300 hover:text-main-blue"
            @click="showCreateModal = true">
            <icon-plus />
            <span class="hidden sm:inline">Neue Frage</span>
          </button-component>
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-y-2 pb-5">
      <question-list-item-component
        class="my-2"
        v-for="question in questionStore.getQuestions().slice(startIndex, endIndex)"
        :id="question.id" :type="typeStore.getTypeById(question.id).name"
        :description="question.description" :options="question.options"
        :created="question.created"
      />
    </div>

    <pagination-component
      :max-per-page="6"
      :item-count="questionStore.getQuestions().length"
      :start-index="startIndex" :end-index="endIndex"
    />

    <modal-create-question-component
      v-show="showCreateModal"
      @close="showCreateModal = false"
    />
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import QuestionListItemComponent from '@/components/features/question/QuestionListItemComponent.vue'
import ModalCreateQuestionComponent from '@/components/ui/modal/ModalCreateQuestionComponent.vue'
import InputTextFieldComponent from '@/components/ui/input/InputTextFieldComponent.vue'
import DropdownComponent from '@/components/ui/DropdownComponent.vue'
import IconEditSquare from '@/components/icons/IconEditSquare.vue'
import IconPlus from '@/components/icons/IconPlus.vue'
import ButtonComponent from '@/components/ui/ButtonComponent.vue'
import PaginationComponent from '@/components/ui/PaginationComponent.vue'
import { useQuestionStore } from '@/stores/question.ts'
import { useTypeStore } from '@/stores/type.ts'

const questionStore = useQuestionStore();
const typeStore = useTypeStore();

const showCreateModal = ref<boolean>(false);

const currentTextFilter = ref<string|null>(null);
const currentTypeFilter = ref<number|null>(null);

const startIndex = ref<number>(0);
const endIndex = ref<number>(6);
</script>
