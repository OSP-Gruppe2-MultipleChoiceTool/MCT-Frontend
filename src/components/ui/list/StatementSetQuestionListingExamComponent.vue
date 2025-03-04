<template>
  <article
    class="w-full bg-white flex flex-col xl:flex-row xl:flex-wrap gap-y-5 px-5 md:px-16 py-7 rounded">
    <div id="left" class="flex flex-col justify-between basis-3/5">
      <div id="options">
        <div
          v-for="(statement, index) in props.statementSet.statements"
          :key="statement.id"
          class="flex gap-x-5 py-2">
          <p>{{ index + 1 }}</p>
          <p>{{ statement.statement }}</p>
        </div>
      </div>
    </div>
    <div id="right" class="basis-2/5 flex flex-col gap-y-5">
      <div class="max-h-96 w-auto flex justify-center xl:justify-end">
        <img
          src="https://www.placecats.com/400/300"
          class="object-contain rounded"
          alt="img" />
      </div>
    </div>

    <div
      id="bottom-button-row"
      class="w-full flex flex-col space-y-5 pt-10 justify-between items-center">
      <div class="text-center flex flex-col mx-auto">
        <p>Antwort</p>
        <input-text-field-component
          placeholder="Antwort..."
          v-model:value="answer" />
        <p>Mehrere Antworten in Reihenfolge mit Kommata trennen</p>
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
import { type PropType, ref, watch } from 'vue'
import type { StatementSet } from '@/types/Questionnaire.ts'
import StatementSetExplainationComponent from '@/components/ui/list/StatementSetExplainationComponent.vue'
import { useStatementStore } from '@/stores/statements.ts'

const statementStore = useStatementStore()

const props = defineProps({
  statementSet: {
    type: Object as PropType<StatementSet>,
    required: true,
  },
  turnedIn: {
    type: Boolean as PropType<boolean>,
    required: true
  }
})

const turnedIn = ref<boolean>(props.turnedIn);

const answer = ref<string>('')
const correct = ref<boolean>(false);

watch(
  () => props.turnedIn,
  (newValue: boolean) => {
    turnedIn.value = newValue;
    turnIn();
  }
);

const turnIn = () => {
  const correctString = statementStore.getCorrectAnswerStringByStatementSets(props.statementSet);

  turnedIn.value = true;
  correct.value = (answer.value === correctString);
}
</script>
