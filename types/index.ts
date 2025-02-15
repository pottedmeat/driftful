// Frame type that enforces mutual exclusivity of frame properties
export type Frame = 
  | { page: 'today' }
  | { page: number | 'future', startDay?: number, endDay?: number }
  | { page: null },
  | { week: number | null }
  | { month: number | null }
  | { year: number | null }
  | { collection: string | null };

// Frame with loaded content and metadata
export interface LoadedFrame extends Frame {
  title?: string;
  entities?: Entity[];
}

export interface Entity {
  entityId: string;
  type: 'task' | 'note' | 'event' | 'collection';
  content: string;
  day?: number;
  week?: number;
  month?: number;
  year?: number;
  collection_client_id?: string;
  collection_entity_id?: string;
  is_completed?: boolean;
  is_starred?: boolean;
  is_irrelevant?: boolean;
  created_at: number;
  updated_at: number;
}