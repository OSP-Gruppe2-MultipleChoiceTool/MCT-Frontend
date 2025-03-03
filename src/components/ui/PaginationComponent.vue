<template>
  <div class="flex justify-between dark:text-gray-200">
    <p>Zeige {{ getVisibleDataCount() }} von {{ props.itemCount }} Elemente</p>
    <div class="flex gap-x-2 ml-auto">
      <button-component
        v-if="hasPreviousPage"
        background-color="bg-main-blue dark:bg-gray-600 hover:bg-main-orange"
        text-color="text-gray-300 hover:text-main-blue"
        @click="currentPageNumber = 1">
        Anfang
      </button-component>
      <button-component
        v-if="hasPreviousPage"
        background-color="bg-main-blue dark:bg-gray-600 hover:bg-main-orange"
        text-color="text-gray-300 hover:text-main-blue"
        @click="currentPageNumber--">
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
        text-color="text-gray-300 hover:text-main-blue"
        @click="currentPageNumber++">
        {{ currentPageNumber + 1 }}
      </button-component>
      <button-component
        v-if="hasNextPage"
        background-color="bg-main-blue dark:bg-gray-600 hover:bg-main-orange"
        text-color="text-gray-300 hover:text-main-blue"
        @click="getLastPage()">
        Ende
      </button-component>
    </div>
  </div>
</template>

<script setup lang="ts">
import ButtonComponent from '@/components/ui/ButtonComponent.vue'
import { computed, ref, watch } from 'vue'

const emits = defineEmits(['update:startIndex', 'update:endIndex']);

const props = defineProps({
  maxPerPage: {
    required: true,
    type: Number
  },
  itemCount: {
    required: true,
    type: Number
  },
  startIndex: {
    required: true,
    type: Number
  },
  endIndex: {
    required: true,
    type: Number
  }
});

const currentPageNumber = ref<number>(1);
watch(currentPageNumber, () => {
  emits('update:startIndex', getStartIndex());
  emits('update:endIndex', getEndIndex());
});

const hasPreviousPage = computed((): boolean => {
  return currentPageNumber.value > 1;
});

const hasNextPage = computed((): boolean => {
  return currentPageNumber.value < calculatePageCount();
});

const calculatePageCount = (): number => {
  return props.itemCount / props.maxPerPage;
}

const getStartIndex = (): number => {
  return (currentPageNumber.value - 1) * props.maxPerPage;
}

const getEndIndex = (): number => {
  return Math.min(getStartIndex() + props.maxPerPage, props.itemCount);
}

const getVisibleDataCount = (): string => {
  let startIndex = getStartIndex();
  const endIndex = getEndIndex();

  if (props.itemCount <= 0) {
    startIndex = 0;
  } else {
    startIndex = startIndex + 1;
  }

  return startIndex + '-' + endIndex;
}

const getLastPage = (): void => {
  alert('to be implemented'); // TODO
}
</script>

<style scoped>

</style>
