<template>
    <div class="bg-white w-110 h-90 py-7 rounded-sm shadow-2xs">
        <div class="">
            <div class="icon text text-center flex-col w-full h-full items-center">
                <div class="flex justify-center">
                    <IconProfile class="w-15"/>
                </div>
                <h2 class="font-bold text-2xl pb-4">Willkommen zurück</h2>
                <p class="opacity-50">Bitte gebe dein Identifzierungscode ein</p>
            </div>
        </div>
        <div class="py-8">
            <p class="py-2">Identification Code:</p>
            <InputTextFieldComponent/>
            <div class="py-2 w-full">
                <ButtonComponent background-color="bg-black" text-color="text-white">
                    Weiter
                </ButtonComponent>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import IconProfile from '@/components/icons/IconProfile.vue';
import ButtonComponent from '@/components/ui/ButtonComponent.vue';
import InputTextFieldComponent from '@/components/ui/input/InputTextFieldComponent.vue';
</script>