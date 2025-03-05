<template>
  <main class="w-screen h-screen grid grid-cols-12 grid-rows-12 bg-gray-200 dark:bg-main-blue">
    <navigationbar-component class="col-start-1 row-start-1 col-span-full row-span-1 px-8 md:px-16 lg:px-24" />

    <Notivue v-slot="item">
      <Notification :item="item" />
    </Notivue>

    <router-view
      :key="$route.fullPath"
      class="col-start-1 row-start-2 row-span-full col-span-full px-8 md:px-16 lg:px-24"
    />
  </main>
</template>

<script setup lang="ts">
import { Notivue, Notification } from 'notivue'
import NavigationbarComponent from "@/components/ui/NavigationbarComponent.vue";
</script>

<style scoped>

</style>
