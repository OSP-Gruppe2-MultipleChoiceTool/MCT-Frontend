<template>
  <article class="w-full h-full bg-gray-100 dark:bg-gray-300 rounded px-3 py-1 flex flex-col justify-around relative">
    <div class="absolute top-2 right-2 flex text-3xl">
      <icon-edit-square
        class="hover:text-main-orange cursor-pointer"
        @click="showEditModal = !showEditModal"
      />
      <icon-trash-bin
        class="hover:text-main-orange cursor-pointer"
        @click="showDeleteModal = !showDeleteModal"
      />
    </div>
    <div @click="router.push({ name: 'statement-listing', params: { id: props.id } })" class="cursor-pointer">
      <div class="flex gap-2 items-center text-xs">
        <p>ID: {{ props.id }}</p>
      </div>
      <p class="my-2 cursor-pointer">
        {{ props.title }}
      </p>
      <div class="flex gap-2 text-xs divide-x">
        <p class="pr-2">Fragen: {{ props.statementSets.length }}</p>
      </div>
    </div>
  </article>

  <modal-edit-questionnaire-component
    v-show="showEditModal"
    :title="props.title"
    @on-close="showEditModal = false"
    @on-edit="onHandleEdit"
  />
  <modal-delete-confirmation-component
    v-show="showDeleteModal"
    @close="showDeleteModal = false"
    @submit="handleDeleteSubmit()"
  />
</template>

<script setup lang="ts">
import IconEditSquare from '@/components/icons/IconEditSquare.vue'
import IconTrashBin from '@/components/icons/IconTrashBin.vue'
import { type PropType, ref } from 'vue'
import ModalDeleteConfirmationComponent from '@/components/ui/modal/ModalDeleteConfirmationComponent.vue'
import type { CreateQuestionnaire, StatementSet } from '@/types/Questionnaire.ts'
import router from '@/router'
import ModalEditQuestionnaireComponent
  from '@/components/ui/modal/questionnaire/ModalEditQuestionnaireComponent.vue'

const emits = defineEmits(['onDelete', 'onEdit']);
const props = defineProps({
  id: {
    required: true,
    type: String
  },
  title: {
    required: false,
    type: String,
    default: ''
  },
  statementSets: {
    required: true,
    type: Array as PropType<StatementSet[]>
  }
});

const showEditModal = ref<boolean>(false);
const showDeleteModal = ref<boolean>(false);

const onHandleEdit = (data: CreateQuestionnaire): void => {
  emits('onEdit', data);
  showEditModal.value = false;
}

const handleDeleteSubmit = (): void => {
  emits('onDelete');
  showDeleteModal.value = false;
}
</script>

<style scoped>

</style>
