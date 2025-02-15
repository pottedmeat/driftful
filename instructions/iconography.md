# Iconography

This document lists all icons needed throughout the application, organized by their context and usage.

## Navigation Icons
> These icons represent different ways of viewing time. Pages are made up of individual days, Week shows 7 days at once, Month shows ~30 days, and Year shows ~365 days. Collections are timeless spaces that transcend the calendar structure.
- **Pages Tab**: Primary navigation tab icon for the Page View
  - Represented by a paper outline containing three horizontal lines: the first line starts with a small checkmark (✓), the second with a small circle (○), and the third with a horizontal dash (—), visually depicting the three item types that can exist on a Page
- **Week Tab**: Primary navigation tab icon for the Week View
  - Represented by a small calendar-like shape containing four solid horizontal lines, creating a minimal horizontal "week" layout that visually suggests a compressed block of time
- **Month Tab**: Primary navigation tab icon for the Month View
  - Represented by a grid filled with dots, visually suggesting multiple days and a fuller spread of entries across a month
- **Year Tab**: Primary navigation tab icon for the Year View
  - Represented by a wall calendar icon: a vertical rectangle with a small circular pin or hole at the top center and subtle fanned lines at the bottom, evoking a traditional paper calendar to signal a longer time span
- **Collections Tab**: Primary navigation tab icon for the (Bullet Journal-style) Collections View
  - Represented by a simple tag shape with a small circular hole at one end, evoking the classic bullet journal practice of using tags or markers to identify grouped content

## Creation Interface Icons
> These icons facilitate the core creation flows, representing the transition from thought to digital artifact.

### Text Entry Controls
> Represents the moment of commitment—when a thought becomes concrete.
- **Send/Create**: Checkmark or plus sign for creating new items
  - Represented by a circle with an up arrow, suggesting sending the item to the journal

### Type Selection Controls (Select One of Three)
> These represent the three fundamental types of items that can exist in the system. Tasks are actionable and completable, Notes are for reference and reflection, Events are time-bound occurrences.
- **Task Type**: Icon representing tasks in the item type selector
  - Represented by a simple checkmark (✓), the most universally recognized symbol for tasks and to-do items
- **Note Type**: Icon representing notes in the item type selector
  - Represented by a horizontal line, evoking the act of writing out a thought while maintaining minimalist simplicity
- **Event Type**: Icon representing events in the item type selector
  - Represented by a small calendar page with a single date highlighted

### Flyout Reveal Controls (Triggers Opened Flyout)
> These icons reveal contextual interfaces that help users make decisions about time and inheritance.
- **Day Picker**: Icon for opening the day selection interface
  - Represented by a calendar page icon with a small magnifying glass in the bottom right corner, suggesting the ability to examine and select specific dates from a detailed interface
- **Timeframe Toggle**: Icon for opening timeframe visibility options (Week, Month, Year)
  - Represented by a simple clock
- **Adopt Ancestor**: Icon for importing items from parent timeframes
  - Represented by a simple open box outline with a downward arrow entering it from above, suggesting the act of bringing items "down" from a higher-level timeframe into the current context

## Action Icons
> These icons represent ways to modify, transform, and indicate the state of items. They embody the fluid nature of information in the system.
- **Edit**: Icon for editing existing items
  - Represented by a simple pencil or pen tip outline, suggesting the classic act of writing or editing while maintaining the minimalist line-style design pattern
- **Quick Migrate**: Icon for quickly moving items to a higher timeframe
  - Represented by a lightning bolt outline, suggesting speed and efficiency while maintaining the minimalist line-style design pattern
- **Migrate**: Arrow or similar icon for moving items between timeframes or to collections
- **Duplicate**: Copy icon for duplicating items
- **Change Type**: Icon for changing an item's type (between Task, Note, Event)
  - Represented by the type icon (Task, Note, Event) of the current item type
- **Strikethrough**: Icon for marking items as irrelevant
  - Represented by a checkbox with a horizontal line through it, suggesting the act of marking something as irrelevant while maintaining the minimalist line-style design pattern
- **Star**: Icon for marking items as important
- **Checkbox**: Icon/component for marking tasks as complete
  - Represented by an empty checkbox or a checkmark
- **Right Arrow**: Icon indicating a migrated item

## Navigation Controls
> These represent movement through time, allowing users to explore their past and future.
- **Left Arrow**: For navigating to previous timeframes
- **Right Arrow**: For navigating to future timeframes

## Design Requirements
> These guidelines ensure the icons form a cohesive visual language that supports the app's core metaphors of time and information management.
- All icons should follow a simple, line-style design
- Consistent stroke weight across all icons
- Clear meaning without labels where possible
- Adequate touch targets for mobile use (minimum 44x44px)
- Support for hover and active states
- Accessible color contrast 