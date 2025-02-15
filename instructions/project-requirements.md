---
description: Comprehensive document that defines product vision, target audience, core features, technical requirements, and design guidelines for Driftful. Serves as the central reference for stakeholders to align on product goals and implementation details.
globs: 
---

# Project Requirements

This document provides a high-level summary of Driftful's product vision and essential features. For complete technical specifications, implementation details, and authoritative feature documentation, please refer to:
- Documentation on App Flow for detailed UI/UX workflows
- Documentation on Data Models for definitive data structure rules
- Documentation on Timeframe Transitions for authoritative migration logic
- Documentation on Database Synchronization for complete sync implementation

The sections below outline core product goals while deferring to specialized documentation for technical depth.

---

I want to build a mobile app for **minimalist scatterbrains and Bullet Journal enthusiasts** to **quickly track tasks, notes, and events**. The app emphasizes a simple, pen-and-paper–inspired approach to organizing items by day, week, month, year, or even custom collections. Unlike heavier task managers, Driftful cuts out unnecessary features, letting users capture and migrate tasks with minimal effort.

---

### **Project Name:**
**Driftful**

---

### **Target Audience:**
- Minimalists who dislike feature-heavy task apps
- Bullet Journal (BuJo) fans looking to digitize parts of their analog routine

---

### **Core Features:**
The following features represent the essential capabilities of Driftful. Each section references its authoritative technical documentation for complete implementation details.

1. **Fast Entry System**  
   - Create tasks, notes, and events with single-step input.
   - Specify timeframes or collections during creation without extra forms.
   See documentation on App Flow for the definitive guide to entry workflows.

2. **Flexible Organization**  
   - Place items in day, week, month, year timeframes or collections.
   - Assign events to specific days with optional visibility in broader timeframes.
   See documentation on Data Models for the complete and authoritative rules on timeframes and collections.

3. **Seamless Migration**  
   - Move tasks automatically during page creation and timeframe transitions.
   - Migrate items manually with single-tap actions and breadcrumb tracking.
   See documentation on Timeframe Transitions for the definitive specification of migration rules.

4. **Direct State Management**  
   - Toggle completion, significance (starring), and relevance states.
   - Edit and duplicate items through inline actions without dialogs.
   See documentation on App Flow for the authoritative guide to UI interactions.

5. **Event-Driven Sync**  
   - Store and modify data locally for offline usage.
   - Synchronize with cloud storage automatically when connected.
   See documentation on Database Synchronization for the complete and definitive implementation details.

6. **Distraction-Free Interface**  
   - Focus on essential features without recurring tasks or permissions.
   - Navigate through timeframes using bottom tabs and gestures.
   - Track item history through unobtrusive breadcrumbs.
   See documentation on Look and Feel for the authoritative UI/UX guidelines.

---

### **Tech Stack (Recommended Defaults):**
For complete technical specifications and implementation guidelines, see documentation on Backend and Frontend Architecture.
- **iOS, Android, and Web**  
  **Expo (React Native) using TypeScript**
  - React Native for native mobile development
  - TypeScript for type safety
  - Expo SDK for cross-platform compatibility
  - **Styling and UI Components:**
    - NativeWind for Tailwind CSS-like styling
      - All components must use Tailwind-style class names via NativeWind's className prop
      - Custom styles should be defined in the Tailwind config
      - Platform-specific styles should use NativeWind's select utility
    - NativeWindUI for cross-platform components
      - Provides consistent UI primitives across platforms
      - Components follow Tailwind styling patterns
      - For complex UI components that might benefit from NativeWindUI (or equivalent libraries), consultation with project owner is required before implementation with proposed options
  - TinyBase for local storage and offline-first functionality
  - ExpoSQLite persister on mobile, IndexedDB on web
- **Backend & Storage:**  
  **Supabase** for user data, auth, and offline synchronization
  - Event-sourced architecture for data synchronization

---

### **Design Preferences:**
Driftful's visual design embodies a digital interpretation of the bullet journal experience. For complete design specifications, including color palettes, typography, component patterns, and brand identity guidelines, see documentation on Look and Feel.

Key design principles:
- Notebook-inspired minimalism that emphasizes content over interface
- Calm, focused environment with generous whitespace
- Touch-optimized interface that feels natural on all devices

---