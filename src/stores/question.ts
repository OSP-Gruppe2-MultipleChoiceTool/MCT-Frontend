import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Option {
  id: number;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: number;
  typeId: number;
  description: string;
  options: Option[];
  created: Date
}

export const useQuestionStore = defineStore('question', () => {
  const questions = ref<Question[]>([
    { id: 0, typeId: 0, description: 'What is Vue.js?', options: [
        { id: 0, text: 'A JavaScript framework', isCorrect: true },
        { id: 1, text: 'A CSS framework', isCorrect: false },
        { id: 2, text: 'A database', isCorrect: false },
        { id: 3, text: 'A text editor', isCorrect: false }
      ], created: new Date('2025-02-13') },
    { id: 1, typeId: 1, description: 'What is TypeScript?', options: [
        { id: 0, text: 'A superset of JavaScript', isCorrect: true },
        { id: 1, text: 'A type of database', isCorrect: false },
        { id: 2, text: 'A CSS preprocessor', isCorrect: false },
        { id: 3, text: 'A version control system', isCorrect: false }
      ], created: new Date('2025-02-14') },
    { id: 2, typeId: 2, description: 'What is a database?', options: [
        { id: 0, text: 'A system for storing data', isCorrect: true },
        { id: 1, text: 'A type of programming language', isCorrect: false },
        { id: 2, text: 'A CSS framework', isCorrect: false },
        { id: 3, text: 'A JavaScript library', isCorrect: false }
      ], created: new Date('2025-02-15') }
  ]);

  const getQuestions = (): Question[] => {
    return questions.value;
  }

  const fillQuestions = async (): Promise<void> => {
    // This method will fill the list of questions.
  };

  return { getQuestions, fillQuestions };
})
