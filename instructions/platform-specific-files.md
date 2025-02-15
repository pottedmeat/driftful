# Platform-Specific File Pattern

React Native provides a powerful pattern for handling platform-specific code through file extensions. This pattern allows you to write platform-specific implementations while maintaining a clean, maintainable codebase.

## File Naming Convention

For any component or module that requires platform-specific implementation:

1. Create three files:
   - `ComponentName.tsx` - The fallback implementation
   - `ComponentName.native.tsx` - The mobile implementation
   - `ComponentName.web.tsx` - The web implementation

## Implementation Guidelines

### 1. Fallback Version (`ComponentName.tsx`)

The fallback version should:
- Provide a no-op (no-operation) implementation
- Export the same interface as platform-specific versions
- Be as minimal as possible
- Never throw errors or warnings

Example:
```typescript
export const PlatformSpecificFeature = {
  initialize: () => {},
  performAction: () => {},
  cleanup: () => {},
};
```

### 2. Platform-Specific Versions

Create full implementations in the platform-specific files:

```typescript
// ComponentName.native.tsx
export const PlatformSpecificFeature = {
  initialize: () => {
    // Mobile-specific initialization
  },
  performAction: () => {
    // Mobile-specific action
  },
  cleanup: () => {
    // Mobile-specific cleanup
  },
};

// ComponentName.web.tsx
export const PlatformSpecificFeature = {
  initialize: () => {
    // Web-specific initialization
  },
  performAction: () => {
    // Web-specific action
  },
  cleanup: () => {
    // Web-specific cleanup
  },
};
```

## Important Rules

1. **No Platform Selection File**
   - Do NOT create a file that imports and chooses between implementations
   - React Native's bundler handles the selection automatically
   - Creating a selector file breaks the platform siloing

2. **Consistent Interfaces**
   - All versions must export identical interfaces
   - Use TypeScript interfaces to enforce consistency
   - Platform-specific implementations can differ internally

3. **Import Pattern**
   ```typescript
   // Always import from the base path
   import { PlatformSpecificFeature } from './PlatformSpecificFeature';
   ```

## Best Practices

1. Keep platform-specific code minimal
2. Share common logic in separate utility files
3. Use TypeScript interfaces to define shared contracts
4. Document platform-specific behaviors in each file
5. Maintain feature parity where possible

## Example Structure

```
src/
  components/
    MyFeature/
      index.tsx           // Fallback implementation
      index.native.tsx    // Mobile implementation
      index.web.tsx       // Web implementation
      types.ts           // Shared TypeScript interfaces
```

The React Native bundler will automatically select the correct implementation based on the platform, falling back to the base implementation if no platform-specific version exists. 