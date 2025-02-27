<template>
    <div class="bg-white flex gap-10 flex justify-center items-center">
        <div class="bg-gray-50 text-lg w-70 h-30 flex flex-col justify-center items-center rounded-sm border hover:bg-main-blue hover:text-white">
            <IconDumbbell class="text-3xl" />
            <p class="font-bold">Übung</p>
        </div>
        <div class="bg-gray-50 text-lg w-70 h-30 flex flex-col justify-center items-center rounded-sm border hover:bg-main-blue hover:text-white">
            <IconClipboard class="text-3xl"/>
            <p class="font-bold">Prüfen</p>
        </div>
    </div>

</template>
<script setup lang="ts">
import IconClipboard from '@/components/icons/IconClipboard.vue';
import IconDumbbell from '@/components/icons/IconDumbbell.vue';


</script>