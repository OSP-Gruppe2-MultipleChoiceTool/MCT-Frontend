<template>
  <div class="flex flex-col gap-y-3 py-4 relative">
    <div class="flex flex-col gap-y-2">
      <p class="text-xl pb-2" style="font-weight: 700;">Neue Frage hinzufügen</p>
      <div class="flex flex-col gap-y-2">
        <span>Question Type</span>
        <dropdown-component class=""/>
      </div>
      <div class="flex flex-col gap-y-2">
        <span>Frage</span>
        <searchbar-component class="" />
      </div>
      <label for="explanation">Erklärung</label>
      <searchbar-component class="h-50" :is-text-area="true" />
    </div>
    <div class="flex justify-between items-center gap-x-2">
      <icon-upload />
      <input type="file" id="fileInput" class="hidden" @change="handleFileInputChange">
      <label for="fileInput" class="w-full cursor-pointer inline-flex items-center bg-gray-100 text-slate-900 py-2 px-4 rounded-lg">
        {{ fileName }}
      </label>
      <icon-trash-bin />
    </div>
    <div class="flex flex-col gap-y-1">
      <div v-for="n in 3" :key="n" class="flex items-center gap-x-2">
        <input-checkbox-test-component />
        <icon-trash-bin />
      </div>
    </div>
    <div class="flex gap-x-5">
      <button class="flex gap-x-1 items-center">
        <icon-plus />
        Option hinzufügen
      </button>
      <button class="flex gap-x-1 items-center">
        <icon-shuffle />
        Mischen
      </button>
    </div>
    <div class="">
      <button>Abbrechen</button>
      <button>Frage speichern</button>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue'
import IconUpload from '@/components/icons/IconUpload.vue'
import DropdownComponent from '@/components/ui/DropdownComponent.vue'
import SearchbarComponent from '@/components/ui/SearchbarComponent.vue'
import IconTrashBin from '@/components/icons/IconTrashBin.vue'
import IconPlus from '@/components/icons/IconPlus.vue'
import IconShuffle from '@/components/icons/IconShuffle.vue'
import InputCheckboxTestComponent from '@/components/ui/input/InputCheckboxTestComponent.vue'

const fileName = ref<string|null>('Bild hochladen...');

const handleFileInputChange = (event: Event): void => {
  if (!event.target) return;
  fileName.value = event.target.files[0] ? event.target.files[0].name : 'Bild hochladen...';
}
</script>
