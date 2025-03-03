import { useQuestionnairesStore } from '@/stores/questionnaires.ts'
import type { Questionnaire } from '@/types/Questionnaire.ts'

export const isValidGuid = (guid: string): boolean => {
  const guidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  return guidRegex.test(guid);
}

export const getQuestionnaireById = async (id: string): Promise<Questionnaire|null> => {
  const questionnaireStore = useQuestionnairesStore();

  if (!isValidGuid(id)) return null;

  const doesExist = await questionnaireStore.getQuestionnaireById(<string>id);
  if (!doesExist) {
    console.error('Id does not exist');
    return null;
  }

  return doesExist;
}
