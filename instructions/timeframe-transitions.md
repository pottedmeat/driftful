---
description: Defines the rules for how tasks transition between timeframes
globs: 
---
# Timeframe Transitions

This document outlines the rules for how active tasks (those that are both incomplete and not marked as irrelevant) transition between different timeframes in Driftful, both during page creation and when time boundaries are crossed.

---

## 1. Transitions During Page Creation

When a user creates a new page, all active tasks on the current (active) page are automatically migrated to their next logical timeframe based on how far in the past they are originally assigned:

- Tasks less than 7 days away → Week timeframe
- Tasks 7 to 30 days away → Month timeframe
- Tasks more than 30 days away → Year timeframe

Note: These migrations follow the same boundary period handling rules described in the section on Time Boundary Transitions.

**Important Notes:**
- This migration happens automatically and immediately upon page creation with no confirmation step or opportunity to prevent it
- Users who want to prevent specific tasks from auto-migrating MUST take action before creating the new page by either:
  - Manually migrating tasks to their desired location
  - Completing the tasks
  - Marking tasks as irrelevant
- An unread indicator will appear in the destination timeframe view to show the presence of auto-migrated tasks
- The migration creates a breadcrumb trail that can be followed to view the task's history
- Completed or irrelevant tasks remain in their original location and cannot be migrated
- Only active tasks are migrated; completed or irrelevant tasks stay in their original location

---

## 2. Time Boundary Transitions

When opening the app, if the current date has surpassed a timeframe boundary, active tasks in that passed scope automatically migrate to the next higher scope within the current scope window:

- Week timeframe tasks → Month timeframe
- Month timeframe tasks → Year timeframe
- Year timeframe tasks → Roll over to next year's Year timeframe

**Important:** Active tasks in Year timeframe automatically roll over to the next year when a new year begins. For example, active tasks in Year 2025 will automatically move to Year 2026 when 2026 begins. This rollover continues indefinitely until tasks are either completed or marked as irrelevant.

**Example:**
If a user opens the app and the current week has ended:
1. All active tasks in the Week view automatically move to the current Month view
2. A breadcrumb is created to track this automatic migration
3. The task appears in its new location without any visual transition or notification

### Boundary Period Handling

Tasks created near the end of a timeframe are automatically placed in the next scope:
- Tasks created in the last day of a week appear in the next week's scope
- Tasks created in the last few days of a month appear in the next month's scope
- Tasks created in the last week of a year appear in the next year's scope
- Tasks in Year timeframe roll over indefinitely until completed

These boundary period handling rules apply to both time boundary transitions and new page auto migration. This prevents unnecessary migrations and maintains a more intuitive task organization aligned with user intent.

---

## 3. Implementation Guidelines

- Migrations should be handled as part of the event-sourced framework
- Using the event-soruced framework will automatically create a breadcrumb for tracking history
- No confirmation dialogs or visual transitions should be shown during automatic migrations
- Users can follow breadcrumbs to view migration history and manually move tasks back if desired
- Tasks will maintain their original metadata (creation date, previous migrations, etc.) after transition

---

## 4. User Awareness

- A subtle dot indicator briefly appears in the timeframe view where tasks were automatically migrated during page creation
- This indicator automatically disappears after a very brief time (a few seconds)
- The indicator is designed to be minimally intrusive while still drawing attention to newly migrated tasks
- The unread indicator only applies to migrations triggered by page creation, not time boundary transitions
- Users can still track all migrations (including time boundary transitions) through the breadcrumb system

---

## 5. Reversing Migrations

- There is no dedicated "revert" or "undo" action for task migrations
- To move a task back to a previous scope, users must perform a new MIGRATE event to the desired scope
- Example: To move a task from Month timeframe back to Week timeframe, create a new MIGRATE event targeting Week timeframe
- All migrations (including reversals) are tracked in the task's breadcrumb trail
- The breadcrumb history helps users understand the complete migration path of any task

---

## 6. Long-Term Task Handling

- Tasks in the Year timeframe will roll over from year to year indefinitely if they remain incomplete
- There is no time limit on how long a task can remain in the Year timeframe
- Tasks will maintain their complete migration history through breadcrumbs regardless of how many years they roll over

## 7. Collection Migrations

When tasks move between timeframes and collections:
- Moving a task from any timeframe to a collection creates a migration breadcrumb
- The breadcrumb preserves the history of which timeframe the task came from
- This migration history is retained indefinitely and can be followed to understand the task's full history
- The same breadcrumb behavior applies when moving tasks from collections back to timeframes
- Migration breadcrumbs appear in both collection and timeframe views for easy reference

---

## Summary

Timeframe transitions in Driftful follow a predictable pattern that helps keep tasks organized based on their temporal relevance. The system automatically handles these transitions both during page creation and when time boundaries are crossed, maintaining a clean and organized task management experience without requiring user intervention. 