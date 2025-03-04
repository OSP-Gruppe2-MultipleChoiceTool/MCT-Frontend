<template>
    <main class="w-full overflow-y-auto pb-10">
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
      </div>
      <div class="flex flex-col gap-y-5">
        <div
          class="flex flex-col space-y-5"
          v-for="statementSet in statementStore.getStatementSets().slice(startIndex, endIndex)"
          :key="statementSet.id"
        >
          <statement-set-question-listing-component
            :statement-set="statementSet"
          />
        </div>
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

const route = useRoute();
const linkId = <string>route.params.id;

const statementStore = useStatementStore();

onMounted(async () => {
  await statementStore.fillStatementsByLinkIdAndMode(linkId, false);
})

const elementsPerPage = ref<number>(1);
const startIndex = ref<number>(0);
const endIndex = ref<number>(elementsPerPage.value);
</script>
