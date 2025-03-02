<template>
  <article class="w-full bg-white flex flex-col xl:flex-row xl:flex-wrap gap-y-5 px-5 md:px-16 py-7 rounded">
    <div id="left" class="flex flex-col justify-between basis-3/5">
      <div id="options">
        <div v-for="n in 3" :key="n" class="flex gap-x-5 py-2">
          <p>{{ n }}</p>
          <p>VueJS is a JavaScript Framework</p>
        </div>
      </div>
    </div>
    <div id="right" class="basis-2/5 flex flex-col gap-y-5">
      <div class="max-h-96 w-auto flex justify-center xl:justify-end">
        <img src="https://www.placecats.com/400/300" class="object-contain rounded"  alt="img"/>
      </div>
    </div>

    <div id="bottom-button-row" class="w-full flex flex-col space-y-5 pt-10 justify-between items-center">
      <div class="text-center flex flex-col mx-auto">
        <p>
          Antwort
        </p>
        <input-text-field-component placeholder="Antwort..." />
        <p>
          Mehrere Antworten mit Kommata trennen
        </p>
      </div>
      <div class="w-fit">
        <button-component
          background-color="bg-main-blue dark:bg-gray-600 hover:bg-main-orange"
          text-color="text-gray-300 hover:text-main-blue px-10">
          Beantworten
        </button-component>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import InputTextFieldComponent from '@/components/ui/input/InputTextFieldComponent.vue'
import ButtonComponent from '@/components/ui/ButtonComponent.vue'

const props = defineProps({
    borderColor: {
        type: String,
        required: false,
    }
});

</script>
