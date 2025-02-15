# Driftful Development Documentation

## Documentation Structure

### Core Project Documentation
- `instructions/project-overview.md` - High-level summary of Driftful's purpose and goals
- `instructions/project-pitch.md` - Value proposition and target audience definition
- `instructions/project-requirements.md` - Comprehensive product requirements and specifications

### Technical Architecture
#### Backend
- `instructions/backend.md` - Backend architecture and infrastructure design
- `instructions/database-sync.md` - Event-driven synchronization and offline-first implementation
- `instructions/data-models.md` - Core data structures and relationships
- `instructions/tinybase-queries.md` - Database query patterns and implementation

#### Frontend
- `instructions/frontend.md` - Frontend architecture and implementation patterns
- `instructions/file-structure.md` - Project organization and file structure guidelines
- `instructions/platform-specific-files.md` - Platform-specific code management
- `instructions/tech-stack.md` - Technical stack specifications and usage

### User Interface
#### Navigation & Flow
- `instructions/app-flow.md` - Application navigation and user journey mapping
- `instructions/tabs.md` - Tab-based navigation implementation
- `instructions/breadcrumbs.md` - Breadcrumb navigation system
- `instructions/views.md` - Screen and view implementations
- `instructions/flyout-pattern.md` - Flyout menu patterns

#### Visual Design
- `instructions/look-and-feel.md` - Visual design system and principles
- `instructions/iconography.md` - Icon usage and design patterns

#### User Interactions
- `instructions/pickers.md` - Date and option picker implementations
- `instructions/create-item-flow.md` - Item creation workflow
- `instructions/edit-item-flow.md` - Item editing workflow
- `instructions/timeframe-transitions.md` - Timeframe-based organization logic

#### User Management
- `instructions/user-onboarding.md` - User onboarding process

### Future Development
- `instructions/future-plans.md` - Development roadmap and future features
- `instructions/reusable-frame-paged-index.md` - Reusable component patterns

## Technical Implementation

### Frontend Stack
- **Framework**: React Native with Expo
  - Cross-platform (iOS, Android, Web) support
  - Expo SDK for device features
  - Expo Router for navigation

- **Language**: TypeScript
  - Strict type checking
  - Interface-driven development
  - Type-safe component props

- **Styling**: NativeWind & NativeWindUI
  - Tailwind CSS-like styling
  - Platform-adaptive components
  - Consistent design system

### Backend Architecture
- **Database**: Supabase
  - PostgreSQL database
  - Real-time subscriptions
  - Row-level security

- **Data Layer**: TinyBase
  - Local-first architecture
  - Offline support
  - Event-driven sync

### Development Principles

#### Code Organization
- Feature-based component structure
- Shared utilities and hooks
- Platform-specific code isolation
- Clear separation of concerns

#### Component Guidelines
- Functional components with hooks
- Props interface definitions
- Component composition over inheritance
- Reusable UI primitives

#### Styling Approach
```typescript
// Use NativeWind className prop
const Component = () => (
  <View className="bg-white p-4 dark:bg-gray-900">
    <Text className="text-gray-900 dark:text-white">
      Content
    </Text>
  </View>
);
```