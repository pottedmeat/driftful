---
description: Describe the front end architecture details
globs: 
---
# Introduction

Driftful is a mobile-first web app built to serve minimalist users and Bullet Journal enthusiasts looking for a quick digital solution to track tasks, notes, and events. The frontend is the face of the app, where users interact with a clean, simple interface inspired by the feel of a physical notebook. It is designed to make rapid entry easy and to support a fluid experience across multiple time-based views like Day, Week, Month, and Year, as well as Collections. This document explains the frontend architecture, design principles, and technologies in everyday language so that anyone can understand how Driftful's frontend works.

# Frontend Architecture

## Tech Stack

### Core Technologies
- React Native with Expo for cross-platform compatibility
- TypeScript for type safety and improved development experience
- Expo SDK for simplified deployment and native features

### Development Tools
- Cursor as the recommended IDE
  - Provides real-time suggestions
  - AI-powered coding standards
  - Integrated documentation
- Git workflow
  - Main branch for production releases
  - Dev branch for active development
  - Feature branches for specific implementations
- npm for package management

### AI Integration
- Lovable for AI-driven front-end generation
  - Ensures adherence to design system
  - Maintains consistent notebook-style design
  - Assists with component generation
- Integration with Cursor's AI capabilities
  - Code completion
  - Documentation generation
  - Refactoring assistance

## Architecture Overview

### Component Structure
- Atomic design principles
- Reusable UI components
- Clear component hierarchy
- Consistent naming conventions

### State Management
- Local component state where appropriate
- Global state for app-wide data
- Event-sourced architecture
- Offline-first data handling

### Styling Approach
- Mobile-first responsive design
- Consistent spacing system
- Theme-based styling
- Platform-specific adaptations

### Performance Optimization
- Code splitting
- Lazy loading
- Asset optimization
- Performance monitoring

## Development Guidelines

### Code Standards
- TypeScript strict mode
- ESLint configuration
- Prettier formatting
- Documentation requirements

### Testing Requirements
- Unit tests for components
- Integration tests for features
- E2E tests for critical flows
- Performance benchmarks

### Build Process
- Development builds
- Staging environment
- Production deployment
- Version management

### Documentation
- Component documentation
- API documentation
- Style guide
- Development setup guide

# Design Principles

Driftful's design is guided by a commitment to simplicity, accessibility, and responsiveness. The app offers a minimal interface so that users are not overwhelmed, echoing the simplicity found in traditional Bullet Journals. Design choices emphasize clear typography, large buttons for easy tapping, and a soft color palette that gives the app a calm and approachable look. Every design decision, from the placement of elements on the screen to the quick tap actions for toggling task states, is made with the goal of reducing friction for the user. By balancing functionality with ease of use, the design ensures that users can capture their thoughts quickly and navigate the app with minimal effort.

# Styling and Theming

The styling approach in Driftful maintains a consistent look and feel across the entire application. The design uses a notebook-style aesthetic with soft colors and clear icons to convey a sense of simplicity and calmness. Although specific methodologies are not rigidly enforced, the frontend code follows best practices in styling that ensure components look uniform no matter where they appear. The theming system helps guarantee that changes in color palettes or typography are applied consistently across all screens and components. This uniformity supports a coherent user experience that feels both deliberate and connected, reinforcing the app's minimalist approach.

# Component Structure

The frontend is built around a component-based architecture where each piece of the interface is modular and reusable. Components are organized by feature and functionality, making the code easier to maintain and extend. For instance, there are distinct components for rapid task entry, calendar views, and migration buttons. This structure means that when a change is needed for one piece of functionality, developers can update a single component rather than reworking the entire UI. The focus on component reusability not only speeds up development but also ensures that the look and feel of the app remain consistent throughout every interaction.

# State Management

Managing the state in Driftful is all about keeping the user experience smooth and responsive. The application relies on a centralized state management approach using React's built-in capabilities and context to share information between components. This ensures that when a user creates a task or migrates an incomplete one to a higher timeframe, every relevant part of the interface updates in real time. The chosen approach avoids complexity while maintaining the clarity needed for an offline-first design, so that data is always consistent across different parts of the app, even when synchronizing with the backend later on.

# Routing and Navigation

The app uses a clear and intuitive routing system that lets users effortlessly navigate between different views. Whether a user is in the  view or wants to check out the Month or Year view, the navigation is designed to feel natural and direct. The routing is managed using libraries tailored for mobile navigation along with web-friendly routing techniques. Users can easily jump between different timeframes and collections using a top or side menu, with pickers that help them drill down into more detailed views. This structured yet flexible navigation system is designed to support rapid access to the different facets of the app without overwhelming the user with options.

# Performance Optimization

Every part of Driftful's frontend is optimized to perform quickly and reliably. Strategies like lazy loading and code splitting are used to ensure that only the necessary parts of the app are loaded at any given moment, reducing wait times and ensuring smooth transitions between views. The offline-first design approach means that data is stored locally and synchronized with the cloud when possible, which minimizes load times and ensures that users can continue to work even with spotty internet connections. These performance optimizations combine to create a seamless experience that remains responsive and fluid, reinforcing the minimalist and efficient spirit of the app.

# Testing and Quality Assurance

Quality is a cornerstone of Driftful's frontend development. The project incorporates multiple layers of testing, including unit tests to ensure that individual pieces work correctly, integration tests to verify that components work together as expected, and end-to-end tests to simulate real user interactions. Developers use modern testing tools and frameworks to catch issues early and maintain a high standard of code quality. This rigorous testing process ensures that the frontend remains reliable, intuitive, and free of bugs, contributing to an overall polished user experience.

# Sync Status Indicator

The frontend features a visible sync status indicator that keeps users informed about the synchronization state of their data with the backend. This indicator appears consistently across all views, typically in a non-intrusive corner of the interface, and uses clear visual cues to represent different sync states:

- A completed checkmark or similar icon indicates that all data is up to date
- An animated icon shows when synchronization is in progress
- A warning indicator appears if there are sync issues that need attention

The sync indicator is designed to be subtle yet informative, aligning with the app's minimalist aesthetic while ensuring users always know the status of their data. This feature is particularly important for the offline-first architecture, as it helps users understand when their changes have been successfully backed up to the cloud.

# Conclusion and Overall Frontend Summary

In summary, the frontend of Driftful is designed with clarity and simplicity at its core. It leverages modern technologies like React Native, Expo, and TypeScript to create a responsive, scalable, and maintainable platform that feels as natural as writing in a notebook. Every aspect, from the minimal interface and consistent theming to the structured component architecture and robust state management system, has been carefully crafted to support a fast and fluid user experience. The result is an application that stands out for its focus on essential interactions, making task management quick, intuitive, and beautifully simple for digital minimalists and Bullet Journal enthusiasts alike.
