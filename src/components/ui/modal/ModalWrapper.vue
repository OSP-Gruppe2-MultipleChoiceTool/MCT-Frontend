<template>
<div class="absolute w-screen h-screen top-0 left-0 z-10 grid grid-cols-12 grid-rows-12 bg-main-blue/50 backdrop-blur">
  <div class="row-span-12 col-span-12 sm:row-start-2 sm:row-end-11 sm:col-start-4 sm:col-end-9">
    <slot />
  </div>
</div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>
