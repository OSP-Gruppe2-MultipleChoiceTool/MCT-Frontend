import { useQuestionnairesStore } from '@/stores/questionnaires.ts'
import type { Questionnaire } from '@/types/Questionnaire.ts'

export const isValidGuid = (guid: string): boolean => {
  const guidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  return guidRegex.test(guid);
}
