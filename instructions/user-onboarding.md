---
description: Describes the user onboarding and education strategy
globs: 
---

# User Onboarding & Education

Driftful employs a gentle, contextual approach to user education through one-time informational popups that appear at key moments in the user journey. These popups are designed to introduce advanced concepts exactly when they become relevant, ensuring users learn features naturally as they use the app.

## Educational Popups

All educational popups include a "Don't show this again" checkbox that is checked by default, respecting user preferences while still providing essential information. The following moments trigger educational popups:

### Task Migration Education
- **First Change Breadcrumb**: When a change breadcrumb is created, explaining how breadcrumbs track the history of modifications
- **First Migration Breadcrumb**: When a task is first migrated (manually or automatically), explaining how breadcrumbs help track task movement between timeframes
- **First Auto-Migration**: When creating a new page for the first time, explaining how incomplete tasks auto-migrate and that a brief dot indicator will appear in destination timeframes

### Page Management Education
- **First New Page Creation**: When a user first creates a new page, explaining how incomplete tasks are automatically handled based on their age
- **First Timeframe Transition**: When tasks first transition between timeframes (week/month/year), explaining how the system helps prevent tasks from being forgotten

## Design Philosophy

The educational system follows these principles:
- Information is presented only when relevant
- Explanations are concise and focused on immediate user needs
- Users maintain control over their learning experience
- Education is integrated naturally into the workflow
- Popups are designed to be minimally intrusive

## Implementation Notes

- Popup state (whether they've been shown) is stored locally per device and does not sync across devices
- Educational content is kept brief and uses simple language
- Popups are designed to match the app's minimal aesthetic
- Each popup appears in a consistent location and style 
- Each popup where the user decided they wanted to see it again won't be shown until the next day