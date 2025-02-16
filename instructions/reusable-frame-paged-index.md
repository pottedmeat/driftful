---
description: A reusable frame-based system for displaying and navigating between data windows. Covers the core components (Frame, PagedView, FrameView) and how they work together to provide consistent, swipable interfaces across different timeframes and collections.
globs: 
---
The Reusable Frame, PagedView, and Indexed View System

Driftful uses a reusable, frame-based system for displaying (and switching between) various "windows" of data in a consistent, horizontally-swipable interface. This system lets each top-level tab (Page, Week, Month, Year, Collections) show its own data through a frame-based navigation system.

This document explains the concepts behind the Frame, PagedView, IndexedView, and FrameView (and how they work together), so you can confidently create or modify screens across these different time or collection-based views.

1. Core Concepts

1.1 What Is a "Frame"?

A Frame is an interface representing one "slice" of data, such as a single page, a single week, a single month, but also the index of all frames by a specific type. Each Frame generally has:
	-	key (string): What type of window it wants to display (e.g., page, week, month, year, or collection)
    -	value (number | string | 'future'): Which frame window should be used (e.g. 12 for a page, for special pages, 661 for a month, 2025 for a year, or 'uxi342lk1' for a collection)

When the code references "frames," it's really talking about an array of these slice definitions—one for each time window or set of data you want to display.

1.2 PagedView

PagedView is a reusable component that:
	1.	Renders multiple frames side by side in a horizontally-swipable paged view.
	2.	Lets you provide manually move between frames by prev/next and window.
	3.	Accepts a few key props:
        •	frames: An array of frames to render as pages.
        •	frame: Which frame is currently active.
        •	onFrameChange: A callback for when the user navigates between frames.
        •	ref: Exposes goToNext(), goToPrevious(), and goToFrame() methods for programmatic navigation.

Internally, PagedView is implemented in two platform variations:
	•	PagedView.native.tsx uses react-native-pager-view on mobile or native devices.
	•	PagedView.web.tsx uses react-multi-carousel for a desktop-class web carousel.

By abstracting behind PagedView, your code can remain the same while the library picks the correct implementation for the user's platform.

1.3 IndexedView

IndexedView is a separate component that:
	1.	Displays a scrollable list of frames.
	2.	Lets users quickly browse and jump to any frame.
	3.	Accepts these props:
        •	frames: An array of frames to display in the list.
        •	frame: Which frame is currently active.
        •	onFrameChange: A callback for when the user selects a frame.

The IndexedView provides an alternative way to browse frames compared to the swipeable PagedView, showing multiple frames at once in a grid layout.

1.4 FrameView and Frame Navigation

The frame navigation system consists of two main parts:

1. FrameNavigationProvider:
   - Manages the active frame state and navigation logic
   - Initialized with an initial frame in the group layout
   - Provides frame data and navigation methods to child components

2. FrameView:
   - A presentational component that:
     - Manages toggling between PagedView and IndexedView modes
     - Renders the final UI with a consistent layout:
       • A top-level header (with title, view toggle, and prev/next buttons)
       • Either a swipable PagedView or grid-based IndexedView

## How These Pieces Work Together

Below is a simplified overview of how the code flows when a user visits something like the "Month" tab:

1. User taps "Month" tab → Renders MonthGroupLayout
2. MonthGroupLayout:
   - Determines the current frame based on the route (e.g., /month/661)
   - Initializes FrameNavigationProvider with the frame
   - Renders child routes within the provider

3. Child route (e.g., MonthScreen) renders FrameView which:
   - Connects to FrameNavigationProvider to access:
     • frames: Array of available frames with titles and data
     • frame: The currently active frame
     • onFrameChange: Navigation callback
   - Renders either PagedView or IndexedView based on the current mode

4. As the user navigates:
   - Swipes or clicks trigger onFrameChange
   - FrameNavigationProvider updates the active frame
   - UI updates automatically through the provider context

## Indexed View vs. Paged View

Rather than being modes within a single component, IndexedView and PagedView are separate components that FrameView switches between:
	•	PagedView: Shows a single frame at a time in a horizontally swipable carousel.
	•	IndexedView: Shows a scrollable list, letting users quickly browse and jump to any frame.