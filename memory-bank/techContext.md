# Technical Context

## Development Environment

### Core Tools
- **IDE:** Cursor
  - AI-powered coding standards
  - Real-time suggestions
  - Integrated documentation
  - Code completion

### Version Control
- **Git Workflow**
  - Main branch: Production releases
  - Dev branch: Active development
  - Feature branches: Specific implementations
  - Clean commit history

## Technology Stack

### Frontend Core
- **React Native with Expo**
  - Cross-platform compatibility
  - TypeScript implementation
  - Expo SDK for device features
  - Expo Router for navigation

### Styling System
- **NativeWind & React Native Reusables**
  - Tailwind CSS-like styling
  - Platform-adaptive components
  - Consistent design system
  - className prop usage
  - Reusable UI primitives
  - Animation utilities

### State Management
- **TinyBase**
  - Local-first architecture
  - Event-sourced data handling
  - Reactive updates
  - Query capabilities

### Backend Services
- **Supabase**
  - PostgreSQL database
  - Real-time subscriptions
  - Row-level security
  - Authentication system

## Project Structure

### Root Directory
```
/
├── app/                 # Application routes
├── assets/             # Static resources
├── components/         # Reusable UI components
├── contexts/           # React contexts
├── hooks/             # Custom hooks
├── types/             # TypeScript definitions
└── utils/             # Utility functions
```

### Key Directories

#### App Directory
- **Layout Files**
  - _layout.tsx: Root layout
  - (tabs)/: Tab navigation
  - index.tsx: Entry point

#### Components Directory
- **Frame Components**
  - frame-content/
  - frame-view/
  - indexed-view/
  - paged-view/

#### Contexts Directory
- frame-navigation.tsx
- Other app-wide contexts

#### Hooks Directory
- use-frame-route.ts
- use-store/
  - Platform-specific persisters
  - Store initialization

## Development Guidelines

### Code Standards
- **TypeScript Configuration**
  - Strict mode enabled
  - Comprehensive type definitions
  - Interface-driven development
  - Type-safe props

### Styling Approach
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

### Component Guidelines
- Functional components with hooks
- Props interface definitions
- Component composition over inheritance
- Reusable UI primitives

### Platform-Specific Code
- `.native.tsx` for mobile
- `.web.tsx` for web
- `.tsx` for shared code
- Consistent interfaces across platforms

## Build and Deployment

### Development
- npm for package management
- Expo development server
- Hot reload support
- Platform-specific testing

### Production
- Expo build system
- Platform-specific optimizations
- Asset optimization
- Performance monitoring

## Technical Constraints

### Offline Support
- Must work without internet
- Local-first data operations
- Eventual consistency
- Background sync

### Performance Requirements
- < 3 second task entry
- Smooth animations
- Efficient data queries
- Minimal memory usage

### Security Considerations
- Client ID management
- Event log integrity
- Data encryption
- Authentication flow

## Dependencies

### Core Dependencies
```json
{
  "react-native": "Latest",
  "expo": "Latest",
  "typescript": "^5.0.0",
  "tinybase": "Latest",
  "@supabase/supabase-js": "Latest",
  "nativewind": "Latest",
  "@reusables/react-native": "Latest",
  "tailwindcss-animate": "Latest",
  "class-variance-authority": "Latest",
  "clsx": "Latest",
  "tailwind-merge": "Latest"
}
```

### Development Dependencies
```json
{
  "@types/react": "Latest",
  "@types/react-native": "Latest",
  "tailwindcss": "Latest",
  "typescript": "Latest"
}
```

## Testing Infrastructure

### Unit Testing
- Component testing
- Hook testing
- Utility testing
- Type checking

### Integration Testing
- Navigation flows
- Data operations
- Sync processes
- Error handling

### E2E Testing
- User flows
- Cross-platform behavior
- Performance metrics
- Offline capabilities

## Future Technical Considerations

### Planned Improvements
- Enhanced error logging
- Sync diagnostics
- Performance optimization
- Automated testing

### Never Planned
- Push notifications
- Complex form systems
- Third-party integrations
- Recurring task automation

This technical context serves as a comprehensive reference for development setup, technical decisions, and implementation guidelines in the Driftful project.
