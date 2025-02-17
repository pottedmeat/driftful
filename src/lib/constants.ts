import type {
  FrameType,
  FrameTypeDynamic,
  FrameTypePlural,
  FrameTypeGroup,
} from '~/types';

export const FRAME_TYPES = [
  'page',
  'week',
  'month',
  'year',
  'collection',
] as readonly FrameType[];
export const FRAME_TYPES_PLURAL = FRAME_TYPES.map((type) => `${type}s`) as readonly FrameTypePlural[];
export const FRAME_TYPES_DYNAMIC = FRAME_TYPES.map((type) => `[${type}]`) as readonly FrameTypeDynamic[];
export const FRAME_TYPES_GROUP = FRAME_TYPES.map((type) => `(${type})`) as readonly FrameTypeGroup[];
export const FRAME_TYPES_NAME = ['Page', 'Week', 'Month', 'Year', 'Collection'] as readonly string[];
export const FRAME_TYPES_PLURAL_NAME = ['Pages', 'Weeks', 'Months', 'Years', 'Collections'] as readonly string[];
export const FRAME_TYPE_MAPPINGS = FRAME_TYPES.reduce((acc, type) => ({
  ...acc,
  [type]: {
    plural: FRAME_TYPES_PLURAL[FRAME_TYPES.indexOf(type)],
    dynamic: FRAME_TYPES_DYNAMIC[FRAME_TYPES.indexOf(type)],
    group: FRAME_TYPES_GROUP[FRAME_TYPES.indexOf(type)],
    name: FRAME_TYPES_NAME[FRAME_TYPES.indexOf(type)],
    pluralName: FRAME_TYPES_PLURAL_NAME[FRAME_TYPES.indexOf(type)],
  },
}), {} as Record<FrameType, {
  plural: FrameTypePlural;
  dynamic: FrameTypeDynamic;
  group: FrameTypeGroup;
  name: string;
  pluralName: string;
}>);

export const NAV_THEME = {
  light: {
    background: 'hsl(0 0% 100%)', // background
    border: 'hsl(240 5.9% 90%)', // border
    card: 'hsl(0 0% 100%)', // card
    notification: 'hsl(0 84.2% 60.2%)', // destructive
    primary: 'hsl(240 5.9% 10%)', // primary
    text: 'hsl(240 10% 3.9%)', // foreground
  },
  dark: {
    background: 'hsl(240 10% 3.9%)', // background
    border: 'hsl(240 3.7% 15.9%)', // border
    card: 'hsl(240 10% 3.9%)', // card
    notification: 'hsl(0 72% 51%)', // destructive
    primary: 'hsl(0 0% 98%)', // primary
    text: 'hsl(0 0% 98%)', // foreground
  },
};
