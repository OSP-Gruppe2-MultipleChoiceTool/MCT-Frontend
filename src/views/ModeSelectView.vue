<template>
    <div class="flex flex-col md:flex-row gap-10 justify-center items-center">
        <div
          class="bg-gray-50 text-lg w-70 h-30 flex flex-col justify-center items-center rounded-sm border hover:bg-main-blue hover:text-white cursor-pointer"
          @click="router.push({ name: 'training-mode', params: { id: <string>route.params.id } })"
        >
            <IconDumbbell class="text-3xl" />
            <p class="font-bold">Übung</p>
        </div>
        <div
          class="bg-gray-50 text-lg w-70 h-30 flex flex-col justify-center items-center rounded-sm border hover:bg-main-blue hover:text-white cursor-pointer"
          @click="router.push({ name: 'exam-mode', params: { id: <string>route.params.id } })"
        >
            <IconClipboard class="text-3xl"/>
            <p class="font-bold">Prüfen</p>
        </div>
    </div>

</template>
<script setup lang="ts">
import IconClipboard from '@/components/icons/IconClipboard.vue';
import IconDumbbell from '@/components/icons/IconDumbbell.vue';
import router from '@/router'
import { useRoute } from 'vue-router'

const route = useRoute();
</script>
