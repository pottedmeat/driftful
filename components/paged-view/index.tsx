import type { FrameChangeCallback, LoadedFrame } from '~/types';

export interface PagedViewProps {
  frames: LoadedFrame[];
  frame: LoadedFrame;
  onFrameChange: FrameChangeCallback;
}

export function PagedView({ frames, frame, onFrameChange }: PagedViewProps) {
  return null;
}