<template>
  <main class="w-screen h-screen grid grid-cols-12 grid-rows-12">
    <navigationbar-component class="col-start-1 row-start-1 col-span-full row-span-1" />

    <router-view class="col-start-1 row-start-2 row-span-full col-span-full" />
  </main>
</template>

<script setup lang="ts">
import NavigationbarComponent from "@/components/ui/NavigationbarComponent.vue";
</script>

<style scoped>
</style>
