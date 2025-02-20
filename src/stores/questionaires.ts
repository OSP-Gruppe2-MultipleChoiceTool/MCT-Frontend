import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { ApiEndpoints } from '@/utils/api-urls'
import type { Questionaire } from '@/types/types'
import API from '@/utils/api-wrapper'

export const useCounterStore = defineStore('questionaires', () => {
    const questionaires = ref<Questionaire>()
    const questionairesList = ref([])


    async function createQuestionaires(): Promise<void> {
        if (questionaires.value !== null) return;

        try {
            const response = await API.post(ApiEndpoints.QUESTIONAIRES)


            questionaires.value = await response.data

        } catch (error) {
            console.error('Failed to load location data:', error)

            throw new Error('Failed to Load Questionaires')
        }
    }
    return {
      createQuestionaires,
    }
})
