---
description: Describes the app flow of the document with user interface (UI) and user experience (UX) details as well as implementation details
globs: 
---
## Overview

**Driftful** is a mobile-first web application designed to help users efficiently track tasks, notes, and events. Targeted primarily at minimalist scatterbrains and Bullet Journal enthusiasts, it blends the simplicity and immediacy of a pen-and-paper journal with the organizational power of digital tools. Driftful prioritizes rapid entry, minimal overhead, and seamless migration of tasks to accommodate personal workflows and timelines.

## Objectives

Driftful aims to solve the following problems for its target users:

*   **Overwhelming Features in Traditional Apps**: By offering a pared-down, distraction-free interface, Driftful avoids the complexity of heavier task managers like Trello or Notion.
*   **Rediscovery of Items**: Driftful provides a comprehensive history and page-based organization, enabling users to track where tasks originated, even as they migrate over time.
*   **Avoidance of Lost Tasks**: With explicit assignment to days or collections and auto-migrating tasks, the app keeps user information organized and accessible, addressing the forgetfulness common to scatterbrained individuals.
*   **Hybrid Bullet Journal Utility**: Driftful incorporates essential Bullet Journal features into a digital format, thereby bridging the gap between traditional and digital journaling.

## Target Audience

*   Individuals who enjoy traditional Bullet Journaling but need a rapid digital alternative.
*   Users who find larger, feature-rich task management applications overwhelming.
*   Those seeking minimal complexity with effective organizational tools.

## Core Features

1.  **Entity Creation**: Fast entry and creation of tasks, events, and notes, letting users specify the relevant timeframe (day, week, month, year) or a collection.
    - Different entry points for desktop and mobile:
      - Desktop: 
        - A floating "+" button in the bottom-right corner opens a creation modal
        - Long pressing the button shows items from parent timeframes that can be migrated down
      - Mobile: 
        - An input field is always present at the bottom of the screen
        - When unfocused, shows a "magic" icon that reveals migrateable items from parent timeframes
        - Tapping the input itself starts immediate item creation
    - Adding items to week, month, year, or collection views is a one-step process requiring only text entry
    - Adding items to the current page is a one-step process when:
      - The page starts at the current day
      - The page contains only one day
    - Adding items to a multi-day page requires two steps:
      - First selecting a day
      - Then entering the text
2.  **Simplified Task Assignment**: Assign tasks and notes to specific dates or classifications for structured management.
3.  **Event Scheduling**: Possibly show them in broader time views (week, month, year) through checkboxes.
4.  **Intuitive Views**: Navigation and browsing through views:
    - Page View: Groups entities by date range, with one "current" page and multiple past pages (see documentation on Data Models for complete definitions and rules)
    - Week View: Weekly aggregation of entities
    - Month View: Monthly aggregation of entities
    - Year View: Yearly aggregation of entities
    - Collection View: Non-temporal organization of entities
5.  **Automated Migration**: 
    - **Page Creation Migration**: When a new page is created, incomplete tasks are automatically migrated to broader timeframes based on their age. See documentation on Timeframe Transitions for complete migration rules and thresholds.
    - **Time Boundary Migration**: When time boundaries are crossed (e.g., end of week/month/year), tasks automatically move to broader timeframes based on defined rules.
    - **Migration Rules**:
      - Only incomplete tasks are migrated
      - Completed tasks remain in their original location
      - All migrations (automatic and manual) create breadcrumb trails
      - No confirmation dialogs or visual transitions during automatic migrations
      - Users can follow breadcrumbs to track migration history
6.  **User Migration**: Manual migrations follow a "no confirmation, no undo" policy. When a user manually migrates an item, the action simply creates a breadcrumb. Users can follow breadcrumbs to view migration history and move items if needed. See documentation on Timeframe Transitions for complete details on manual migration triggers and behavior.
7.  **Marking & Signifiers**: Users can easily mark tasks as complete, starred for significance, or irrelevant with strikethroughs.
8.  **Efficient Navigation**: Use pickers and breadcrumbs to navigate through different views and understand item histories easily.
9.  **Past Items and Retroactive Additions**: See documentation on Data Models for complete rules on past page behavior and retroactive additions.

## Task State Transitions

Tasks in Driftful can exist in different states (complete/incomplete, relevant/irrelevant) that affect how they behave in the app. See documentation on Edit Item Flow for complete details on state transitions, UI interactions, and implementation specifics.

1. **Current and Future Tasks**
   - Users can freely toggle between completed and incomplete states
   - Users can mark tasks as irrelevant to soft-delete them from view
   - All state changes are immediate with no confirmation needed

2. **Tasks in Past Days**
   - Tasks in past pages require copying to the current page before modification
   - Original tasks remain unchanged in past pages while copies can be freely modified
   - Each copy starts fresh with its own breadcrumb trail

3. **Core State Rules**
   - Tasks can be completed, marked irrelevant, or starred for significance
   - State changes follow specific ordering rules (e.g., completed tasks must be marked incomplete before being marked irrelevant)
   - See documentation on Edit Item Flow for the complete set of state transition rules and UI implementations

## Task Interactions

The app provides simple, immediate interactions for managing tasks. All interactions follow the app's minimalist design philosophy of immediate feedback without unnecessary confirmation steps. See documentation on Edit Item Flow for complete details on clickable expansions, sub-row layouts, and specific UI behaviors.

1. **Basic Actions**
   - Complete/incomplete toggling
   - Significance marking (starring)
   - Irrelevant marking (soft-delete)

2. **View Consistency**
   - Core interactions remain consistent across all views (Page, Week, Month, Year, Collections)
   - Past items may require copying before modification

## Design and Interaction Goals

*   **Clean, Minimalist Interface**: Emphasize readability and a calm visual experience inspired by traditional notebooks.
*   **Soft Color Palette**: Incorporate gentle tones to enhance a focused and distraction-free environment.
*   **Straightforward User Interactions**: Facilitate essential actions like adding items, toggling significance markers, and navigating the app with minimal effort.

## Tech Stack

*   **Front-End**: Developed with React Native and Expo (using TypeScript) for cross-platform compatibility and performance optimization.
*   **Back-End & Storage**: Leverage Supabase for user authentication, data management, and storage solutions.

## Beta Release Strategy

Focus on receiving user feedback on usability, feature clarity, and overall satisfaction through an easily accessible beta option. Emphasize the iterative enhancement based on this feedback to refine the offering for the initial public launch.

## Branding and Visual Identity

The branding combines cleanliness and minimalism with a notebook-like aesthetic. Elements guide the user focus on their tasks rather than the application itself, ensuring Driftful becomes a useful background tool in their daily productivity habits.

Driftful represents an innovative endeavor to digitize the Bullet Journal philosophy, offering a streamlined and effective solution to task management for those seeking simplicity and ease in organization. The MVP focuses on essential features that clearly communicate its mission and address user needs promptly.

## Navigation System

### Bottom Navigation
The app provides a streamlined, tab-based navigation system at the bottom of the UI with five primary tabs. See documentation on Views for detailed implementation of each view type and their specific behaviors:
- **Pages**
- **Week**
- **Month**
- **Year**
- **Collections**

### Gesture Navigation
The app supports intuitive swipe gestures for navigation. See documentation on Views for detailed behavior of each view type. Common patterns include:
- Swiping left/right to navigate between time periods
- Swiping between collections
- Accessing previous pages or future items

### Pickers
The app uses pickers for both navigation and entity assignment. See documentation on Pickers for detailed implementation.

## User Authentication

Driftful supports both anonymous and authenticated usage:

### Anonymous Usage
- Users can immediately start using the app without signing in
- Data is stored locally on the device
- Anonymous users have access to all core features
- Client ID of 0 is used for anonymous users

### Authentication Options
- Email-based authentication via Supabase
- Social authentication providers through Supabase
- Seamless transition from anonymous to authenticated state
- Local data can be preserved when converting to authenticated account

### Benefits of Authentication
- Cross-device synchronization
- Data backup and recovery

## Common UI Elements

### Breadcrumbs
- **Migration Breadcrumbs**: Track when tasks have moved between time frames
- **Change Breadcrumbs**: In Page view only, log user actions and modifications

### Sync Status Indicator
A subtle indicator appears consistently across views to show synchronization state. The system is event-driven and shows different states based on specific triggers:

- **Normal Operation**: No indicator shown when synchronization is working normally
- **Offline Status**: Warning indicator appears and remains visible when any push operation is pending for more than 60 seconds
- **Upstream Sync**: Checkmark with "Synced" appears for 15 seconds after successfully completing sync after being offline
- **Downstream Sync**: Checkmark with "Updated" appears for 15 seconds when changes from another client are pulled
- **Active Sync**: Animated icon appears during active synchronization
- **Sync Issues**: Warning indicator appears for sync issues requiring attention

**Design Specifications:**
- Non-intrusive placement in corner of interface
- Consistent visibility across all views
- Touch-enabled for viewing detailed sync status
- Follows app's minimal aesthetic
- Meets accessibility standards with minimum 44x44px touch target
- Color-coded states:
  - Green checkmark for success states
  - Yellow warning for pending operations
  - Red indicator for sync failures
  - Neutral animation for active sync

**Behavior During Page Creation:**
- **During Migration:**
  - Animated icon appears showing active synchronization
  - Indicates tasks are being processed and migrated
  - Remains visible until all migrations complete
- **After Migration:**
  - Success state (green checkmark) appears for 15 seconds
  - Shows "Synced" text alongside checkmark
  - Automatically fades after 15 seconds
- **Error Handling:**
  - Warning indicator (yellow) appears if sync pending > 60s
  - Error indicator (red) appears for sync failures
  - Touch-enabled for viewing detailed sync status
