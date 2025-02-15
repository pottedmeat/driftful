# Future Development Plans

## General Development Plans
- **Monetization Considerations**: While initially free, potential future introductions of premium features or a subscription model might be considered, albeit not within the current MVP.
- **Platform Expansion**: Launching as a web app with mobile considerations and later evaluating extensions to other platforms as demand dictates.
- **Multi-User Support**: If implemented in the future, multi-user functionality would be handled through separate local databases per user, rather than implementing complex conflict resolution for shared event logs.

## Core Features in Development

### 1. Enhanced System Error Handling
- **Current State:** Unexpected system errors during replay are silently skipped
- **Planned Improvements:**
  - UI notifications for unexpected system errors
  - System error diagnostics and logging
  - Admin interface for investigating system errors
  - Automated error reporting for system stability

### 2. Multi-User Support
- **Current State:** Basic single-user functionality only
- **Planned Enhancements:**
  - User authentication and authorization
  - Enhanced conflict resolution for concurrent edits
  - Real-time collaboration features
  - User-specific event tracking and history
  - Role-based access control

### 3. Additional Planned Features
- Performance optimizations for large event logs
- Enhanced monitoring and debugging tools
- Automated testing for sync scenarios
- Backup and recovery improvements
- Configurable week start
  - Support for different locale preferences (Monday/Sunday start)
  - Would only change the week count moving forward
  - Currently fixed to Sunday start, with configuration planned for future release

## Implementation Timeline
These features are not part of the current MVP and will be addressed in future releases. The exact timeline will be determined based on user feedback and business priorities. 

## Features Never Planned for Implementation

To maintain the app's minimal design philosophy and focus on core functionality, certain features have been intentionally excluded from both current and future development plans:

- **Notifications/Reminders**: No scheduling reminders or push notifications for tasks or events.
- **Complex Editing**: No extensive forms for entity creation; editing will only allow simple modifications such as title changes, migration, clone, or deletion.
- **Multiple User Roles**: All users have equivalent permissions; no role-based access or permissions.
- **Third-Party Integrations**: Apart from Supabase for backend and storage (with offline-first support), no additional third-party APIs are planned.
- **Monetization Features**: The app will be entirely free, with no premium upgrades or subscription models planned for this MVP.
- **Recurring Tasks**: No support for recurring tasks or repetitive events, as this would add complexity that goes against the app's minimalist design philosophy.
- **Custom Fields**: No support for custom fields, user-defined metadata (such as tags or color labels), or other extensible properties, as this would conflict with the app's minimal design philosophy.
- **Task Reordering**: No support for manual reordering or prioritization of tasks beyond starring—similar to a physical journal, tasks remain in their original creation order within each timeframe.

These exclusions are deliberate design decisions that align with our commitment to simplicity and ease of use.