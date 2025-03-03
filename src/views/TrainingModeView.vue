<template>
    <main class="w-full overflow-y-auto pb-10">
      <div class="btns pb-5 flex justify-between">
        <div class="h-8">
            <button-component
              custom-class="px-5"
              background-color="bg-gray-300 dark:bg-gray-600 hover:bg-main-orange"
              @click="router.push({ name: 'statement-listing', params: { id: <string>route.params.id } })"
            >
              Zurück
            </button-component>
        </div>
      </div>
      <div class="flex flex-col gap-y-5">
        <statement-set-question-listing-component
          v-for="statementSet in statementStore.getStatementSets().slice(startIndex, endIndex)"
          :id="statementSet.id" :statements="statementSet.statements"
        />
      </div>
      <div class="mt-20">
        <Pagination-component
          :max-per-page="elementsPerPage"
          :item-count="statementStore.getStatementSets().length"
          v-model:start-index="startIndex" v-model:end-index="endIndex"
        />
      </div>
    </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ButtonComponent from '@/components/ui/ButtonComponent.vue'
import PaginationComponent from '@/components/ui/PaginationComponent.vue'
import StatementSetQuestionListingComponent from '@/components/ui/list/StatementSetQuestionListingComponent.vue'
import { useStatementStore } from '@/stores/statements.ts'
import router from '@/router'
import { useRoute } from 'vue-router'
import { getQuestionnaireById } from '@/composables/useDataValidation.ts'

const route = useRoute();
const statementStore = useStatementStore();

const elementsPerPage = ref<number>(1);
const startIndex = ref<number>(0);
const endIndex = ref<number>(elementsPerPage.value);

onMounted(async () => {
  const id = route.params.id;
  if (typeof id !== 'string') {
    console.error('ID is not valid');
    await router.push({ name: 'home' });

    return;
  }

  const idValid = await getQuestionnaireById(<string>id);
  if (!idValid) {
    console.error('ID not found');
    await router.push({ name: 'home' });
  }

  // Set Active ID for Statements
  await statementStore.setActiveQuestionnaireById(<string>id);

  // Get all statements
  await statementStore.fillStatementSets();
})
</script>
