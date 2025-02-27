import { defineStore } from 'pinia'
import { ref } from 'vue'
import { apiService } from '@/services/apiService.ts'
import { apiRoutes, buildApiUrl } from '@/config/apiRoutes.ts'
import type { Questionnaire, StatementSet } from '@/types/Questionnaire.ts'

export const useStatementStore = defineStore('statement', () => {
  const isLoading = ref<boolean>(false);

  const questionnaire = ref<Questionnaire|null>(null);
  const statementSets = ref<StatementSet[]>([]);

  const setActiveQuestionnaireById = async (id: string): Promise<void> => {
    questionnaire.value = null;

    const route = buildApiUrl(apiRoutes.questionaireById, { questionaireId: id })
    const response = await apiService.get<Questionnaire>(route);

    if (!response.data) {
      console.error('error: ', response.error)
      return;
    }

    questionnaire.value = response.data;
  }

  const getStatementSets = () => {
    return statementSets.value;
  }

  const createStatement = async (): Promise<void> => {

  }

  const fillStatementSets = async (): Promise<void> => {
    isLoading.value = true;

    statementSets.value = [];

    if (!questionnaire.value) {
      console.error('Cant load statements without questionnaire id');
      return;
    }

    const route = buildApiUrl(apiRoutes.statementSets, { questionaireId: questionnaire.value.id })
    const response = await apiService.get<StatementSet[]>(route);
    if (!response.data) {
      console.error('error: ', response.error)
      return;
    }

    response.data.forEach((statementSet: StatementSet) => {
      statementSets.value.push(statementSet);
    });

    isLoading.value = false;
  };

  return { isLoading, questionnaire, statementSets, setActiveQuestionnaireById, getStatementSets, createStatement, fillStatementSets };
})
