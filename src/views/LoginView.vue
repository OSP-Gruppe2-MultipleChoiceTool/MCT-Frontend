<template>
    <div class="bg-white w-full h-90 max-w-md mx-auto py-6 px-4 rounded-sm shadow-2xs">
        <div class="text-center">
            <div class="flex justify-center mb-4">
                <icon-profile class="w-12" />
            </div>
            <h2 class="font-bold text-xl sm:text-2xl mb-2">Willkommen zurück</h2>
            <p class="opacity-50 text-sm">Bitte gebe deinen Identifzierungscode ein</p>
        </div>
        <div class="mt-6">
            <p class="mb-2 text-sm">Identification Code:</p>
            <input-text-field-component />
            <div class="mt-4">
                <button-component background-color="bg-black" text-color="text-white" class="w-full">
                    Weiter
                </button-component>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import IconProfile from '@/components/icons/IconProfile.vue';
import ButtonComponent from '@/components/ui/ButtonComponent.vue';
import InputTextFieldComponent from '@/components/ui/input/InputTextFieldComponent.vue';



</script>