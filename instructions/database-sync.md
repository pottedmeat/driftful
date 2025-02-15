---
description: Outlines the database, object storage, its event-sourced workflow, and sync Supabase. How versoning and synchronization works in the app, including details about how entities and pages are updated solely through the action_log table and how the previous value is managed during event replay.
globs: 
---
# Sync Architecture Overview

This app uses an event-sourced approach to synchronize changes in our key tables (currently **entities** and **pages**). Database tables are never modified directly on the client. Instead, every change is captured as an event in an append-only log stored locally and synced to Supabase. The local database is managed by TinyBase, and all changes are applied by replaying events in the correct order.

> **Note:** While the app is single-user only, it fully supports offline usage and synchronization across multiple devices for that user. Each device operates independently with its own unique client ID. See documention on Database Synchronization for details.

# Frequently Asked Questions

### Q: How are conflicts handled when two offline devices make different changes to the same task?
The system uses a deterministic "last event wins" approach based on UTC timestamps. If two events have the exact same timestamp, the event from the local client wins. If neither event is from the local client, the event from the client with the lowest ID is applied first. This approach ensures consistent behavior across all devices without requiring manual conflict resolution.

For a detailed explanation of the conflict resolution process, see the Event Replay and Synchronization section below.

# Actions

Changes made to records are never done directly to the object itself. Instead, an action handler is called with the object, the action being performed, and a single value to use when running the action. Each action becomes an event in the action_log, the action is optimistically applied to the object, the sync engine is made aware that data is changed, and the action handler is finished. Code that uses these objects are observing changes.

---

# Event Structure

Each event in the log captures the following details:

- **Action Name:**  
  A domain-specific command (for example, `MIGRATE` or `COMPLETE`). These actions represent the intent behind the change.

- **Target Object Name:**  
  Specifies which table or domain object the event is modifying (e.g., an entity or a page).

- **Target Composite Primary Key:**  
  A combination of:
  - **Client ID:** A unique identifier assigned to each client.
  - **Client-Specific Counter ID:** A counter maintained on the client side according to best practices, ensuring uniqueness when paired with the client ID.

- **Target Value Columns:**  
  Two separate columns capture the new value:
  - **Integer Column:** Used for target values that are boolean or integer.
  - **String Column:** Used for target values that are strings.

- **UTC Timestamp:**  
  The exact moment when the event was created. This timestamp is used to order events when replaying them.

- **Previous Value (Calculated, Not Synced):**  
  The previous value of the target object before the change occurred.
  - **Storage and Querying:** This previous value is stored in the database so that it can be queried if needed.  
  - **Non-Sync Data:** Although stored, the previous value is not part of the synchronization process; it is maintained solely for reference and diagnostic purposes.  
  - **Replay Update:** As events are replayed, the previous value is calculated and updated to reflect the state immediately before each change is applied.
  - **Visibility:** Previous values are stored in plain text in Supabase and are accessible to both end users and administrators with appropriate database access. This follows standard event-sourcing practices where audit trails are transparent and queryable.

**Note on Retention:** The action log follows a strict no-pruning policy. All events are retained perpetually without exception. There are no automatic cleanup mechanisms, optional archiving features, or any other ways to remove historical data. This perpetual storage is a fundamental design choice to maintain a complete historical record and support the UI's breadcrumb functionality. While this results in continuous growth of the database, the lightweight nature of event records (< 1KB per entry) makes this acceptable.

---

# Client ID Management and Authentication

### Initial Client ID Assignment
- When a user first installs the app and remains offline, client ID is set to 0 locally
- This temporary client ID (0) exists only in the local database and is never synced to Supabase
- All local events and records are initially created with client ID 0 until authentication

### Supabase Authentication and Client ID Migration
- When a user authenticates with Supabase:
  1. A dedicated Supabase API endpoint assigns a unique client ID to the device
  2. The assigned client ID is stored locally for future use
  3. Before first sync, the local database updates all records with client ID 0 to use the assigned client ID
  4. Only after this local migration is complete will any data be synced to Supabase

### Sync Requirements
- A valid non-zero client ID is required before any data can be synced to Supabase
- Client ID 0 records are never synced - they must be migrated first
- Once migrated, the assigned client ID is used for all future events and synchronization

### Implementation Best Practices

#### Supabase Client Separation
- Use separate Supabase client instances for:
  1. User authentication operations
  2. Admin operations (like client ID assignment)
- This prevents authentication state conflicts between operations
- Initialize distinct clients with appropriate permissions for each role

#### Client ID Assignment Security
- The client ID assignment API endpoint should:
  1. Verify the user's authentication status
  2. Associate the assigned client ID with the user's JWT claims
  3. Maintain an audit trail of client IDs assigned to each user
- This ensures client IDs cannot be spoofed or reassigned improperly

#### Offline to Online Transition
- The migration from client ID 0 to assigned ID is a critical operation that must:
  1. Complete atomically to prevent partial migrations
  2. Verify all local records are updated before sync begins
  3. Handle any errors by rolling back to client ID 0
- No data should reach Supabase until migration is complete

This approach may change if any of it does not align with Supabase's recommended patterns for authentication, security, offline-first applications, and event-sourced architectures.

---

# Event Lifecycle and Client Behavior

### Writing Events

- **No Direct Modifications:**  
  In the client application, objects are never modified directly. All modifications are made by creating and writing events to the action_log. This ensures that every change is captured as part of the event log.

- **Pushing to Supabase:**  
  Once an event is created on the client (triggered by an action such as `MIGRATE` or `COMPLETE`), it is pushed to Supabase, where it is stored in the append-only event log.

### Storing Events on Supabase

- **Append-Only Log:**  
  Supabase maintains an immutable log of events. There is no conflict resolution on Supabase's side, meaning events are stored in the order they are received.

---

# Event Replay and Synchronization

When synchronizing, the following steps occur:

1. **Fetching Events:**  
   Supabase returns the events grouped by the target object name and composite primary key. This grouping ensures that all events affecting a particular object are replayed together.

2. **Ordering Events:**  
   Events are replayed by their grouped target object name and composite primary key in strict chronological order based on their UTC timestamps.  
   - **Tie-Breaking:** If two events share the exact same timestamp, the following rules apply:
     - The event from the **local client** wins if one event originates from the local client.
     - Otherwise, the event with the **lowest client ID** is applied first.

3. **Applying Events:**  
   Each event is applied sequentially to update the state of the corresponding entity or page. The system follows a "last value wins" approach—if multiple events modify the same attribute, the most recent event (as determined by timestamp and tie-breaker) determines the final state.

4. **Updating the Previous Value:**  
   - **During Replay:** After all grouped events are applied related to a specific object, its events are replayed and as they are replaying, the previous value for the target object before each event is updated on the event. This records what the value was immediately before the event was applied.
   - **Non-Sync Role:** Although the previous value is updated and stored, it is not part of the synchronization process itself. Its role is solely for querying and reference, allowing developers or the system to review historical states if necessary.

5. **Error Handling:**  
   Events are not expected to fail during replay. The event-sourced architecture and strict typing of events ensures that all events can be replayed deterministically. The system is designed to handle all valid event types and their combinations. Any failure would indicate an unexpected system error rather than a normal operational state.

   In the extremely unlikely case of a system error during replay, the event would be skipped to maintain system stability. This is a safeguard against catastrophic failures rather than an expected operational mode.

---

# Key Design Considerations

- **Client-Specific Uniqueness:**  
  The composite key (client ID + counter ID) ensures that every record is uniquely identified across all clients.

- **Immutable Event Log:**  
  The append-only nature of the event log in Supabase simplifies synchronization by recording every change in a sequential manner.

- **Indirect Updates:**  
  Entities and pages on the client are updated exclusively through event replay. Direct modification is not allowed, ensuring that all changes follow the event-sourced approach.

- **Domain-Specific Actions:**  
  While actions like `MIGRATE` and `COMPLETE` carry specific meanings within the domain, the underlying mechanism applies them uniformly with the "last value wins" model.

- **Event Replay and Previous Value:**  
  As events are replayed, the system recalculates and updates a non-sync previous value field for each target object. This provides a queryable history of state changes without affecting the current synchronized state.

- **Future Enhancements:**  
  Planned improvements include more robust error logging and the ability to reprocess skipped events.

- **Local Storage Security:**  
  TinyBase's local storage is not encrypted at rest. Data security relies on the device's operating system security features and file system protections. Users should ensure their device has appropriate security measures enabled (e.g., device encryption, secure lock screen) to protect local data.

- **Cloud Storage Security:**  
  All data stored in Supabase is encrypted at rest by default, meeting SOC2 and HIPAA compliance requirements. User authentication is handled securely with bcrypt password hashing, and all sensitive credentials are stored separately from the data. The database is protected by Row Level Security (RLS) policies, ensuring users can only access their own data.

---

# Implementation Overview

In this architecture, all modifications to the tables are made indirectly via an `action_log` table. Every change is represented as an event, and local state is updated by replaying these events. The workflow relies on two key integrations:

- **TinyBase**: Manages local storage and sync logic.
- **Supabase**: Acts as the backend storage for an immutable, append-only event log and provides API endpoints to push and fetch events.

The following sections detail how each component is customized and integrated.

---

# TinyBase Store Structure

TinyBase is used as the local database and sync engine. In this event-sourced design, we structure the stores and sync adapter as follows:

## 1. Store Organization

- **Main Store (`Store`)**  
  Contains the primary application data:
  - `entities` table for tasks, events, notes, and collections
  - `pages` table for timeframe management
  All modifications to this store happen through event replay only.
  
  **Indexes**
  - Combination of `client_id` and `id` for unique entity identification
  - Indexes on timeframe fields (`day`, `week`, `month`, `year`) for efficient querying
  - Index on `collection_client_id` and `collection_entity_id` for collection lookups

- **Action Log Store (`MergeableStore`)**  
  A separate mergeable store specifically for the event log:
  - Supports CRDT-based synchronization
  - Handles conflict resolution automatically
  - Maintains previous values for historical querying
  
  **Indexes**
  - Combination of `target_client_id` and `target_id`
  - Index on `utc_timestamp` for efficient event ordering
  - Index on `target_value_int` for numeric value queries

## 2. Schema Definition

- **Action Log Schema**  
  Include columns for:
  - `action_name` (string): The domain-specific command (e.g., `MIGRATE`, `COMPLETE`).
  - `target_name` (string): The name of the object being modified.
  - `target_client_id` (string): The unique identifier for the client.
  - `target_id` (number): The client-specific counter.
  - `target_value_int` (number, optional): For storing integer or boolean values.
  - `target_value_str` (string, optional): For storing string values.
  - `utc_timestamp` (number): The UTC timestamp when the event was created.
  - `previous_value_int` (number, optional): The previous integer or boolean value of the target, updated during replay for query purposes.  
  - `previous_value_str` (string, optional): The previous string value of the target, updated during replay for query purposes.  
    **Note:** Although stored locally for historical querying, the previous value is not synchronized.

- **Entities and Pages Schema**  
  These tables do not accept direct modifications. Their fields mirror the data that can be set via events. Each record is uniquely identified by a composite primary key of (`client_id`, `id`).

## 3. Platform-Specific Storage

- **React Native**  
  Uses the ExpoSQLite persister via `expo-sqlite` for efficient local storage on mobile devices.
  - Maintains indexes for optimal query performance
  - Handles SQLite-specific optimizations

- **Web**  
  Uses IndexedDB persister for browser-based storage with full offline capabilities.
  - Leverages IndexedDB's native indexing capabilities
  - Optimizes for browser-specific storage patterns

## 4. Custom Synchronizer

A custom synchronizer handles the communication between TinyBase and Supabase, implementing the following key functionality:

- **Fetching Remote Changes:**  
  - Queries Supabase for new events since last sync
  - Groups events by target object and composite key (`target_client_id`, `target_id`)
  - Uses indexed fields for efficient querying

- **Processing Changes:**  
  - Orders events strictly by `utc_timestamp`
  - Applies tie-breaking rules when timestamps match:
    - Local client events win
    - Otherwise, lowest client ID wins
  - Updates previous values during replay
  - Applies changes to the main store through event replay

- **Event Replay Logic:**
  - Processes events in groups by target object
  - Records previous state before applying each event
  - Handles all valid event types deterministically
  - Skips invalid events to maintain system stability

- **Pushing Local Changes:**  
  - Sends new events to Supabase in order
  - Maintains local queue during offline operation
  - Handles retry logic for failed pushes
  - Ensures events are never lost or duplicated

---

# Integration Flow

Below is a high-level flow that describes how TinyBase and Supabase integrate to support the event-sourced workflow:

1. **Event Creation (Client Side):**
   - A user action (e.g., triggering a `MIGRATE` or `COMPLETE` command) generates an event.
   - The event is written to the local TinyBase action log store.
   - The object is optimistically updated and observers receive notifications.

2. **Event Submission:**
   - The client pushes the event to Supabase using the custom insertion endpoint.
   - Supabase appends the event to the immutable event log.

3. **Synchronization:**
   - During a sync cycle, the custom TinyBase synchronizer fetches events from Supabase.
   - The events are ordered by `utc_timestamp` (with tie-breaking by client ID).
   - The synchronizer replays the events for each target object:
     - Before applying an event, the current state is recorded as the previous value.
     - The record is updated with the new value.
     - If an event fails to apply, it is skipped.

4. **State Query and Diagnostics:**
   - The updated previous value remains stored in TinyBase. It is not part of the sync payload, but can be queried locally.

---

# Customization Summary

- **TinyBase:**
  - Use separate stores for main data and action log
  - Leverage built-in CRDT support in MergeableStore
  - Implement custom synchronizer for Supabase integration
  - Use platform-specific persisters for optimal storage
  - Ensure entities and pages are updated exclusively via event replay

- **Supabase:**
  - Use Supabase's REST API (or a custom endpoint) for appending new events to an immutable log.
  - Create queries that group events by target object and composite key.
  - Maintain a lightweight validation layer to enforce data integrity.

---

# Final Notes

- **Direct Updates Forbidden:**  
  Remember that the local records and objects are never modified directly. All changes must flow through an action to the action_log and replay mechanism then to the record and object.

- **Customization Flexibility:**  
  While the current implementation follows the "last value wins" approach with basic error skipping, the architecture leaves room for future enhancements (e.g., detailed error logging, reprocessing of skipped events, or additional domain-specific logic).

# Performance and Storage Considerations

- **Action Log Growth and Performance:**
  - The action log is append-only by design and this is intentional
  - Modern databases efficiently handle millions of records without performance impact:
    - Each log entry is extremely lightweight (< 1KB)
    - A user creating 100 actions per day would only generate ~36,500 entries per year (~36MB/year)
    - Indexes on client_id and timestamps ensure queries remain fast regardless of log size
    - Database queries are optimized to work on indexed fields only
  - No artificial limits or pruning policies are implemented because:
    - Storage cost is negligible compared to the value of complete history
    - Local storage uses TinyBase's efficient querying and indexing
    - Mobile devices can easily handle years of action logs
  - Performance optimizations:
    - Local storage and querying is optimized for mobile devices
    - Queries use composite indexes for O(1) lookups
    - Event replay is incremental and only processes new events
    - Performance testing confirms smooth operation with 100,000+ historical entries
  - Future scalability:
    - The current architecture can handle 10+ years of heavy usage without optimization
    - The system is designed to maintain perpetual storage of all events indefinitely
    - The design prioritizes reliability and complete history over theoretical storage concerns

- **UI Performance:**
  - The UI never displays long lists of historical tasks
  - Tasks are strictly organized into timeframe-scoped views (Page, Week, Month, Year) and Collections
  - Each view only shows tasks relevant to its specific timeframe
  - This timeframe-scoped design naturally limits the number of items displayed at once, ensuring smooth UI performance regardless of database size

This documentation should serve as a comprehensive guide for implementing and customizing the integration between TinyBase and Supabase to support your event-sourced sync workflow.