import type { useSegments } from "expo-router";

/**
 * Utility type that joins an array of strings with a delimiter
 */
export type Join<Items extends string[], Delimiter extends string = ""> =
  Items extends [] ? ""
    : Items extends [infer First, ...infer Rest]
      ? `${First & string}${Rest extends [] ? ""
        : `${Delimiter}${Join<Rest extends string[] ? Rest : [], Delimiter>}`}`
    : string;

// Frame type that enforces mutual exclusivity of frame properties
export type Frame =
  | { page: 'today' }
  | { page: number | 'future'; startDay?: number; endDay?: number }
  | { page: null }
    | { week: number | null }
  | { month: number | null }
  | { year: number | null }
  | { collection: string | null };
export type FrameType = Exclude<KeysOfUnion<Frame>, "startDay" | "endDay">;
export type FrameVariants = {
  [K in FrameType]: {
    plural: `${K}s`;
    dynamic: `[${K}]`;
    group: `(${K})`;
    tuple: [K, ValueInUnion<Frame, K>];
  };
};
export type FrameTypePlural = FrameVariants[FrameType]["plural"];
export type FrameTypeDynamic = FrameVariants[FrameType]["dynamic"];
export type FrameTypeGroup = FrameVariants[FrameType]["group"];
export type FrameTypeTuple = FrameVariants[FrameType]["tuple"];
export type FrameTypeWindow = FrameTypeTuple[1];

export type FrameChangeCallback = (frame: Frame) => void;

// Frame with loaded content and metadata
export type LoadedFrame = Exclude<NonNullFrame, { page: "today" }> & {
  title?: string;
  entities?: Entity[];
};

export interface Entity {
  entityId: string;
  type: "task" | "note" | "event" | "collection";
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

export type SegmentsWithPlaceholders = ShiftTwoAndReplace<ReturnType<typeof useSegments>, FrameTypeDynamic, string>;

/** Helper Types */

type KeysOfUnion<T> = T extends any ? keyof T : never;

type ValueInUnion<T, K extends PropertyKey> = T extends any
  ? (K extends keyof T ? T[K] : never)
  : never;

type HasNever<T, K extends PropertyKey> = {
  [P in Extract<keyof T, K>]: NonNullable<T[P]> extends never ? true : false;
}[Extract<keyof T, K>];

type RemoveNullFromKeys<T, K extends PropertyKey> = T extends any
  ? HasNever<T, K> extends true ? never
  : { [P in keyof T]: P extends K ? NonNullable<T[P]> : T[P] }
  : never;

type NonNullFrame = RemoveNullFromKeys<Frame, FrameType>;

type ShiftTwoAndReplace<
  T extends readonly string[],
  Ref extends string,
  Replacement
> = T extends [any, any, ...infer Rest]
  ? Rest extends string[]
    ? { [K in keyof Rest]: Rest[K] extends Ref ? Replacement : Rest[K] }
    : never
  : never;