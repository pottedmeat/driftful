import type { Store } from 'tinybase/persisters';
import { createIndexedDbPersister } from 'tinybase/persisters/persister-indexed-db';

export async function createPersister(store: Store, name: string) {
  return createIndexedDbPersister(store, name);
}