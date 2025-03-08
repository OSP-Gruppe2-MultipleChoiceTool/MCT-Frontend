<template>
  <article
    :class="
      'w-full bg-white flex flex-col xl:flex-row xl:flex-wrap gap-y-5 px-5 md:px-16 py-7 rounded border-2 '
      + (turnedIn ? (correct ? 'border-green-500' : 'border-red-500') : '')">
    <div id="left" class="flex flex-col justify-between basis-3/5">
      <div>
        <div
          v-for="(statement, index) in props.statementSet.statements"
          :key="statement.id"
          class="flex gap-x-5 py-2">
          <p><strong>{{ index + 1 }}:</strong></p>
          <p>{{ statement.statement }}</p>
        </div>
      </div>
    </div>
    <div id="right" class="basis-2/5 flex flex-col gap-y-5">
      <div class="max-h-96 w-auto flex justify-center xl:justify-end">
        <img
          v-if="props.statementSet.statementImage"
          :src="props.statementSet.statementImage"
          class="object-contain rounded"
          alt="Uploaded Image" />
      </div>
    </div>

    <div
      id="bottom-button-row"
      class="w-full flex flex-col space-y-5 pt-10 justify-between items-center">
      <div class="text-center flex flex-col mx-auto">
        <p class="font-semibold">Antwort</p>
        <input-text-field-component
          placeholder="Antwort..."
          v-model:value="answer" />
        <p class="text-sm text-gray-500">Trennen Sie die Nummern der richtigen Aussagen mit Kommas.</p>
        <p class="text-sm text-gray-500">Lassen Sie das Feld leer, wenn keine Aussage richtig ist.</p>
      </div>
      <div class="w-fit">
        <button-component
          background-color="bg-main-blue dark:bg-gray-600 hover:bg-main-orange"
          text-color="text-gray-300 hover:text-main-blue px-10"
          @click="turnIn">
          Beantworten
        </button-component>
      </div>
      <div class="flex gap-2 items-center text-xs">
        <p>ID: {{ props.statementSet.id }}</p>
      </div>
    </div>
  </article>

  <statement-set-explaination-component
    v-if="turnedIn && props.statementSet.explaination"
    :is-correct="correct"
    :explaination="props.statementSet.explaination" />
</template>

<script setup lang="ts">
import InputTextFieldComponent from '@/components/ui/input/InputTextFieldComponent.vue'
import ButtonComponent from '@/components/ui/ButtonComponent.vue'
import { type PropType, ref } from 'vue'
import type { StatementSet } from '@/types/Questionnaire.ts'
import StatementSetExplainationComponent from '@/components/ui/list/StatementSetExplainationComponent.vue'
import { isAnswerCorrect } from '@/services/statementService'

const props = defineProps({
  statementSet: {
    type: Object as PropType<StatementSet>,
    required: true,
  },
})

const turnedIn = ref<boolean>(false)

const answer = ref<string>('')
const correct = ref<boolean>(false)

const turnIn = () => {
  correct.value = isAnswerCorrect(props.statementSet, answer.value)
  turnedIn.value = true
}
</script>
