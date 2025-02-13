<template>
  <header class="bg-[#1A2238] w-full h-full">
    <div class="h-full flex items-center pl-5">
      <icon-quiz-maker />

      <p id="logo-text" class="pl-2 text-gray-200">QuizMaker</p>
    </div>
  </header>
</template>

<script setup lang="ts">
import IconQuizMaker from "@/components/icons/IconQuizMaker.vue";
</script>

<style scoped>
#logo-text {
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 20px;
}
</style>
