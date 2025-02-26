import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Statement } from '@/types/Questionnaire.ts'

export const useStatementStore = defineStore('statement', () => {
  const statements = ref<Statement[]>([]);

  const getStatements = () => {
    return statements.value;
  }

  const fillStatements = async (): Promise<void> => {
    // This method will fill the list of questions.
  };

  return { getStatements, fillStatements };
})
