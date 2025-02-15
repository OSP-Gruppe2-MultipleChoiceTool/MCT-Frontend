<template>
  <div class="flex justify-between dark:text-gray-200">
    <p>Zeige {{ getVisibleDataCount() }} von {{ props.itemCount }} Aufgaben</p>
    <div class="flex gap-x-2 ml-auto">
      <button-component
        v-if="hasPreviousPage"
        background-color="bg-main-blue dark:bg-gray-600 hover:bg-main-orange"
        text-color="text-gray-300 hover:text-main-blue">
        Anfang
      </button-component>
      <button-component
        v-if="hasPreviousPage"
        background-color="bg-main-blue dark:bg-gray-600 hover:bg-main-orange"
        text-color="text-gray-300 hover:text-main-blue">
        {{ currentPageNumber - 1 }}
      </button-component>
      <button-component
        background-color="bg-main-orange hover:bg-gray-500"
        text-color="text-gray-300 dark:text-main-blue hover:text-main-orange">
        {{ currentPageNumber }}
      </button-component>
      <button-component
        v-if="hasNextPage"
        background-color="bg-main-blue dark:bg-gray-600 hover:bg-main-orange"
        text-color="text-gray-300 hover:text-main-blue">
        {{ currentPageNumber + 1 }}
      </button-component>
      <button-component
        v-if="hasNextPage"
        background-color="bg-main-blue dark:bg-gray-600 hover:bg-main-orange"
        text-color="text-gray-300 hover:text-main-blue">
        Ende
      </button-component>
    </div>
  </div>
</template>

<script setup lang="ts">
import ButtonComponent from '@/components/ui/ButtonComponent.vue'
import { computed, ref } from 'vue'

const props = defineProps({
  maxPerPage: {
    required: true,
    type: Number
  },
  itemCount: {
    required: true,
    type: Number
  }
});

const currentPageNumber = ref<number>(1);

const hasPreviousPage = computed((): boolean => {
  return currentPageNumber.value > 1;
});

const hasNextPage = computed((): boolean => {
  return currentPageNumber.value < calculatePageCount();
});

const calculatePageCount = (): number => {
  return props.itemCount / props.maxPerPage;
}

const getVisibleDataCount = (): string => {
  const startIndex = (currentPageNumber.value - 1) * props.maxPerPage;
  const endIndex = Math.min(startIndex + props.maxPerPage, props.itemCount);

  return startIndex + 1 + '-' + endIndex;
}
</script>

<style scoped>

</style>
