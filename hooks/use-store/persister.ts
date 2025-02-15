import { Store } from 'tinybase';

export async function createPersister(_store: Store) {
  return {
    startAutoLoad: async () => {},
    startAutoSave: async () => {},
  };
}