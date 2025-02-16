# System Patterns

## Core Architecture Patterns

### 1. Event-Sourced Data Model
- **Event Log as Source of Truth**
  - All changes captured as events
  - Immutable append-only log
  - Events contain action, target, and value
  - Previous values tracked for history

- **Event Types**
  - CREATE: Initial item creation
  - EDIT: Content modifications
  - COMPLETE/INCOMPLETE: Task state changes
  - MIGRATE: Timeframe transitions
  - STAR: Significance marking
  - IRRELEVANT: Soft deletion

- **Event Replay**
  - Strict chronological ordering
  - Timestamp-based conflict resolution
  - Local client events win ties
  - Skip invalid events silently

### 2. Offline-First Design
- **Local Storage (TinyBase)**
  - Complete local data copy
  - Immediate write access
  - Optimistic updates
  - Platform-specific persisters:
    - ExpoSQLite for mobile
    - IndexedDB for web

- **Sync Architecture**
  - Event-based synchronization
  - Automatic conflict resolution
  - Background sync process
  - No manual sync triggers

- **Client ID Management**
  - Anonymous mode (client_id: 0)
  - Unique IDs per device
  - Migration on authentication
  - No client ID reuse

### 3. Data Models

#### Entities
- **Core Types**
  - Tasks: Completable items
  - Notes: Reference information
  - Events: Time-bound occurrences
  - Collections: Non-temporal groups

- **Entity Structure**
  - Unique composite key (client_id + entity_id)
  - Type classification
  - Content field
  - State flags (completed, starred, irrelevant)
  - Timeframe assignments
  - Collection references

#### Pages
- **Page Model**
  - Date range containers
  - One current page
  - Multiple past pages
  - User-controlled creation

- **Page Rules**
  - Manual creation only
  - No automatic transitions
  - No overlapping ranges
  - Clear boundary rules

### 4. Migration Patterns

#### Automatic Migrations
- **Page Creation**
  - Age-based transitions
  - No user confirmation
  - Breadcrumb creation
  - State preservation

- **Time Boundaries**
  - Week → Month
  - Month → Year
  - Year → Next Year
  - Automatic rollovers

#### Manual Migrations
- **User-Driven**
  - Single-tap process
  - No confirmations
  - Clear breadcrumbs
  - State preservation

### 5. Component Architecture

#### Frame-Based Navigation
- **Core Components**
  - Frame: Data window definition
  - PagedView: Swipeable interface
  - IndexedView: Grid layout
  - FrameView: Navigation wrapper

- **Navigation Patterns**
  - Horizontal swipe gestures
  - Title bar navigation
  - Picker-based jumps
  - Consistent across views

#### View Organization
- **Primary Views**
  - Page View: Current and past pages
  - Week View: 7-day window
  - Month View: Monthly aggregation
  - Year View: Yearly overview
  - Collection View: Non-temporal lists

- **View Behavior**
  - Independent data loading
  - Consistent navigation
  - Optimized rendering
  - Clear state management

### 6. Sync Status Management

#### Visual Indicators
- **States**
  - Normal: No indicator
  - Offline: Warning after 60s
  - Upstream: "Synced" checkmark
  - Downstream: "Updated" checkmark
  - Active: Animated sync icon
  - Issues: Warning indicator

- **Behavior**
  - Non-intrusive placement
  - 15-second success display
  - Touch-enabled details
  - Clear color coding

### 7. Performance Patterns

#### Data Segmentation
- **Timeframe Scoping**
  - Natural data partitioning
  - View-specific loading
  - Efficient memory usage
  - Optimized queries

#### UI Optimization
- **Rendering Strategy**
  - Incremental loading
  - Resource cleanup
  - Memory management
  - Efficient indexing

## Implementation Guidelines

### 1. Data Integrity
- Never modify records directly
- Always use event system
- Maintain complete history
- Preserve breadcrumbs

### 2. User Experience
- No confirmation dialogs
- Immediate feedback
- Clear visual states
- Consistent patterns

### 3. Error Handling
- Silent error skipping
- Continued operation
- Clear status indication
- No user interruption

### 4. Future Extensibility
- Maintain event sourcing
- Preserve offline-first
- Keep simple interfaces
- Follow existing patterns

This system patterns documentation serves as a reference for maintaining consistency in implementation and decision-making across the Driftful application.
