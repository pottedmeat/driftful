---
description: Describes the design, appearance, and functionality of pickers
globs: 
---
# Pickers: Timeframe Assignments and Navigation

This document describes the design, appearance, and functionality of pickers used throughout Driftful. Pickers serve dual purposes: assigning a timeframe (or collection) to new or existing entities and providing quick navigation between timeframes or collections.

**Important Clarification**: Driftful uses the same picker component for both assigning a timeframe/collection to an entity and for navigating between timeframes or collections. The context (assign vs. navigate) determines how the user's selection is processed.

---

## 1. Pickers for Timeframe Assignments and Navigation

### Usage

- **For Assignment:**  
  - **Timeframes:** Pickers can be used to assign a day, week, month, or year to an entity.
  - **Collections:** They can also be used to assign a collection to tasks or notes.

- **For Navigation:**  
  - Pickers are employed to navigate between different timeframes or collections, allowing users to jump quickly to a specific Page, Day, Week, Month, Year, or Collection view.

### When and Where Pickers Appear

- **Embedded in Views:**  
  - In the Week, Month, and Year views, a picker appears at the bottom of the screen. The picker always shows the child timeframe. For example, the Month view will display a Week picker.
  
- **Triggered by Title Press:**  
  - In all primary views (Page, Week, Month, Year, and Collection), tapping on the view's title opens the picker. This gives users access to a detailed list of parent time frames or collections with navigational options.

---

## 2. Appearance and Functionality

### Visual Layout

- **Key-Value Grid:**  
  - The picker is structured as a simple grid with narrow key columns and a larger column for the main content.
  - **Key Columns:** These contain identifiers such as page numbers, day numbers, or month initials.
  - **Main Content Column:** Displays a horizontally scrolling list of inlined labels representing dates or events.

The picker components have fixed-width key columns while the text columns expand to fill the available space.

### Interaction

- **Navigating to Child Timeframes:**  
  - Clicking on any content in a column will take the user directly to the child timeframe corresponding to that date. The focus will automatically adjust to center on that specific date range.
  
- **Event Navigation:**  
  - Clicking on an individual event within the picker navigates to the child timeframe at that event's date, with the focus set on the event itself.

- **Back/Forward Navigation:**
  - Swiping is already being used for the horizontal scrolling of the picker content and so swiping would be an overloaded gesture.
  - Instead of swipe gestures, pickers have back and forward arrow buttons positioned on the left and right of their title area.
  - These arrows allow users to navigate to the previous or next time period within the current scope.

---

## 3. Grid Layouts by Timeframe

### Page Picker

- **Key Column:**  
  - Displays the page number.
- **Main Content:**  
  - Shows the start date of the page.
  - Lists events in chronological order that occur within the page.
  - Ends with the end date of the page.

### Week Picker

- **Key Columns:**  
  - One column for the day of the month.
  - A second narrow column for the day-of-week abbreviation (e.g., "S" for Sunday).
- **Main Content:**  
  - Lists events in chronological order.  
  - *Example Layout:*  
    `12 | S | Pick up groceries, Buy flowers`

### Month Picker

- **Key Column:**  
  - Displays the day of the month.
- **Main Content:**  
  - Shows events for that day in chronological order.  
  - *Example Layout:*  
    `5 | Learn to knit`

### Year Picker

- **Key Column:**  
  - Displays the month name abbreviated to its initial (e.g., "J" for January).
- **Main Content:**  
  - Lists events in chronological order within the month.  
  - *Example Layout:*  
    `J | Quit my New Year's Resolution, Eat cookie dough`

### Collection Picker

- **Layout:**  
  - Each item in the collection picker appears as a standard entity row with:
    - A star gutter (leftmost, read-only)
    - A collection icon gutter
    - The collection title
  - *Example Layout:*  
    `[⭐️] [📑] My Collection Title`

---

## 4. Long Timeframe Day Picker

The Long Timeframe Day Picker is a specialized three-column picker used for selecting dates across extended time periods. It's particularly useful when creating or editing items in multi-day pages or when precise date selection is needed.

### Layout

The picker uses three columns arranged horizontally:
1. **Years**: Shows valid years based on context
2. **Months**: Displays valid months for the selected year
3. **Days**: Shows valid days for the selected year/month

### Context-Aware Behavior

- Only shows dates relevant to the current view context
- Days outside the valid range are completely hidden (not shown as disabled)
- Default dates are automatically assigned based on the current view:
  - Past pages default to the last day in range
  - Current pages default to today
  - Future pages default to tomorrow

### Accessibility

- Uses proper `aria-modal` and `role="dialog"` attributes
- Supports keyboard navigation:
  - Arrow keys navigate between columns and options
  - Enter selects the current option
  - Escape closes the picker
- All interactive elements have clear hover and active states
- Selected date is visually distinct

---

## Summary

The picker component in Driftful is a versatile tool used both for assigning timeframes/collections and for navigating between them. Its clean, key-value grid layout and intuitive horizontal scrolling design allow users to:
- Quickly jump to specific dates or events.
- Efficiently assign or reassign timeframes.
- Seamlessly move through parent and child timeframes or collections via intuitive clicks and arrow-based navigation.

This design ensures that users maintain full control over their scheduling and task management experience, keeping the overall interface minimal yet highly functional through intuitive clicks and arrow-based navigation.
