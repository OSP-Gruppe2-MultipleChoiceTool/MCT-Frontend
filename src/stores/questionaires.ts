import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { ApiEndpoints } from '@/utils/api-urls'

export const useCounterStore = defineStore('questionaires', () => {
    const questionaires = ref({})
    const questionairesList = ref([])


    async function getQuestionaires(): Promise<void> {
        if (questionaires !== undefined) return

        try {
            // TODO Rebuild because of "get-base-url.ts"
            const response = await fetch(ApiEndpoints.QUESTIONAIRES)


            if (!response.ok) {
                throw new Error('Failed to Load Questionaires')
            }

            questionaires.value = response

        } catch (error) {
            console.error('Failed to load location data:', error)

            throw new Error('Failed to Load Questionaires')
        }
    }
})
