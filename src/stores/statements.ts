import { defineStore } from 'pinia'
import { ref } from 'vue'
import { apiService } from '@/services/apiService.ts'
import { apiRoutes, buildApiUrl } from '@/config/apiRoutes.ts'
import type {
  Questionnaire,
  StatementSetResponse,
  UpdateStatement,
  UpdateStatementSet,
} from '@/types/Questionnaire.ts'

export const useStatementStore = defineStore('statement', () => {
  const isLoading = ref<boolean>(false);

  const questionnaire = ref<Questionnaire|null>(null);
  const statementSets = ref<StatementSetResponse[]>([]);

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

  const createStatementSet = async (setData: UpdateStatementSet, data: UpdateStatement[]): Promise<void> => {
    if (!questionnaire.value || !questionnaire.value.id) {
      console.error('Cant save statements without questionnaire id');
      return;
    }

    const statementSetRoute = buildApiUrl(apiRoutes.statementSets, { questionaireId: questionnaire.value.id });
    const statementSetResponse = await apiService.post<StatementSetResponse>(
      statementSetRoute,
      setData
    );

    if (!statementSetResponse.data) {
      console.error('error: ', statementSetResponse.error)
      return;
    }

    const statementRoute = buildApiUrl(apiRoutes.statements, {
      questionaireId: questionnaire.value.id,
      statementSetId: statementSetResponse.data.id
    });

    for (const item of data) {
      await apiService.put(statementRoute, item);
    }
  }

  const deleteStatementSet = async (id: string): Promise<void> => {
    if (!questionnaire.value || !questionnaire.value.id) {
      console.error('Cant save statements without questionnaire id');
      return;
    }

    isLoading.value = true;

    const deleteRoute = buildApiUrl(apiRoutes.statementSetById, {
      questionaireId: questionnaire.value.id,
      statementSetId: id
    });
    const deleteResponse = await apiService.delete(deleteRoute);

    if (!deleteResponse.data) {
      console.error('error: ', deleteResponse.error)
      return;
    }

    isLoading.value = false;
  }

  const fillStatementSets = async (): Promise<void> => {
    isLoading.value = true;

    statementSets.value = [];

    if (!questionnaire.value) {
      console.error('Cant load statements without questionnaire id');
      return;
    }

    const route = buildApiUrl(apiRoutes.statementSets, { questionaireId: questionnaire.value.id })
    const response = await apiService.get<StatementSetResponse[]>(route);
    if (!response.data) {
      console.error('error: ', response.error)
      return;
    }

    response.data.forEach((statementSet: StatementSetResponse) => {
      statementSets.value.push(statementSet);
    });

    isLoading.value = false;
  };

  return { isLoading, questionnaire, statementSets, setActiveQuestionnaireById, getStatementSets, createStatementSet, deleteStatementSet, fillStatementSets };
})
