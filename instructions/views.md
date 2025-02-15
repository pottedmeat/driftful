---
description: Explains views and how users navigate between different views
globs: 
---
# View Navigation

This document explains the specific behavior and content organization of different views in Driftful. For general navigation patterns and UI elements, see documentation on App Flow.

## View-Specific Behaviors

### Default View Behavior
- **Time-Based Views:**
  - Page View: Opens and resets to the current page
  - Week View: Opens and resets to the current week
  - Month View: Opens and resets to the current month
  - Year View: Opens and resets to the current year

- **Collection View:**
  - Opens and resets directly to the collection picker

### Page View
- **Content Organization:**
  - Groups entities by date range
  - One current page and multiple past pages
  - See documentation on Data Models for complete definitions and rules

### Week/Month/Year Views
- **Content Display:**  
  - Only shows entities that match the specific week, month, or year
  - Tasks may appear in these views through automatic migration or manual user action (see documentation on App Flow for migration rules)
  - Below the list of entities, there is a dedicated picker (see documentation on Pickers) that presents events within that time frame
  - This picker allows users to drill down into more granular time frames for a detailed view

### Collection Views
- **Definition:**  
  Collection views display tasks and notes that are assigned to a specific collection. Collections are strictly top-level organizational units, independent from time-based scopes (Page, Week, Month, Year).

- **Content Display:**  
  - The title of the view shows the collection's title
  - Items in collections do not automatically appear in any time-based views
  - Items can only appear in time-based views through explicit manual migration

---

## Bottom Navigation Tabs

At the bottom of the screen, there are five primary tabs:

- **Pages**
- **Week**
- **Month**
- **Year**
- **Collections**

Each tab represents a distinct view that organizes tasks, events, and notes in different ways. When a tab is already selected, pressing it again will return you to the default view for that tab.

---

## Common Elements Across All Views

- **Migration Breadcrumbs:**  
  Every view displays migration breadcrumbs to track when tasks have moved between time frames. These breadcrumbs provide visual indicators of task movement, whether from automatic migrations or manual user actions. See documentation on App Flow for complete migration rules.

- **Change Breadcrumbs in Page View:**  
  In addition to migration breadcrumbs, the Page view also shows change breadcrumbs, which log user actions and modifications that occurred on that day within the page.

- **Universal Navigation Pattern:**
  All views (Pages, Week, Month, Year, and Collections) share the same navigation pattern:
  - Swipe left/right to move between consecutive items (pages, weeks, months, years, or collections)
  - Back/forward arrows appear on either side of the title for quick navigation
  - Tapping the title opens a picker for quick jumps between any available option
  This consistent pattern ensures users can rely on the same familiar gestures and controls regardless of which view they're in.

## Title Bar with Picker Access
The title displayed at the top of each view shows either a date range (for time-based views) or a collection title. Tapping the title opens a picker. This picker, detailed in the Pickers documentation, displays the parent time frame (or a list of collections) with prev/next buttons. Users can quickly move between broader time frames or browse through collections using this picker.

### Page Titles
For the first page, where the start day is 1 and the last page, where the start day is null, use the date of the earliest/latest entity in the view as the start/end of the ranges shown in the title bar.

When the day is yesterday, today, or tomorrow, use "Yesterday", "Today", or "Tomorrow" respectively instead of the date. When showing the date range, avoid duplication of context. For example:

- "Today" because a new page was just created and so is start (and calculated end) day of the page
- "Feb 6 - Yesterday" because the year is in the current year and the end day is yesterday
- "Oct 19, 2020 – Yesterday" because oldest entity on the first page is Oct 19, 2020 which is a previous year and the end day is yesterday
- "Tomorrow - Feb 11" because the year is in the current year, the start day is tomorrow, and the latest entity on the last page is on the 11th
- "Feb 9 – 11" because the year is the current year and both days are in the same month
- "Jan 30 – Feb 1" because the year is the current year and both days are in different months
- "Mar 3 – 6, 2024" because the year is a previous year and both days are in the same month
- "Dec 29, 2024 – Jan 2" because the start year is a previous year, the end year is the current year, and both days are in different months and years
- "Dec 31, 2023 – Jan 15, 2024" because the start year is a previous year, the end year is a previous year, and both days are in different months and years

---

## Detailed View Descriptions

### Page View

- **Definition:**  
  Pages are defined by a **start day** and an **end day**. The current page is unique in that it only has a start day and no end day.
  
- **Content Display:**  
  - All tasks, events, and notes are organized under date subheaders
  - Each date subheader shows the specific day's date in a clear, prominent format
  - Displays events, tasks, and notes that occur between the start day and end day of the page
  - For the current page, only entities from the start day up to today's day are shown
  - Pages are not created automatically. A new page is created only when the user explicitly performs that action
  
- **Navigation:**  
  - **Swiping Left:** Reveals previous pages
  - **Swiping Right:** Reveals a single "days not yet reached" page that represents all upcoming days beyond the current page

### Week/Month/Year Views

- **Definition:**  
  These views aggregate events, tasks, and notes by their respective time frames (week, month, or year).

- **Content Display:**  
  - Only shows entities that match the specific week, month, or year
  - Tasks may appear in these views through automatic migration or manual user action (see documentation on App Flow for migration rules)
  - Below the list of entities, there is a dedicated picker (see documentation on Pickers) that presents events within that time frame
  - This picker allows users to drill down into more granular time frames for a detailed view

- **Navigation:**  
  - Users can swipe left/right to navigate back and forth between consecutive weeks, months, or years

### Collection Views

- **Definition:**  
  Collection views display tasks and notes that are assigned to a specific collection. Collections are strictly top-level organizational units, independent from time-based scopes (Page, Week, Month, Year).

- **Content Display:**  
  - The title of the view shows the collection's title
  - Items in collections do not automatically appear in any time-based views
  - Items can only appear in time-based views through explicit manual migration
  
- **Navigation:**  
  - Users can swipe left/right to move to the previous or next collection, making it easy to browse through all available collections

---

## Summary

Driftful's navigation system is designed to be intuitive and efficient:

- **Bottom Tabs:** Quickly switch between Pages, Week, Month, Year, and Collections.
- **Universal Breadcrumbs:** Migration breadcrumbs are visible in all views, with additional change breadcrumbs in the Page view.
- **Dynamic Titles:** Titles (displaying date ranges, "future," or collection titles) double as access points to a detailed picker for fast navigation.
- **Swipe Gestures:**  
  - **Page View:** Swipe left/right to navigate between pages.
  - **Week/Month/Year Views:** Swipe left/right to move between consecutive time frames.
  - **Collection Views:** Swipe left/right to cycle through collections.

This cohesive navigation approach ensures that users can quickly access the time-based or collection-specific information they need, maintaining a fluid and organized experience throughout the app.

## UI Performance Optimization

The timeframe-scoped view architecture in Driftful is specifically designed to optimize UI performance:

- **Natural Data Segmentation:**
  - Each view (Page, Week, Month, Year) only loads and displays entities relevant to its specific timeframe
  - This natural segmentation prevents the UI from ever having to render large lists of historical tasks
  - Collections are similarly scoped, showing only items explicitly assigned to them

- **Efficient Data Loading:**
  - Views load data incrementally as users navigate between timeframes
  - When switching views, only the data for the selected timeframe is loaded
  - Historical data remains in the database but is not loaded into memory until explicitly requested

- **Rendering Optimization:**
  - The UI never needs to handle more than a timeframe's worth of items at once
  - Page view shows at most a few days' worth of items
  - Week view is limited to 7 days of items
  - Month view typically contains 28-31 days of items
  - Year view aggregates items but maintains performance through timeframe-based filtering

- **Memory Management:**
  - Views clean up and release resources when users navigate away
  - Data outside the current view's timeframe is automatically unloaded
  - This prevents memory bloat even with years of historical data

- **Pagination and Lazy Loading:**
  - Long lists within timeframes use efficient pagination
  - Additional items are loaded only when users scroll or explicitly request them
  - This ensures smooth scrolling and responsive UI even with many items

This performance-oriented architecture ensures that the application remains fast and responsive regardless of how much historical data accumulates over time.
