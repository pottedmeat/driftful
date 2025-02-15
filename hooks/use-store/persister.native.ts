import type { Store } from 'tinybase/persisters';
import { openDatabaseSync } from 'expo-sqlite';
import { createIndexedDbPersister } from 'tinybase/persisters/persister-indexed-db';

export async function createPersister(store: Store, name: string) {
  const db = openDatabaseSync(`${name}.db`);
  return createIndexedDbPersister(store, db, name);
}