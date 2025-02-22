<template>
  <article class="w-full h-full bg-gray-100 dark:bg-gray-300 rounded px-3 py-1 flex flex-col justify-around relative">
    <div class="absolute bg-gray-500/50 rounded-full -top-2 -left-2 text-lg p-0.5">
      <icon-check class="text-gray-500 hover:text-main-orange" />
    </div>
    <div class="absolute top-2 right-2 flex">
      <icon-edit-square class="hover:text-main-orange cursor-pointer" />
      <icon-trash-bin
        class="hover:text-main-orange cursor-pointer"
        @click="showDeleteModal = !showDeleteModal"
      />
    </div>
    <div class="flex gap-2 items-center text-xs">
      <p class="bg-gray-200 px-3 py-1 rounded-full">{{ props.type }}</p>
      <p>ID: {{ props.id }}</p>
    </div>
    <p class="my-2">
      {{ props.description }}
    </p>
    <div class="flex gap-2 text-xs divide-x">
      <p class="pr-2">Optionen: {{ props.options.length }}</p>
      <p>Erstellt: {{ props.created.toLocaleDateString('de-DE') }}</p>
    </div>
  </article>

  <modal-delete-confirmation-component
    v-show="showDeleteModal"
    @close="showDeleteModal = false"
    @submit="handleDeleteSubmit()"
  />
</template>

<script setup lang="ts">
import IconEditSquare from '@/components/icons/IconEditSquare.vue'
import IconTrashBin from '@/components/icons/IconTrashBin.vue'
import IconCheck from '@/components/icons/IconCheck.vue'
import { type Option } from '@/stores/question.ts'
import { type PropType, ref } from 'vue'
import ModalDeleteConfirmationComponent
  from '@/components/ui/modal/ModalDeleteConfirmationComponent.vue'

const props = defineProps({
  id: {
    required: true,
    type: Number
  },
  type: {
    required: true,
    type: String
  },
  description: {
    required: true,
    type: String
  },
  options: {
    required: true,
    type: Array as PropType<Option[]>
  },
  created: {
    required: true,
    type: Date
  }
});

const showDeleteModal = ref<boolean>(false);
const showEditModal = ref<boolean>(false);

const handleDeleteSubmit = (): void => {
  showDeleteModal.value = false;
  // TODO: Handle delete
}
</script>

<style scoped>

</style>
