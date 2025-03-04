import { defineStore } from 'pinia'
import { ref } from 'vue'
import { apiService } from '@/services/apiService.ts'
import { apiRoutes, buildApiUrl } from '@/config/apiRoutes.ts'
import type {
  Questionnaire,
  StatementSetResponse,
  UpdateStatementSet,
} from '@/types/Questionnaire.ts'

export const useStatementStore = defineStore('statement', () => {
  const isLoading = ref<boolean>(false)

  const questionnaire = ref<Questionnaire | null>(null)
  const statementSets = ref<StatementSetResponse[]>([])

  const setActiveQuestionnaireById = async (id: string): Promise<void> => {
    questionnaire.value = null

    const route = buildApiUrl(apiRoutes.questionaireById, {
      questionaireId: id,
    })
    const response = await apiService.get<Questionnaire>(route)

    if (!response.data) {
      console.error('error: ', response.error)
      return
    }

    questionnaire.value = response.data
  }

  const getStatementSets = () => {
    return statementSets.value
  }

  const getStatementsExportString = async (): Promise<string|null> => {
    if (!questionnaire.value || !questionnaire.value.id) {
      console.error('Cannot export statements without questionnaire id')
      return null;
    }

    const id = questionnaire.value.id
    const exportRoute = buildApiUrl(apiRoutes.questionaireExport, {
      questionaireId: id,
    })
    const exportResponse = await apiService.get<string>(exportRoute)

    if (!exportResponse.data) {
      console.error('error: ', exportResponse.error)
      return null;
    }

    return exportResponse.data;
  }

  const createStatementSet = async (
    updateStatementSetData: UpdateStatementSet,
  ): Promise<void> => {
    if (!questionnaire.value || !questionnaire.value.id) {
      console.error('Cant save statements without questionnaire id')
      return
    }

    const statementSetRoute = buildApiUrl(apiRoutes.statementSets, {
      questionaireId: questionnaire.value.id,
    })
    const response = await apiService.post<StatementSetResponse>(
      statementSetRoute,
      updateStatementSetData,
    )

    if (!response.data || !response.status || response.status !== 200) {
      console.error('error: ', response.error)
      return
    }

    statementSets.value.push(response.data);
  }

  const editStatementSet = async (id: string, data: UpdateStatementSet): Promise<void> => {
    if (!questionnaire.value || !questionnaire.value.id) {
      console.error('Cant edit StatementSet without questionnaire id');
      return;
    }

    const route = buildApiUrl(apiRoutes.statementSetById, {
      questionaireId: questionnaire.value?.id,
      statementSetId: id
    })
    const response = await apiService.patch<StatementSetResponse>(route, data);
    if (!response.status || response.status !== 200) {
      console.error('error: ', response.error);
      return;
    }

    const localIndex = statementSets.value.findIndex(
      (statementSet) => statementSet.id === id
    );
    if (localIndex !== -1) {
      statementSets.value[localIndex] = <StatementSetResponse>response.data;
    }
  }

  const deleteStatementSet = async (id: string): Promise<void> => {
    if (!questionnaire.value || !questionnaire.value.id) {
      console.error('Cant save statements without questionnaire id')
      return
    }

    const deleteRoute = buildApiUrl(apiRoutes.statementSetById, {
      questionaireId: questionnaire.value.id,
      statementSetId: id,
    })
    const deleteResponse = await apiService.delete(deleteRoute)

    if (!deleteResponse.status || deleteResponse.status !== 204) {
      console.error('error: ', deleteResponse.error)
      return
    }

    deleteLocallyInStore(id)
  }

  const deleteLocallyInStore = (idToDelete: string) => {
    statementSets.value = statementSets.value.filter(
      statementSet => statementSet.id !== idToDelete,
    )
  }

  const fillStatementSets = async (): Promise<void> => {
    statementSets.value = []

    if (!questionnaire.value) {
      console.error('Cant load statements without questionnaire id')
      return
    }

    const route = buildApiUrl(apiRoutes.statementSets, {
      questionaireId: questionnaire.value.id,
    })
    const response = await apiService.get<StatementSetResponse[]>(route)
    if (!response.data) {
      console.error('error: ', response.error)
      return
    }

    response.data.forEach((statementSet: StatementSetResponse) => {
      statementSets.value.push(statementSet)
    })
  }

  return {
    isLoading,
    questionnaire,
    statementSets,
    setActiveQuestionnaireById,
    getStatementSets,
    getStatementsExportString,
    createStatementSet,
    editStatementSet,
    deleteStatementSet,
    fillStatementSets,
  }
})
