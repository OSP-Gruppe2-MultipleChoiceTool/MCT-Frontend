<template>
  <modal-wrapper>
    <div class="w-full h-fit flex flex-col gap-y-3 py-4 bg-gray-200 dark:bg-main-blue border border-gray-600 shadow-lg rounded-lg px-8 sm:px-16 overflow-y-visible dark:text-gray-300 text-main-blue">
      <p class="text-xl font-bold pb-2 pt-3">Fragebogen teilen</p>
      <div class="w-full flex flex-col">
        <label>Gültig bis</label>
        <input
          type="date"
          v-model="updateQuestionnaireLink.expirationDate"
          class="border border-gray-400 rounded-md p-2"
        />
      </div>
      <div class="mt-auto flex justify-end gap-x-4">
        <button
          class="p-2 rounded-lg bg-gray-300 hover:bg-main-orange text-main-blue dark:bg-gray-900 dark:text-gray-300 cursor-pointer"
          @click="emits('onClose')">
          Abbrechen
        </button>
        <button
          class="p-2 rounded-lg bg-main-blue hover:bg-main-orange text-gray-300 dark:bg-gray-300 dark:text-main-blue cursor-pointer"
          @click="onHandleCreate">
          Link erstellen
        </button>
      </div>
    </div>
  </modal-wrapper>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ModalWrapper from '@/components/ui/modal/ModalWrapper.vue'
import { push } from 'notivue'
import type { UpdateQuestionnaireLink } from '@/types/Questionnaire.ts'

const emits = defineEmits(['onClose', 'onCreate'])

const updateQuestionnaireLink = ref<UpdateQuestionnaireLink>({
  expirationDate: new Date().toISOString().split('T')[0],
})

const onHandleCreate = () => {
  const selectedDate = new Date(
    updateQuestionnaireLink.value.expirationDate as string,
  )
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  if (isNaN(selectedDate.getTime())) {
    push.error('Ungültiges Datumsformat');
    return false;
  }

  if (selectedDate < today) {
    push.error('Datum darf nicht in der Vergangenheit liegen');
    return false;
  }


  emits('onCreate', updateQuestionnaireLink.value)
}
</script>
