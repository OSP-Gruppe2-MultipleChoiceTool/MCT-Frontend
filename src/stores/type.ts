import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Type {
  id: number;
  name: string;
}

export const useTypeStore = defineStore('type', () => {
  const types = ref<Type[]>([
    { id: 0, name: 'Programmierung' },
    { id: 1, name: 'Design' },
    { id: 2, name: 'Datenbank' }
  ]);

  const getTypes = (): Type[] => {
    return types.value;
  }

  const getTypeById = (id: number): Type => {
    return <Type>types.value.find(type => type.id === id);
  }

  const fillTypes = async (): Promise<void> => {
    // This method will fill the list of types.
  };

  return { getTypes, getTypeById, fillTypes };
})
