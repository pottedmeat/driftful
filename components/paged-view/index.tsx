import { Frame } from '~/types';

export interface PagedViewProps {
  frames: Frame[];
  frame: Frame | null;
  onFrameChange: (frame: Frame | null) => void;
}

export function PagedView({ frames, frame, onFrameChange }: PagedViewProps) {
  return null;
}