import { defineStore } from 'pinia'
import { ref } from 'vue'
import { apiService } from '@/services/apiService.ts'
import { apiRoutes, buildApiUrl } from '@/config/apiRoutes.ts'
import type { CreateQuestionnaire, Questionnaire } from '@/types/Questionnaire.ts'
import { isValidGuid } from '@/composables/useDataValidation.ts'

export const useQuestionnairesStore = defineStore('questionnaires', () => {
  const isLoading = ref<boolean>(false);
  const questionnaires = ref<Questionnaire[]>([]);

  const getQuestionnaires = () => {
    return questionnaires.value;
  }

  const getQuestionnaireById = async (id: string): Promise<Questionnaire|null> => {
    const questionnaireRoute = buildApiUrl(apiRoutes.questionaireById, { questionaireId: id });
    const response = await apiService.get<Questionnaire>(questionnaireRoute);
    if (!response.data) {
      console.error('No questionnaire found with id ', id);
      return null;
    }

    return response.data;
  }

  const createQuestionnaire = async (data: CreateQuestionnaire): Promise<void> => {
    const response = await apiService.post<CreateQuestionnaire>(
      apiRoutes.questionaires,
      data
    );
    if (!response.data) {
      console.error('error: ', response.error);
      return;
    }
  }

  const fillQuestionnaires = async (): Promise<void> => {
    questionnaires.value = [];

    const response = await apiService.get<Questionnaire[]>(apiRoutes.questionaires);
    if (!response.data) {
      console.error('error: ', response.error)
      return;
    }

    response.data.forEach((questionnaire: Questionnaire) => {
      questionnaires.value.push(questionnaire);
    });
  };

  return {
    isLoading,
    questionnaires,
    getQuestionnaireById,
    createQuestionnaire,
    getQuestionnaires,
    fillQuestionnaires
  };
})
