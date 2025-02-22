<template>
  <main class="w-full py-4 overflow-y-auto">
    <div class="flex flex-col gap-y-3 pb-3">
      <div class="w-full flex items-center pb-5 pt-2 gap-x-5 max-h-10">
        <searchbar-component class="w-5/6" />
        <dropdown-component
          class="w-1/6"
          :elements="typeStore.getTypes().map(type => type.name)"
        />
      </div>
      <div class="w-full flex justify-between">
        <div class="flex gap-x-2">
          <button-component
            background-color="bg-gray-300 hover:bg-gray-500"
            text-color="hover:text-gray-300">
            <icon-edit-square />
            Import CSV
          </button-component>
          <button-component
            background-color="bg-gray-300 hover:bg-gray-500"
            text-color="hover:text-gray-300">
            <icon-edit-square />
            Export
          </button-component>
          <button-component
            background-color="bg-gray-300 hover:bg-gray-500"
            text-color="hover:text-gray-300">
            <icon-edit-square />
            Share
          </button-component>
        </div>
        <div class="flex gap-x-2 ml-auto">
          <button-component
            background-color="bg-main-blue dark:bg-gray-600 hover:bg-main-orange"
            text-color="text-gray-300 hover:text-main-blue"
            @click="showCreateModal = true">
            <icon-plus />
            Neue Frage
          </button-component>
        </div>
      </div>
    </div>

    <div>
      <question-list-item-component
        class="my-2"
        v-for="question in questionStore.getQuestions()"
        :id="question.id" :type="typeStore.getTypeById(question.id).name"
        :description="question.description" :options="question.options"
        :created="question.created"
      />
    </div>

    <pagination-component :max-per-page="6" :item-count="questionStore.getQuestions().length" />

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
import SearchbarComponent from '@/components/ui/SearchbarComponent.vue'
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
</script>
