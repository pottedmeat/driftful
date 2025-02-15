---
description: A reusable frame-based system for displaying and navigating between data windows. Covers the core components (Frame, PagedView, FrameView) and how they work together to provide consistent, swipable interfaces across different timeframes and collections.
globs: 
---
The Reusable Frame, PagedView, and Indexed View System

Driftful uses a reusable, frame-based system for displaying (and switching between) various "windows" of data in a consistent, horizontally-swipable interface. This system lets each top-level tab (Page, Week, Month, Year, Collections) show its own data by simply specifying a single key/value object known as a "Frame."

This document explains the concepts behind the Frame, PagedView, IndexedView,and FrameView (and how they work together), so you can confidently create or modify screens across these different time or collection-based views.

1. Core Concepts

1.1 What Is a "Frame"?

A Frame is an interface representing one "slice" of data, such as a single page, a single week, a single month, but also the index of all frames by a  specific type. Each Frame generally has:
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

1.4 FrameView

FrameView is a higher-level component that:
	1.	Manages toggling between PagedView and IndexedView modes.
	2.	Fetches / Filters the data for each frame (e.g. retrieving month #12 vs. month #1).
	3.	Builds the array of frames (with appropriate ID/window) for a given frame type (page, week, month, year, collection).
    4. Accepts these props:
        •	frameType: The type of frame to display (page, week, month, year, collection).
        •	frame: Which frame is currently active.
        •	onFrameChange: A callback for when the user selects a frame.
	4.	Renders the final UI with a consistent layout:
	    •	A top-level header (with title, view toggle, and prev/next buttons).
	    •	Either a swipable PagedView or grid-based IndexedView.

When a tab route or screen (e.g. MonthsScreen) wants to display all months in an indexed view, it simply renders:

export default function MonthsScreen() {
  return <FrameView frame={{month: 12}} />;
}

FrameView then:
	1.	Looks at frameType="month", calls useFrameContent({month: 12}) to figure out which month frames are relevant.
	2.	Manages the user's swipes or arrow clicks to set the current frame.
	3.	Fetches the data for that frame in the background.

Optionally, if you want a specific frame to open (like the year 2025 or a "future" page), you pass an initial window:

<FrameView frame={{year: 2025}} />
<FrameView frame={{page: 'future'}} />

## How These Pieces Work Together

Below is a simplified overview of how the code flows when a user visits something like the "Month" tab:
	1.	User taps "Month" tab → Renders MonthScreen.
    2.  MonthScreen finds the integer value of the current month.
	3.	MonthScreen returns `<FrameView frame={{month: 661}} />`.
	4.	FrameView calls `useFrameContent(activeFrame)`, which returns an object with:
    	-	frames: Builds and returns an array of frames for all months containing entries or breadcrumbs with the additional properties:
            -   title: The title to display when that frame is active
            -   entities (optional): For the active frame, two preceding and two following frames
    	-	frame (nullable): The frame indicating the active frame (null for the index view)
        -   onFrameChange: A callback for when the user selects a frame.
    4.	FrameView passes frames, frame, onFrameChange (as a destructured prop) to PagedView.
	5.	PagedView displays the frames in a horizontally swipable carousel (mobile) or multi-carousel (web). The user can:
	    •	Swipe left/right and click next/prev arrows in header which calls onFrameChange({month: 660}) or onFrameChange({month: 662})
	    •	Tap an the title in the header to toggle to the index view which calls onFrameChange(null)
	6.	As the user navigates from month to month:
	    •	`onFrameChange` triggers, updating the currentIndex → FrameView loads and displays new data for that month → UI updates automatically.

## Indexed View vs. Paged View

Rather than being modes within a single component, IndexedView and PagedView are separate components that FrameView switches between:
	•	PagedView: Shows a single frame at a time in a horizontally swipable carousel.
	•	IndexedView: Shows a scrollable list, letting users quickly browse and jump to any frame.