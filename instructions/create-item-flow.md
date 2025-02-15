---
description: Describes the user flow and interface details for creating new items
globs: 
---
# User Flow: Create an Item

## 1. Overview of the Creation Interface

When creating a new item, there are three conceptual rows (See documentation on Flyout Pattern):

1. **Input Row** (Primary)
2. **Controls Row** (Secondary, hidden for create collection)
3. **Fly-Out Row** (Tertiary, hidden by default)

### 1.1 Input Row (Primary)

- **Single-Line Text Input**  
  A single-line field for entering the item's content.  
  - Always remains a single horizontal line (no multiline expansion).  
  - Users can horizontally scroll if the text exceeds the visible width.  
  - Minimum **3 characters** required before the item can be created.

- **Create Button**  
  Often shown with a checkmark or plus sign.  
  - **Disabled** if fewer than 3 characters are present.  
  - Enabled as soon as 3+ characters are typed.
  - On **desktop**, pressing **Enter** also triggers creation if valid (instead of creating a newline).

- **Behavior**  
  - If invalid (fewer than 3 characters), the button remains grayed out and non-interactive.  
  - Once valid, pressing **Enter** (desktop) or tapping **Create** (mobile) immediately submits the item.

### 1.2 Controls Row (Secondary)

The Controls Row appears as a clean rectangular container that sits either above or below the input row, maintaining a consistent visual style across both creation and editing interfaces. The simple white background helps distinguish it from the main content while maintaining visual hierarchy.

- **Visual Style**:
  - Simple rectangular container
  - Clean white background
  - Maintains consistent padding and spacing
  - Background color contrasts with the input row

- **Positioning**:
  - Desktop: Floats below the input row in the modal
  - Mobile: Floats above the input row when keyboard is shown

- **Item Type Icons**:  
  Three icons labeled **Task**, **Note**, **Event**. The default is **Task**. Switching type mid-creation retains typed text and any chosen date or timeframe toggles.

- **Expander Controls** (See documentation on Flyout Pattern):  
  Special interactive buttons that reveal additional options in the Fly-Out Row.
  - When tapped, they immediately reveal their associated fly-out content below.
  - Only one Expander Control can be active at a time—opening a new one closes any previously open fly-out.
  - The active state is visually indicated through color and subtle visual changes.

- **Day Picker and Timeframe Picker**:  
  On multi-day pages, a **Day Picker** Expander Control appears. If the user taps it, they can select a valid day within the page's range.  
  - If the user never opens this picker, Driftful automatically assigns the **default day** (today, the last day, or first upcoming day as appropriate) without further confirmation.  
  - Days outside the page's start/end range are **completely hidden** and never shown (not even as a disabled option).

- **Timeframe Toggles (Events only)**:  
  If **Event** is selected, an Expander Control appears, opening toggles for broader visibility (Week, Month, Year). Enabling or disabling these simply determines where the event is also shown, in addition to its assigned day.

- **Interactions That Close Fly-Out**  
  Opening any fly-out (Day Picker or toggles) displays the Tertiary Row. However, **any other interaction** with the Input or Controls Row—such as switching item types, tapping the Create button, or tapping outside—automatically closes the fly-out.

### 1.3 Fly-Out Row (Tertiary)

- **Hidden by Default**  
  This row only appears when the user taps a control (like the Day Picker icon) that opens it.  
- **Remains Open Until Another Interaction**  
  The moment the user switches item types or interacts elsewhere (including tapping the input field again), the fly-out closes.
- **Selection Behavior**  
  - Selecting an option within a fly-out does not automatically close it
  - This allows users to make multiple adjustments if needed
  - The user must explicitly close the fly-out by tapping outside or re-activating the icon

---

## 2. Collection Creation Flow

Collections follow a simplified version of the standard item creation flow, with some key differences:

1. **Accessing Collection Creation**
   - Users must first navigate to the Collection View
   - This can be done by:
     - Opening the Collection Picker (default view when accessing collections)
     - When viewing a specific collection, tapping its title to return to Collection View
     - When viewing a specific collection, tapping the Collection View tab in the bottom navigation to return to the default Collection Picker View

2. **Simplified Interface**
   - Uses only the Input Row (Primary)
   - Controls Row is hidden as collections don't have types or date options
   - No Fly-Out Row is needed

3. **Creation Process**
   - Same minimum 3-character requirement
   - Same Create button behavior
   - Same keyboard shortcuts (Enter to create on desktop)

The simplified flow ensures users can quickly create collections without unnecessary options, while maintaining consistency with the broader item creation pattern.

---

## 3. Desktop vs. Mobile Behavior

Although the layout is conceptually the same, there are slight differences in how the interface is presented on larger vs. smaller screens.

### 2.1 Desktop

- **Floating Action Button**
  A circular "+" button in the bottom-right corner of the screen:
  - Always visible and accessible
  - Follows material design patterns
  - Quick click opens the creation modal
  - Long press reveals a modal with items from higher timeframes that can be migrated down (not applicable in Collection Views)
  - When in a specific collection, opens the standard item creation modal

- **Migration Modal**
  Long pressing the "+" button opens a special migration picker:
  - Shows all items from parent timeframes that can be migrated to current view
  - Items are grouped by their source timeframe
  - Single click on an item instantly migrates it to the current timeframe
  - Modal closes automatically after migration

- **Modal Window**  
  The user clicks the floating "Add" button to open a modal.  
  - **Top Section**: Single-line text input and Create button on the right.  
  - **Below**: The Controls Row (item types, day picker/toggles if applicable).  
  - Fly-outs appear directly below (or near) their respective icons in the modal.

- **Closing After Creation**  
  Clicking **Create** or pressing **Enter** finalizes the item and **immediately closes** the modal. The user returns to the main view.

### 2.2 Mobile

- **Ever-Present Input**
  The input field is always visible at the bottom of the screen:
  - A single-line text input with placeholder text (e.g., "Add a task..." or "Add a collection..." depending on context)
  - When unfocused, shows a "magic" icon on the rightmost side (except in collection picker view)
    - Tapping this icon slides up a picker from the bottom
    - Picker shows all items from parent timeframes that can be migrated down
    - Items are grouped by their source timeframe
    - Single tap on an item instantly migrates it and dismisses the picker
  - Tapping the input field itself:
    - Focuses the input
    - Opens the keyboard
    - Reveals the Controls Row (except in collection picker view)
  - The input remains accessible at all times, ensuring rapid item creation

- **Pinned at Bottom**  
  The Input and Controls rows appear pinned at the bottom of the screen, just above the keyboard.  
- **Submission**  
  Tapping **Create** finalizes the item.  
  - On mobile, the interface **also closes** immediately after creation, returning the user to the main view.  
  - The keyboard is dismissed at the same time, ensuring each creation cycle is self-contained.

---

## 4. Detailed Interaction Flow

### 3.1 Entering Text

1. **User Types** content in the single-line field (minimum 3 characters).  
2. The **Create** button remains disabled until the 3-character threshold is met.

### 3.2 Selecting Item Type

- The user can tap **Task**, **Note**, or **Event**.  
- Switching item types does **not** erase the typed text or any day/toggle selections made so far.

### 3.3 Optional Fly-Out Interactions

- If on a **multi-day page**:  
  - Tapping the **Day Picker** opens a list (or small calendar) of valid days (completely hiding days outside the range).  
  - If the user skips opening it, the default day is auto-assigned based on context:
    - Past pages: Last day in range
    - Current pages: Today
    - Future pages: Tomorrow
- If creating an **Event**:  
  - Tapping the timeframe icon opens toggles (Week, Month, Year). Each toggle can be freely enabled or disabled.  
- Once the user interacts with anything else (e.g., typed input, toggling item type, or tapping Create), the fly-out closes automatically.

### 3.4 Creating the Item

- **Create Action (Desktop)**:  
  - Clicking **Create** or pressing **Enter** finalizes creation. The modal closes immediately.  
- **Create Action (Mobile)**:  
  - Tapping **Create** finalizes creation. The bottom input row closes.  
  - The keyboard dismisses with no option to remain open continuously for repeated entries.

### 3.5 Scrolling to the New Item

Immediately after creation, Driftful **always** scrolls so the newly added item is visible. This is guaranteed on both desktop and mobile, ensuring the user sees their new item in the list without manual scrolling.

---

## 5. Additional Notes

1. **Validation:**  
   - Fewer than 3 characters → the **Create** button is disabled, no item is created.  
   - The user cannot override this minimum.

2. **Default Date Handling in Multi-Day Pages:**  
   - **Past Page:** Defaults to the last day in the page's range
   - **Current Page:** Defaults to today
   - **Future Page:** Defaults to tomorrow
   - If the user never opens the date picker, these defaults apply automatically with no extra step
   - These defaults are intelligently pre-selected based on page context
   - Users can modify the date before or after entering text
   - Date selection is optional - the pre-selected default is used if not changed
   - This approach allows users to follow their natural workflow without enforced sequences

3. **Result of Creation:**  
   - Desktop: Modal closes → user returns to the main list with the new item shown at the top or bottom (depending on the sorted order).  
   - Mobile: Input row disappears → user sees the new item in the main list (keyboard dismissed).

4. **Consistent Fly-Out Closure:**  
   - Any change to item type, re-tapping a toggle icon, or interacting with the primary input row forcibly closes the fly-out.  
   - There is no scenario where the fly-out stays open across such interactions.

5. **No Multi-Item Desktop Workflow:**  
   - On desktop, each click of "Add" triggers a new modal session for exactly one item.  
   - After creation, the modal closes. To create another item, the user repeats the process.

6. **No Days Outside Range:**  
   - On multi-day pages, invalid days are **not** disabled—they simply do **not** appear in the picker at all.

This unified approach ensures clarity and consistency: both desktop and mobile experiences end in a clean, closed state after a successful creation, the new item is always scrolled into view, and any optional day/timeframe pickers close automatically when the user interacts with other controls.

## 6. Accessibility & Design Notes

### 6.1 Accessibility
- **ARIA Attributes**:
  - Day picker uses proper `aria-modal` and `role="dialog"` attributes
  - All interactive elements have appropriate ARIA labels
- **Keyboard Navigation**:
  - Tab cycles through Input → Create → Item Type Icons → Day Icon
  - Space/Enter on day icon opens the picker
  - Arrow keys navigate within day picker
  - Focus starts in the Input Field by default
  - Enter in the input field triggers Create if text is valid
- **Visual Design**:
  - All interactive elements have clear hover and active states
  - Selected date is visually distinct
  - Icons are consistent in size and style
  - Adequate touch targets for mobile use
  - Disabled states (e.g., Create button when text is too short) are clearly grayed out

### 6.2 Desktop Floating Action Button

The desktop interface features a prominent floating action button (FAB) for item creation:

- **Visual Design**:
  - Large circular button with "+" icon
  - Fixed position in bottom-right corner of the screen
  - Follows material design patterns for floating action buttons
  - Uses subtle elevation shadow to indicate interactive state
  - Maintains consistent visibility across all views
  - Minimum size of 56x56px for easy targeting
  - Hover state shows slight elevation increase and brightness adjustment

- **Interaction States**:
  - **Quick Click**: Opens the creation modal immediately
  - **Long Press**: Opens a specialized migration picker showing items from parent timeframes
    - Items are grouped by their source timeframe
    - Single click on an item instantly migrates it to current timeframe
    - Modal closes automatically after migration
    - Not available in Collection Views
  - **Hover**: Shows subtle elevation increase
  - **Active/Pressed**: Shows pressed state with reduced elevation

- **Positioning**:
  - Fixed distance from bottom (24px) and right edge (24px)
  - Maintains position during scroll
  - Z-index ensures visibility above other content
  - Adjusts position when keyboard appears to remain accessible

- **Accessibility**:
  - Clear ARIA label for screen readers
  - Keyboard accessible (Tab to focus, Enter to activate)
  - Touch target extends slightly beyond visual bounds
  - High contrast ratio against background
  - Tooltip on hover shows "Add Item" (or "Add to [Current View]")

This floating action button provides a consistent and always-accessible entry point for item creation across the desktop interface, while the long-press functionality offers quick access to migration capabilities.

### 6.3 Mobile Persistent Input Field

The mobile interface features a permanent input field at the bottom of the screen:

- **Visual Design**:
  - Clean white background with minimal padding
  - Simple rectangular input field
  - Matching white container for the magic icon
  - No borders on input field or icon container
  - Clean, integrated appearance that sits above content
  - Maintains consistent visibility across all views
  - Adjusts position when keyboard appears

- **Input Field**:
  - Single-line text input
  - Context-aware placeholder text:
    - "Add a task..." in timeframe views
    - "Add a collection..." in collection picker view
  - Tapping the input:
    - Focuses the field
    - Opens the keyboard
    - Reveals the Controls Row (except in collection picker view)
  - Always accessible for rapid item creation

- **Magic Icon**:
  - Appears on rightmost side when input is unfocused
  - Uses "Adopt Ancestor" icon (open box with downward arrow)
  - Not shown in collection picker view
  - Tapping behavior:
    - Slides up a picker from the bottom
    - Shows items from parent timeframes that can be migrated down
    - Groups items by their source timeframe
    - Single tap on an item instantly migrates it
    - Picker dismisses automatically after migration
  - Visual states:
    - Default: Subtle gray color
    - Pressed: Darker gray with reduced opacity
    - Hidden: When input is focused

- **Accessibility**:
  - Clear ARIA labels for both input and magic icon
  - Touch targets extend beyond visual bounds
  - High contrast against background
  - Haptic feedback on magic icon press
  - Screen reader support for all states

This persistent input approach provides an always-available entry point for item creation on mobile, while the magic icon offers quick access to migration capabilities without cluttering the interface.
