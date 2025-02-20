import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { ApiEndpoints } from '@/utils/api-urls'
import type { Questionaire } from '@/types/types'

export const useCounterStore = defineStore('questionaires', () => {
    const questionaires = ref<Questionaire>()
    const questionairesList = ref([])


    async function createQuestionaires(): Promise<void> {
        if (questionaires.value !== null) return;

        try {
            // TODO Rebuild because of "get-base-url.ts"
            const response = await fetch(ApiEndpoints.QUESTIONAIRES)


            if (!response.ok) {
                throw new Error('Failed to Load Questionaires')
            }

            questionaires.value = await response.json()

        } catch (error) {
            console.error('Failed to load location data:', error)

            throw new Error('Failed to Load Questionaires')
        }
    }
})
