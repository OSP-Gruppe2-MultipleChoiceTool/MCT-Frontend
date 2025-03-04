<template>
  <main class="w-full overflow-y-auto">
    <div class="pb-5 flex justify-between">
      <div class="h-8">
        <button-component
          custom-class="px-5"
          background-color="bg-gray-300 dark:bg-gray-600 hover:bg-main-orange"
          @click="router.push({ name: 'mode-select', params: { id: <string>route.params.id } })"
        >
          Zurück
        </button-component>
      </div>
      <div class="h-11">
        <button-component
          custom-class="px-5 py-3"
          background-color="bg-main-orange dark:bg-gray-300 hover:bg-gray-300 text-main-blue dark:text-main-orange"
          @click="turnIn"
        >
          Abgeben
        </button-component>
      </div>
    </div>
    <div class="flex flex-col gap-y-5 mb-20">
      <div
        class="flex flex-col space-y-5"
        v-for="statementSet in statementStore.getStatementSets()"
        :key="statementSet.id"
      >
        <statement-set-question-listing-exam-component
          :turned-in="turnedIn"
          :statement-set="statementSet"
        />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import ButtonComponent from '@/components/ui/ButtonComponent.vue'
import { onMounted, ref } from 'vue'
import { useStatementStore } from '@/stores/statements.ts'
import StatementSetQuestionListingExamComponent
  from '@/components/ui/list/StatementSetQuestionListingExamComponent.vue'
import router from '@/router'

const route = useRoute();
const linkId = <string>route.params.id;

const statementStore = useStatementStore();

const turnedIn = ref<boolean>(false);

const turnIn = () => {
  turnedIn.value = true;
}

onMounted(async () => {
  await statementStore.fillStatementsByLinkIdAndMode(linkId, true);
})
</script>

<style scoped>

</style>
