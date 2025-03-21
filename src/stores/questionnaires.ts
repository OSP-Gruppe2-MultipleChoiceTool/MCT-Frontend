import { defineStore } from 'pinia'
import { ref } from 'vue'
import { apiService } from '@/services/apiService.ts'
import { apiRoutes, buildApiUrl } from '@/config/apiRoutes.ts'
import type { CreateQuestionnaire, Questionnaire } from '@/types/Questionnaire.ts'

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
    const url = data.statementTypeId
      ? buildApiUrl(apiRoutes.questionaireByTypeId, { statementTypeId: data.statementTypeId })
      : apiRoutes.questionaires;

    const response = await apiService.post<Questionnaire>(url, data);

    if (!response.data) {
      console.error('error: ', response.error);
      return;
    }

    questionnaires.value.push(response.data);
  }

  const editQuestionnaire = async (id: string, data: CreateQuestionnaire): Promise<void> => {
    const response = await apiService.patch(
      buildApiUrl(apiRoutes.questionaireById, { questionaireId: id }),
      data
    );
    if (!response.status || response.status !== 200) {
      console.error('error: ', response.error);
      return;
    }

    const localIndex = questionnaires.value.findIndex(
      (question) => question.id === id
    );
    if (localIndex !== -1) {
      questionnaires.value[localIndex] = <Questionnaire>response.data;
    }
  }

  const deleteQuestionnaire = async (id: string): Promise<void> => {
    const deleteRoute = buildApiUrl(apiRoutes.questionaireById, {
      questionaireId: id,
    });
    const deleteResponse = await apiService.delete(deleteRoute);

    if (!deleteResponse.status || deleteResponse.status !== 204) {
      console.error('error: ', deleteResponse.error)
      return;
    }

    deleteLocallyInStore(id);
  }

  const deleteLocallyInStore = (idToDelete: string) => {
    questionnaires.value = questionnaires.value.filter(
      (questionnaire) => questionnaire.id !== idToDelete
    );
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
    editQuestionnaire,
    deleteQuestionnaire,
    getQuestionnaires,
    fillQuestionnaires
  };
})
