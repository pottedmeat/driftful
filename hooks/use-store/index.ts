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
            id: { type: 'string' },
            type: { type: 'string' },
            content: { type: 'string' },
            day: { type: 'number', default: undefined },
            week: { type: 'number', default: undefined },
            month: { type: 'number', default: undefined },
            year: { type: 'number', default: undefined },
            collection_client_id: { type: 'string', default: undefined },
            collection_entity_id: { type: 'string', default: undefined },
            is_completed: { type: 'boolean', default: undefined },
            is_starred: { type: 'boolean', default: undefined },
            is_irrelevant: { type: 'boolean', default: undefined },
            created_at: { type: 'number' },
            updated_at: { type: 'number' },
          },
          pages: {
            id: { type: 'string' },
            start_day: { type: 'number' },
            end_day: { type: 'number', default: undefined },
          },
          action_log: {
            id: { type: 'string' },
            action_name: { type: 'string' },
            target_name: { type: 'string' },
            target_client_id: { type: 'string' },
            target_id: { type: 'string' },
            target_value_int: { type: 'number', default: undefined },
            target_value_str: { type: 'string', default: undefined },
            utc_timestamp: { type: 'number' },
            previous_value_int: { type: 'number', default: undefined },
            previous_value_str: { type: 'string', default: undefined },
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