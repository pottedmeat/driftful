import { createStore, type Store } from 'tinybase';
import { useCallback, useEffect, useState } from 'react';
import { createPersister } from './persister';

let store: Store | null = null;

export function useStore() {
  const [isReady, setIsReady] = useState(false);

  const initialize = useCallback(async () => {
    if (!store) {
      console.log('Initializing store');
      store = createStore()
        .setTablesSchema({
          entities: {
            id: 'string',
            type: 'string',
            content: 'string',
            day: 'number?',
            week: 'number?',
            month: 'number?',
            year: 'number?',
            collection_client_id: 'string?',
            collection_entity_id: 'string?',
            is_completed: 'boolean?',
            is_starred: 'boolean?',
            is_irrelevant: 'boolean?',
            created_at: 'number',
            updated_at: 'number',
          },
          pages: {
            id: 'string',
            start_day: 'number',
            end_day: 'number?',
          },
          action_log: {
            id: 'string',
            action_name: 'string',
            target_name: 'string',
            target_client_id: 'string',
            target_id: 'string',
            target_value_int: 'number?',
            target_value_str: 'string?',
            utc_timestamp: 'number',
            previous_value_int: 'number?',
            previous_value_str: 'string?',
          },
        });

      // Initialize platform-specific persister
      console.log('Initializing persister');
      const persister = await createPersister(store);
      console.log('Autoloading persister');
      await persister.startAutoLoad();
      await persister.startAutoSave();
    }
    setIsReady(true);
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return { store: store!, isReady };
}