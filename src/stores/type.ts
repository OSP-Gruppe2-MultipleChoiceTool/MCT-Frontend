import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { CreateStatementType, StatementType } from '@/types/Questionnaire.ts'
import { apiRoutes } from '@/config/apiRoutes.ts'
import { apiService } from '@/services/apiService.ts'

export const useTypeStore = defineStore('type', () => {
  const isLoading = ref<boolean>(false);
  const types = ref<StatementType[]>([]);

  const getTypes = (): StatementType[] => {
    return types.value;
  }

  const getTypeById = (id: string): StatementType => {
    return <StatementType>types.value.find(type => type.id === id);
  }

  const getTypeByTitle = (title: string): StatementType|undefined => {
    return <StatementType>types.value.find(type => type.title === title);
  }

  const createType = async (data: CreateStatementType): Promise<null|StatementType> => {
    const response = await apiService.put<StatementType>(
      apiRoutes.statementTypes,
      data
    );
    if (!response.status || response.status !== 200 || !response.data) {
      console.error('error: ', response.error);
      return null;
    }

    types.value.push(response.data);
    return response.data;
  }

  const fillTypes = async (): Promise<void> => {
    isLoading.value = true;

    types.value = [];

    const response = await apiService.get<StatementType[]>(apiRoutes.statementTypes);
    if (!response.data) {
      console.error('error: ', response.error);
      return;
    }

    response.data.forEach((statementType: StatementType) => {
      types.value.push(statementType);
    })

    isLoading.value = false;
  };

  return { types, getTypes, getTypeById, getTypeByTitle, createType, fillTypes };
})
