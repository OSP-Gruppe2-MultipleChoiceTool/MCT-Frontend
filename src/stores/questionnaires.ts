import { defineStore } from 'pinia'
import { ref } from 'vue'
import { apiService } from '@/services/apiService.ts'
import { apiRoutes } from '@/config/apiRoutes.ts'
import type { CreateQuestionnaire, Questionnaire } from '@/types/Questionnaire.ts'

export const useQuestionnairesStores = defineStore('questionnaires', () => {
  const isLoading = ref<boolean>(false);
  const questionnaires = ref<Questionnaire[]>([]);

  const getQuestionnaires = () => {
    return questionnaires.value;
  }

  const createQuestionnaire = async (data: CreateQuestionnaire): Promise<void> => {
    const response = await apiService.post<{ type: CreateQuestionnaire }>(
      apiRoutes.questionaires,
      data
    );
    if (!response.data) {
      console.error('error: ', response.error);
      return;
    }
  }

  const fillQuestionnaires = async (): Promise<void> => {
    isLoading.value = true;

    questionnaires.value = [];

    const response = await apiService.get<Questionnaire[]>(apiRoutes.questionaires);
    if (!response.data) {
      console.error('error: ', response.error)
      return;
    }

    response.data.forEach((questionnaire: Questionnaire) => {
      questionnaires.value.push(questionnaire);
    });

    isLoading.value = false;
  };

  return { questionnaires, createQuestionnaire, getQuestionnaires, fillQuestionnaires };
})
