<template>
  <main class="w-full py-4 overflow-y-auto">
    <div class="flex flex-col gap-y-3 pb-3">
      <div class="w-full flex items-center pb-5 pt-2 gap-x-2 max-h-10">
        <input-text-field-component class="w-1/2 sm:w-4/6" v-model:value="currentTextFilter" />
        <dropdown-component
          class="w-1/2 text-sm sm:w-2/6 sm:text-base"
          :reset-element="'Auswahl entfernen'"
          :elements="typeStore.getTypes().map(type => type.title)"
          @on-select="onHandleTypeFilterChange"
          @on-reset="currentTypeFilter = null"
        />
      </div>
      <div class="flex gap-x-2 flex-wrap text-3xl sm:text-lg md:text-sm">
        <div>
          <button-component
            background-color="bg-gray-300 hover:bg-gray-500"
            text-color="hover:text-gray-300"
            @click="onHandleExport"
          >
            <icon-edit-square />
            <span class="hidden sm:inline">Exportieren</span>
          </button-component>
        </div>
        <div>
          <button-component
            background-color="bg-gray-300 hover:bg-gray-500"
            text-color="hover:text-gray-300">
            <icon-edit-square />
            <span class="hidden sm:inline">Teilen</span>
          </button-component>
        </div>
        <div class="ml-auto">
          <button-component
            background-color="bg-main-blue dark:bg-gray-600 hover:bg-main-orange"
            text-color="text-gray-300 hover:text-main-blue"
            @click="showCreateModal = true">
            <icon-plus />
            <span class="hidden sm:inline">Neue Frage</span>
          </button-component>
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-y-2 pb-5" v-if="!statementStore.isLoading && statementStore.getStatementSets().length > 0">
      <statement-set-list-item-component
        class="my-2"
        v-for="statementSet in filteredStatementSets.slice(startIndex, endIndex)"
        :key="statementSet.id"
        @on-delete="onHandleDelete(statementSet.id)"
        :id="statementSet.id"
        :type="statementSet.statementType?.title ?? ''"
        :description="statementSet.explaination"
        :statementCount="statementSet.statements.length"
      />
    </div>
    <div v-else-if="!statementStore.isLoading && statementStore.getStatementSets().length === 0">
      <p>No Statements found</p>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>

    <pagination-component
      :max-per-page="elementsPerPage"
      :item-count="filteredStatementSets.length"
      v-model:start-index="startIndex" v-model:end-index="endIndex"
    />

    <modal-create-statement-set-component
      v-show="showCreateModal"
      @close="showCreateModal = false"
    />
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import InputTextFieldComponent from '@/components/ui/input/InputTextFieldComponent.vue'
import DropdownComponent from '@/components/ui/dropdown/DropdownComponent.vue'
import IconEditSquare from '@/components/icons/IconEditSquare.vue'
import IconPlus from '@/components/icons/IconPlus.vue'
import ButtonComponent from '@/components/ui/ButtonComponent.vue'
import PaginationComponent from '@/components/ui/PaginationComponent.vue'
import { useStatementStore } from '@/stores/statements.ts'
import { useTypeStore } from '@/stores/type.ts'
import StatementSetListItemComponent from '@/components/ui/list/StatementSetListItemComponent.vue'
import { useRoute } from 'vue-router'
import ModalCreateStatementSetComponent from '@/components/ui/modal/statement-sets/ModalCreateStatementSetComponent.vue'
import { writeToClipboard } from '@/composables/useClipboard.ts'

const route = useRoute();

const statementStore = useStatementStore();
const typeStore = useTypeStore();

const showCreateModal = ref<boolean>(false);

const currentTextFilter = ref<string>('');
const currentTypeFilter = ref<string|null>(null);

const elementsPerPage = ref<number>(6);
const startIndex = ref<number>(0);
const endIndex = ref<number>(elementsPerPage.value);

const filteredStatementSets = computed(() => {
  const textFilter = statementStore.getStatementSets().filter(statementSet =>
    statementSet.explaination?.toLowerCase().includes(currentTextFilter.value.toLowerCase())
  );

  if (currentTypeFilter.value !== null) {
    return textFilter.filter(statementSet =>
      statementSet.statementType?.id === currentTypeFilter.value
    );
  }

  return textFilter;
});

const onHandleTypeFilterChange = (typeTitle: string) => {
  const typeByTitle = typeStore.getTypeByTitle(typeTitle);

  if (typeof typeByTitle === 'undefined') {
    currentTypeFilter.value = null;
    return;
  }

  currentTypeFilter.value = typeByTitle.id;
}

const onHandleExport = async () => {
  const exportString = await statementStore.getStatementsExportString();

  if (exportString) {
    await writeToClipboard(exportString);
  }
}

const onHandleDelete = (guid: string) => {
  statementStore.deleteStatementSet(guid);
}

onMounted(async () => {
  statementStore.isLoading = true;

  await typeStore.fillTypes();

  await statementStore.setActiveQuestionnaireById(<string>route.params.id);
  await statementStore.fillStatementSets();

  statementStore.isLoading = false;
})
</script>
