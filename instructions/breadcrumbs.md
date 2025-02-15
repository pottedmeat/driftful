---
description: Explains how breadcrumbs work
globs: 
---
# Breadcrumbs Display and Query Logic

## Overview

In Driftful, *breadcrumbs* are represented by version links between entity versions. Each entity has an `action` for each version.

Since an entity can undergo multiple changes in one day (or page, or timeframe), *multiple breadcrumbs* can theoretically appear. The following sections detail how queries and priority rules decide which breadcrumbs to show.

---

## 1. Querying Breadcrumbs

### 1.1 Omitting Displayed Items

If an entity is visible within the current view, no breadcrumbs should be shown for it, and it should be excluded from all other queries.

### 1.2 Querying for Migrations

Most views display migration breadcrumbs to track task movement between time frames (see documentation on App Flow for complete migration rules).

Querying should be done in two parts on the `entities` table:

1. Get all `uuid` and `version` values of `entities` where `next_action` is 'MIGRATE' and the corresponding field has a matching value (e.g. `month` in the month view)
2. Perform a UNION query of multiple selects to `entities` to find the `uuid` with `version + 1`

Migration breadcrumbs should be shown with their `content` and link to the time frame from entities in this final query.

### 1.3 Querying by Day

The Page View contains one or more days and, unlike other views, will display change logs in addition to migrations. These are logs of what actions the user took on that day. Breadcrumbs aim to show both user actions and entity content.

Querying should done in two parts on the `entities` table:

1. Get all unique `uuid` values of `entities` where `timestamp` is >= the first second of the start day and <= the final second of the end day
2. Query `entities` matching any of these `uuid` values, in ascending order by `timestamp`

Results should be put into a map by `uuid` and `version` which will allow us to show the following breadcrumbs based on `action`:

- CREATE: Display the `content` at this version
- EDIT: Display the `content` of the previous version
- COMPLETE: Display the `content` at this version
- INCOMPLETE: Display the `content` at this version
- IRRELEVANT: Display the `content` at this version
- STAR: Display the `content` at this version

Note: There is no limit to the number of breadcrumbs that can occur in a short period—this behavior is intentional to emulate the natural penalty of repeatedly crossing out and rewriting in a physical notebook.

### 1.4 Breadcrumb Filtering

All events generate visible breadcrumbs, regardless of their significance or frequency. Even minor changes like toggling completion status multiple times will create breadcrumbs for each action. This design intentionally mirrors the experience of using a physical notebook where each mark leaves a permanent trace. Just as repeated crossing out and rewriting in ink would leave multiple visible marks on paper, repeated digital actions create multiple visible breadcrumbs in the system.

### 1.5 Following Breadcrumbs

Breadcrumb links only move forward in time, showing the progression of an item through different time frames. All breadcrumbs link to the time frame of the matching version, unless that time frame is within the current view. For quick navigation to the most recent version of an item, users can long-press any breadcrumb link to jump directly to the current version, bypassing intermediate steps.

### 1.6 Retroactive Changes and Item Copying

When an item is copied forward from a past page to the current page, it is treated as a new item and will drop a CREATE breadcrumb. The history of the original item's movements and changes is not preserved in the new item's breadcrumb trail. This maintains a clean separation between historical records and new items, even if they share similar content.