---
description: Describes the user flow and interface details for editing existing items
globs:
---
# User Flow: Edit an Item

## 1. Overview of the Edit Workflow

Driftful uses a minimalist, inline expansion approach to give users quick access to editing and advanced actions for each item. Rather than navigating to a separate screen or modal, tapping on an item reveals a "sub-row" with icons for common edit actions. The sub-row appears as a clean rectangular container with the same visual styling as the Controls Row in the create item flow:

- **Visual Style**:
  - Simple rectangular container
  - Clean white background
  - Maintains consistent padding and spacing
  - Background color contrasts with the main item row

This consistent styling between create and edit flows helps users recognize interactive control areas while keeping the main interface tidy and reducing friction for quick edits.

## 2. Interaction Flow

1. **Tap (or Expand) Trigger**  
   - The user taps (or clicks) the item's main row.  
   - The tapped row subtly highlights, and a new sub-row expands *underneath* the main item row, pushing subsequent items down.  
   - The sub-row appears as a fully-rounded rectangle.

2. **Inline Action Icons** (See documentation on Flyout Pattern)  
   - Within this newly revealed sub-row, a row of action icons appears.  
   - Common actions include:  
     - **Edit**: Opens a single-line text input plus a "Save" checkmark.
       - On desktop, the text input is inline with the main item row, and an additional "Save" button appears. Enter key triggers save.
       - On mobile, the text input appears above the keyboard, and a "Save" button appears.
     - **Migrate**: Offers either a quick migrate (one tap) or an advanced picker with two-column selection (day/week/month/year/collection).  
     - **Duplicate**: Creates a copy of the item in a chosen timeframe or collection, using a similar picker approach.  
     - **Change Type**: Switch the item's type (Task ↔ Note ↔ Event).  
     - **Strikethrough**: Instantly toggles the irrelevant (strikethrough) state.  

3. **Collapse the Sub-Row**  
   - The sub-row automatically collapses in the following scenarios:
     - Immediately after any workflow completes (e.g., saving an edit, completing a migration, finishing a duplication)
     - When tapping the main row again
     - When tapping a different item
   - Users cannot perform multiple consecutive actions within the same expanded sub-row
   - Each new action requires re-expanding the sub-row
   - The collapse is animated with a smooth slide-up effect
   - This consistent behavior keeps the interface clean and signals workflow completion to users

## 3. Inline Actions

### 3.1 Edit Action
- **Activation**: Tap the edit icon
- **Interface**:
  - Single-line text input with existing content pre-filled
  - Save button/checkmark appears (replaces edit icon in editing mode)
  - Desktop: Inline text input with "Save" button, Enter key saves
  - Mobile: Text input appears above keyboard with "Save" button
  - A semi-transparent gray overlay appears beneath the editing interface
- **Behavior**:
  - Text field automatically focuses
  - Tapping the gray overlay or collapsing the sub-row:
    - On desktop: Discards unsaved changes and removes the input field
    - On mobile: Keeps partially typed text in the visible input field
  - In both cases, the controls row (with action icons) resets to its default state
  - Saving updates the item
- **Validation**:
  - Follows identical validation rules as item creation

### 3.2 Migrate Action
- **Activation**: Tap the migrate icon
- **Interface** (See documentation on Flyout Pattern):  
  - Primary flyout: Horizontal row of icons
    - Quick Migrate (>): Instantly migrates to parent scope per timeframe transition rules
    - Day icon
    - Week icon
    - Month icon
    - Year icon
    - Collection icon
    - Confirmation indicator (initially deselected)
  - Secondary flyout: Appears when selecting any non-quick migrate option
    - Shows relevant picker interface for the selected timeframe/collection
    - Selecting an item closes the secondary flyout
    - Any previously selected timeframe/collection is removed
    - Icon for the selected timeframe/collection is toggled on
    - User must tap confirmation indicator to complete migration
- **Behavior**:
  - Quick Migrate: One-tap completion following parent scope rules
  - Other options: Two-step process requiring confirmation
  - Logs a breadcrumb after successful migration

### 3.3 Duplicate Action
- **Activation**: Tap the duplicate icon
- **Interface**:
  - Identical to the migrate action
- **Behavior**:
  - Creates exact copy in selected destination
  - Original item remains unchanged in its current location
  - New item appears in the selected destination with a CREATE breadcrumb
  - Original item maintains its appearance and location with no visual changes
  - Visual distinction is clear: original item stays put, new item appears in chosen location with breadcrumb

### 3.4 Change Type Action
- **Activation**: Tap the type icon
- **Interface**:
  - Flyout: Horizontal row of icons with the active type icon toggled on
    - Task icon
    - Note icon
    - Event icon
    - Confirmation indicator (initially deselected)
  - Secondary flyout: Appears *immediately* when selecting an event type and the current item is not assigned to a day
    - Uses a Day Picker if its current timeframe is Week or Month
    - Uses a Long Timeframe Day Picker if its current timeframe is Year
    - Making a selection closes the secondary flyout
  - User must tap confirmation indicator to complete type change
- **Behavior**:
  - When switching to Event type, day selection if *required* is prompted immediately before the type change can be completed
  - Maintains item content while changing type

### 3.5 Strikethrough Action
- **Activation**: Tap the strikethrough icon
- **Interface**:
  - Simple toggle button with visual strikethrough effect
- **Behavior**:
  - Instantly toggles is_irrelevant state
  - Updates visual appearance in real-time
  - No confirmation needed

## 4. Keeping It Minimal & Safe

### 4.1 Icon Clarity
- **Clear Labels**: Each icon should be distinct (e.g., arrow for "migrate," star or copy icon for "duplicate").  
- **Tooltips on Desktop**: Hovering over any icon briefly shows a text label (e.g., "Migrate" or "Duplicate").  
- **Minimal Text on Mobile**: If space allows, a small label can appear under each icon. Otherwise, rely on consistent iconography.

### 4.2 Animation
- **Scroll-Into-View**: Before expanding the sub-row, gently scroll the selected item to a visible area so the user sees the expansion.  
- **Slide-Down Effect**: A short (150–300ms) animation for the sub-row's appearance helps clarify that it's an expansion panel rather than a sudden layout shift.  
- **Collapse Animation**: When the sub-row closes, it smoothly slides up in a similarly quick animation.

## 5. Desktop vs. Mobile Behavior

### 5.1 Desktop
- **Hover-Friendly Tooltips**: Icons display short text labels on hover, aiding discoverability.  
- **Click to Expand**: Clicking the item row toggles the sub-row.  
- **Keyboard Shortcuts** (Optional Future Enhancement): For power users, consider supporting keyboard shortcuts (e.g., `E` to edit, `M` to migrate).

### 5.2 Mobile
- **Tap to Expand**: Tapping the main item row toggles the sub-row.  
- **Subtle Haptic Feedback** (iOS/Android): Tapping an action icon gives a slight vibration or tap feedback to confirm the press.  
- **One-At-A-Time**: Only one item's sub-row can be expanded at once; tapping a second item collapses the first.

## 6. Disabled Actions

- The **Duplicate** action remains enabled at all times for all item types and is never disabled.

### 6.1 Tasks
- These apply regardless of whether the task is in a past, present, or future timeframe
- **Tasks Marked Completed**:
  - The **Edit** action is disabled
  - The **Migrate** action is disabled
  - The **Change Type** action is disabled
  - The **Strikethrough** action is disabled
- **Tasks Marked Irrelevant**:
  - The **Edit** action is disabled
  - The **Migrate** action is disabled
  - The **Change Type** action is disabled
  - The **Strikethrough** action is enabled to allow the user to unmark the task as irrelevant
  - Once a task is unmarked as irrelevant using the strikethrough action, it once again has behavior as a normal task

### 6.2 Notes
- The **Strikethrough** action is disabled for all notes as this concept only applies to tasks

### 6.3 Events
- The **Strikethrough** action is disabled for all events as this concept only applies to tasks

### 6.4 Past Items
- **Past-Dated Items**:
  - Tasks in the past will either be irrelevant or completed and so most rules already disable most actions in the past.
  - Events in the past should be considered written in stone and so many actions will similarly be disabled.
  - Notes are ephemeral and so even if they are in the past they should be given as much functionality as possible.
  - For items in past-dated pages:
    - The **Edit** action is disabled for everything but notes
    - The **Migrate** action is disabled for everything but notes
    - The **Change Type** action is disabled regardless of the item type
    - The **Strikethrough** action is disabled regardless of the item type

### 6.5 Collections
- Collections can never become past items as they are not time-bound
- **Collections**:
  - The **Edit** action is always enabled for collections as it is how the user renames the collection
  - The **Migrate** action is disabled as collections cannot be migrated
  - The **Change Type** action is disabled as collections cannot change type
  - The **Strikethrough** action is always enabled for collections as it allows them to be deleted
  - The **Duplicate** action is disabled as collections cannot be duplicated

## 7. Additional Notes

1. **Prevent Overlap**  
   - Ensure only one item can be expanded at once to avoid confusing, stacked expansions.  
2. **Focus Management**  
   - When editing inline text, the cursor automatically focuses the text field.  
   - On mobile, the keyboard should appear immediately.  
