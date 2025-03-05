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
    <div class="flex gap-2 items-center text-xs">
      <p class="bg-gray-200 px-3 py-1 rounded-full"
        v-if="props.statementSet.statementType">
        {{ props.statementSet.statementType?.title }}
      </p>
      <p>ID: {{ props.statementSet.id }}</p>
    </div>
    <p class="my-2">
      {{ props.statementSet.explaination }}
    </p>
    <div class="flex gap-2 text-xs divide-x">
      <p class="pr-2">Optionen: {{ props.statementSet.statements.length }}</p>
    </div>
  </article>

  <modal-edit-statement-set-component
    v-show="showEditModal"
    @on-close="showEditModal = false"
    @on-edit="handleStatementEdit"
    :explaination="props.statementSet.explaination"
    :statement-image="props.statementSet.statementImage"
    :statement-type-value="props.statementSet.statementType?.title"
    :answers="props.statementSet.statements"
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
import ModalDeleteConfirmationComponent
  from '@/components/ui/modal/ModalDeleteConfirmationComponent.vue'
import ModalEditStatementSetComponent
  from '@/components/ui/modal/statement-sets/ModalEditStatementSetComponent.vue'
import type { StatementSetResponse, UpdateStatementSet } from '@/types/Questionnaire.ts'

const emits = defineEmits(['onDelete', 'onEdit']);
const props = defineProps({
  statementSet: {
    required: true,
    type: Object as PropType<StatementSetResponse>
  }
});

const showDeleteModal = ref<boolean>(false);
const showEditModal = ref<boolean>(false);

const handleStatementEdit = (data: UpdateStatementSet): void => {
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
