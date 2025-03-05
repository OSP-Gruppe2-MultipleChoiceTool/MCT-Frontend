<template>
  <div class="w-full bg-white px-5 md:px-16 py-7 rounded border-2" :class="borderClass">
    <p>{{ props.explaination }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  isCorrect: {
    type: Boolean,
    required: true
  },
  explaination: {
    type: String,
    required: true
  }
});

const borderClass = computed(() => props.isCorrect ? 'border-green-500' : 'border-red-500');
</script>
