---
description: Explain the data object models for the tasks, events, notes, collections, and pages
globs: 
---
## 1. Entities (Tasks, Events, Notes, and Collections)

**Purpose:**  
Entities (`entities` table) are the basic building blocks of the application. These include tasks, events, and notes. Each entity represents a single logical item that evolves over time through the event-sourced framework (see documentation on Database Synchronization for details).

**Collections:**
Collections are a special variation of entities that only leverage the `content` field.

Collections are strictly top-level organizational units that exist independently from time-based scopes. Tasks and notes assigned to a collection do not automatically appear in any day/week/month/year scope. The only way for a collection item to appear in a timeframe is through explicit manual migration by the user from the collection back to a timeframe. This keeps collections as a clean, separate organizational system from the temporal hierarchy.

Key points about Collections and Timeframes:
- An item can only exist in either a collection OR a timeframe, never both simultaneously
- When an item is assigned to a collection, it is removed from any timeframe it was previously in
- When an item is manually migrated from a collection to a timeframe, it is removed from the collection
- All migrations between collections and timeframes create migration breadcrumbs that track the item's history
- Migration breadcrumbs persist regardless of direction (timeframe → collection or collection → timeframe)
- Breadcrumbs track the history of an item's movement between collections and timeframes, but the breadcrumbs themselves can appear in both views

**Collection Capacity and Management:**
- A single collection can contain an unlimited number of tasks and notes
- The system does not impose any limits on collection size or provide special handling for large collections
- Users are responsible for managing their collection sizes and organization
- If a collection grows too large, users can manually migrate items to new collections as needed
- There is no automated workflow for merging two collections or splitting a collection
- To merge collections: Users can manually migrate items between collections and use the collection deletion workflow for the remaining items
- To split a collection: Users can manually migrate selected items to a new collection

**Collection Deletion:**
- Collections are deleted by marking them as irrelevant using the strikethrough action
- When deleting a collection:
  1. User marks the collection as irrelevant using the strikethrough action
  2. User is prompted to choose a destination (another collection or timeframe) if active tasks remain in the collection
  3. All items are automatically migrated to the chosen destination
  4. Migration breadcrumbs are created to track the movement of items from the deleted collection
- Like other deletions in the system, collections are never hard-deleted, only marked as irrelevant

**Key Characteristics:**

- **Core Fields:**  
  - **`client_id`**: A unique identifier for the client that created this entity.  
  - **`entity_id`**: A client-specific counter that serves as a unique identifier for the entity.
  - **`type`**: Specifies whether the item is a 'task', 'event', 'note', or 'collection'.  
  - **`content`**: A short text field (the main descriptor for the entity).  
  - **`collection_client_id`**: A specific collection the entity is assigned to (only available for tasks, notes)
  - **`collection_entity_id`**: A specific collection the entity is assigned to (only available for tasks, notes)
  - **Timeframe Assignment Fields**:
    - **`day`**: A specific day that the entity is assigned to (mandatory for events, unavailable to collections). For events, this is always a single integer representing the day, with no time component - events are strictly day-based.
    - **`week` / `month` / `year`**: A specific week, month, or year that the entity is assigned to (optional for events, unavailable to collections).
  - **Flags:**  
    - **`is_completed`**: Boolean flag indicating the item is completed (only availble for tasks).
    - **`is_starred`**: Boolean flag indicating the item is marked as important (a BuJo-style star/signifier).  
    - **`is_irrelevant`**: Boolean flag which, when set to true, causes the UI to display the item with a strikethrough—indicating that it has been marked as irrelevant (soft-deleted).

**Note:** All modifications to entities are handled through an event-sourced framework. See documentation on Database Synchronization for details on how entities are created, updated, and synchronized.

**Timeframes:**

Timeframes keys hold integer values where each day, week, month, or year is incremented by 1 on each timeframe.

- Day: Starting with Jan 1, 1970 as day 1, increases by 1 each day
- Week: Starting with Jan 1, 1970 as week 1, increases by 1 the start of each new week (typically Sunday)
- Month: Starting with Jan 1, 1970 as month 1, increases by 1 the first day of each new month
- Year: Uses the actual 4-digit year (e.g., 2024, 2025) as an exception to the incremental counting system

**Important Notes:**
- Dates before Jan 1, 1970 are not supported in the system
- While day, week, and month use incremental counting from 1970, year is an exception that uses the actual calendar year
- This mixed approach simplifies year-based calculations while maintaining the benefits of incremental counting for other time frames

Calculating:

- Do not perform timestamp calculations which are unreliable due to daylight savings among other issues
- Base all calclations on actual numbers of days/weeks/months between two dates
- Week start day (Sunday) should be defined as a variable to support future configurability
- Make sure that week counts are relative to the first new week e.g. Jan 4, 1970 would be the first Sunday

Examples:

- Jan 1, 1970 is day: 1, week: 1, month: 1, year: 1970
- Jan 4, 1970 is day: 4, week: 2, month: 1, year: 1970 (Sunday starts a new week)
- Jan 10, 1970 is day: 10, week: 2, month: 1, year: 1970 (Saturday is within week 2)
- Jan 1, 1971 is day: 365, week: 52, month: 13, year: 1971

### Time Zone Handling

The integer-based date system naturally handles time zones without any special logic or conversion:

- **Integer Day System:** All dates are stored as integer time frame counts from Jan 1, 1970
- **Local Time Zone:** The app uses the device's local time zone to determine the current day
- **No Time Zone Conversion:** Because dates are stored as integer counts, no time zone conversion is needed
- **Consistent Date Display:** A task created on a specific date (e.g., Jan 8, 2025) will always show up on that date regardless of time zone
- **Day Boundaries:** Day changes occur at midnight in the user's current local time zone
- **No Overlapping Pages:** Because days are stored as integers, it's impossible for pages to overlap:
  - A specific day (e.g., day 19723) is always that exact day, regardless of time zone
  - Time zone changes only affect how the current local time maps to these day integers
  - Historical data and page boundaries remain fixed and consistent across all time zones
- **Immediate Time Zone Adaptation:** 
  - When users change their device's time zone (e.g., while traveling), the app immediately adapts to show the correct local date
  - Example: If a user flies from London to Tokyo and their phone updates to Tokyo time, a task due "today" will immediately reflect Tokyo's current date
  - This happens automatically with no adjustment period or special handling needed
  - Historical tasks remain on their original dates, maintaining data consistency
  - The "current" day and any day-based calculations instantly use the new local time zone

This approach ensures that:
1. Date handling is simple and predictable
2. Users always see the correct date in their current time zone
3. Historical data remains consistent regardless of time zone changes
4. No complex UTC conversions or time zone calculations are needed
5. Time zone changes are handled seamlessly and immediately
6. Pages and timeframes can never overlap due to the integer-based day system

### Event Visibility in Timeframes

Events in Driftful are always fundamentally day-based, meaning they must be assigned to a specific day. The event will always appear in its assigned day, regardless of broader timeframe visibility settings. Additionally, through checkboxes in the UI, users can control whether the event also appears in broader timeframe views (week, month, year):

- **Day Assignment:** Every event must have a `day` field set, representing its specific occurrence date. The event will always be visible on this day.
- **Broader Scope Visibility:** Through checkboxes in the UI, users can control additional visibility in:
  - Week view (showing the event in the week containing its assigned day)
  - Month view (showing the event in the month containing its assigned day)
  - Year view (showing the event in the year containing its assigned day)
- **Multiple Scope Display:** Users can enable visibility in any combination of broader scopes:
  - Events can appear in none, one, some, or all of the broader scopes simultaneously
  - When displayed in broader scopes, events always show their specific assigned day using breadcrumb-style formatting
  - This maintains clear context and prevents any perception of event duplication
- **Context vs Migration:** This visibility is purely about providing different levels of context for viewing the event. It does not:
  - Move or migrate the event from its assigned day
  - Create copies of the event in different scopes
  - Change the fundamental day-based nature of the event
- **Typical Usage:** Following Bullet Journal methodology, events are often written in both daily and monthly logs, which is why month view visibility is enabled by default

This approach allows users to control how much temporal context they want for each event while maintaining the event's fundamental association with its specific day.

---

## 2. Pages

**Purpose:**  
Pages are the fundamental organizational unit for grouping days. Each page represents a distinct date range, with one page always being designated as the "current" page. Pages provide a natural way to segment and organize entities (tasks, events, and notes) over time.

**Key Characteristics:**

- **Distinct Object Model:**  
  Pages are separate from entities, stored in their own dedicated `pages` table.

- **Core Fields:**  
  - **`id`**: A unique identifier for the page.  
  - **`start_day`**: The first day in the page's range (integer, see Timeframes section above).  
  - **`end_day`**: The last day in the page's range (null for current page only).

- **Association with Entities:**  
  Entities don't directly reference pages. Instead, the system determines which page an entity belongs to by finding the page where `start_day ≤ entity.day ≤ end_day`.

**Page Creation Rules:**

- Pages are created **exclusively** through explicit user action
- The system NEVER:
  - Automatically creates new pages
  - Suggests or prompts the creation of new pages
  - Notifies users about the passage of time
- The current page remains active indefinitely until the user manually creates a new one
- This is an intentional design choice to give users complete control over their organizational boundaries
- Even if months or years pass between app uses, the system will not suggest creating a new page

**Page Closure Decision:**
The decision to close a current page and start a new one is entirely up to the user. There are no system prompts or automated suggestions for when to close a page. Users typically choose to create a new page when the current page becomes too long for comfortable scrolling and navigation, allowing them to maintain their preferred organizational structure based on their own workflow and preferences.

**Why Pages Exist:**

Pages serve as flexible containers that let users:
- Group related tasks, events, and notes together based on their own context and needs
- Maintain continuity of thought and work across multiple days
- Create natural breaks in their timeline when context shifts so they can trigger automatic migrations on their own terms
- Keep past work organized in ways that make sense to them
- Control their own organizational boundaries rather than having the system impose arbitrary ones

**Page Creation and Boundaries:**

1. **Initial Setup:**
   - On first app launch, two pages are automatically created:
     1. A historical page spanning from day 1 to yesterday
     2. A current page starting from today (no end day)

2. **New Page Creation Rules:**
   - Pages are only created through explicit user action
   - When creating a new page:
     1. The current page's end_day is set to yesterday
     2. A new current page starts from today with no end_day
     3. Creation is prevented if a page already starts on today
   - Only one page can be "current" (have null end_day) at any time

3. **Boundary Management:**
   - Page boundaries (start_day/end_day) are system-managed
   - Users cannot manually adjust these boundaries
   - Past pages are immutable - their boundaries cannot change
   - The current page automatically advances its start_day on creation

4. **Entity Behavior Within Past/Present:**
   - Present (today and all future days):
     - Full read/write access for all entity types
     - Entities can be freely created, edited, and migrated
   - Past (yesterday and all previous days):
     - Notes and events can be freely added without restrictions
     - Tasks added will automatically be marked as completed
     - Events cannot be migrated from the past (but can be copied to the present)
     - Tasks cannot be migrated from the past (but can be copied to the present)
     - Notes can be migrated or copied from the past

5. **Time Zone Handling:**
   - Page boundaries respect the user's local timezone
   - Day transitions occur at local midnight
   - No explicit timezone storage needed (see Time Zone section above)

This page model ensures clear organization of entities while maintaining a consistent historical record. For implementation details of page navigation and user interface, see documentation on App Flow. For more details on how entities transition between pages and timeframes, see documentation on Timeframe Transitions.
