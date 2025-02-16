# Project Brief: Driftful

## Core Vision
Driftful is a mobile-first web application designed to provide a minimalistic, Bullet Journal-inspired task management system. It offers quick entry for tasks, notes, and events, letting users either assign items to specific dates (grouped into Pages) or store them in Collections for non-time-based organization.

## Target Audience
- **Primary Users:**
  - "Minimalist Scatterbrains" - People who crave a simple, low-friction way to capture their thoughts
  - BuJo (Bullet Journal) Enthusiasts - Looking to digitize elements of their analog journaling process
  - Users overwhelmed by feature-heavy task managers like Trello or Notion

## Core Problems Solved
1. **Overwhelming Features** in traditional task managers
2. **Misplaced Intentions** in day-to-day life
3. **Need for Quick Capture** of tasks, notes, and events
4. **Desire for Digital BuJo** features without losing analog simplicity

## Essential Features

1. **Fast Entry System**
   - Single-step input for tasks, notes, and events
   - Immediate assignment to timeframes or collections
   - Mobile-optimized input with persistent bottom bar
   - Desktop-optimized floating action button

2. **Flexible Organization**
   - Page-based organization (like a physical journal)
   - Week/Month/Year views for broader context
   - Collections for non-temporal organization
   - User-driven page creation and transitions

3. **Seamless Migration**
   - Automatic migration during page creation
   - Time boundary transitions
   - Manual migration with breadcrumb tracking
   - No confirmation dialogs or visual transitions

4. **Direct State Management**
   - Simple completion toggling
   - Significance marking (starring)
   - Irrelevance marking (strikethrough)
   - Inline editing without modals

5. **Offline-First Architecture**
   - Local-first data storage
   - Event-sourced synchronization
   - Automatic cloud backup
   - Cross-device sync support

## Design Philosophy

1. **Ink-Like Permanence**
   - No reordering of items
   - No 'undo' functionality
   - Brief, concise entries
   - Chronological order preservation

2. **Physical Journal Metaphor**
   - Manual page transitions
   - Migration as mindful rewriting
   - One item, one location
   - No recurring tasks or automation

3. **Minimalist Interface**
   - Clean, notebook-inspired design
   - Essential features only
   - No complex configurations
   - Focus on content over chrome

## Technical Foundation
- React Native with Expo
- TypeScript for type safety
- NativeWind for styling
- React Native Reusables for component library
- TinyBase for local storage
- Supabase for backend
- Offline-first architecture
- Event-sourced data model

## Success Metrics
1. Speed of task entry
2. Clarity of organization
3. Ease of migration
4. Offline reliability
5. User satisfaction with minimalist approach

This brief serves as the foundation for all development decisions and feature implementations in Driftful, ensuring we maintain focus on our core mission of providing a simple, effective digital journaling experience.
