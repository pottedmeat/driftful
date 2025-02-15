---
description: Describes the flyout pattern used throughout the application for expandable UI elements
globs: 
---

# Flyout Pattern

## Overview

The flyout pattern is a consistent UI pattern used throughout Driftful for revealing additional options or controls. Flyouts are expandable panels that slide out smoothly when triggered, providing contextual options while maintaining a clean interface.

## Implementation

### Core Behavior
- Appears below/above triggering element with smooth animation (150-300ms)
- Only one flyout active at a time
- Closes on outside interaction or action completion
- Maintains visual hierarchy through shadows/borders
- Displays a semi-transparent gray background overlay (90% transparency) beneath the flyout

### Common Use Cases

1. **Create Item Interface**
   - Main input field and create button
   - Item type selection and expander controls
   - Flyout contains pickers and timeframe toggles

2. **Edit Item Interface**
   - Primary: Horizontal row of action icons (edit, migrate, duplicate)
   - Secondary: Additional options for specific actions

### Technical Guidelines

1. **Animation & Interaction**
   - Consistent timing for transitions
   - Smooth animations without layout shifts
   - Preserves user input during type switches
   - Clears state on completion/cancellation

2. **Accessibility**
   - ARIA attributes for expandable content
   - Keyboard navigation support
   - Clear visual indicators
   - Touch-optimized targets for mobile

3. **Responsive Design**
   - Mobile: Touch-optimized areas, keyboard-aware positioning
   - Desktop: Hover states, keyboard shortcuts 

### Value Handling & Visual Feedback

1. **Value Flow**
   - Flyout receives an initial value when opened
   - User can modify the value through flyout controls
   - Modified value is returned when flyout closes

2. **Visual State Changes**
   - When returned value differs from initial value
   - Original trigger element is replaced with label/bubble
   - Label displays the newly selected value
   - Maintains visual consistency with the application's design system
   - Can be disabled via `showValueBubble` flag (enabled by default) 