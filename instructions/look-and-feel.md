# Driftful Look & Feel Guide

## Design Philosophy

Driftful embodies a **minimalist, notebook-inspired digital experience** that prioritizes content over chrome. Our design approach combines the simplicity of analog bullet journaling with the power of digital organization, creating a calm, focused environment for capturing thoughts and tasks.

## App Icon
> The primary brand identifier that represents Driftful across all platforms and contexts.

- **Core Design**: An open journal with flowing river design
  - Represented by an open notebook viewed from a slight angle, where the pages form curved riverbanks
  - A gentle, winding river flows through the center seam from top to bottom
  - Minimal line-style design consistent with the app's visual language
  - Clean, thin outlines make the journal silhouette instantly recognizable

- **Key Elements**:
  - Open journal with subtle perspective for depth
  - Curved riverbanks formed by the journal pages
  - Soft, flowing line representing the river's path
  - Optional faint dots suggesting bullet journal grid
  - Negative space around the river accentuates motion

- **Style Guidelines**:
  - Use minimal line weights matching other system icons
  - River line can use a tranquil accent color (soft blue)
  - Maintain simplicity for clear recognition at small sizes
  - Ensure adequate padding for various platform requirements
  - Support both light and dark mode variants

## Core Visual Elements

### 1. Layout & Spacing

- **Clean, Minimal Layout**
  - Vertical rhythm with consistent spacing
  - Clear visual hierarchy through spacing
  - Mobile-first design with optimized touch targets

- **Interface Elements**
  - Simple rectangular containers for all interactive elements
  - Clean white backgrounds for clarity
  - Desktop hover states:
    - Subtle brightness adjustment
    - Smooth transition (150-200ms)

- **Background Treatment**
  - Solid white backgrounds for input fields and overlays
  - Clean, minimal appearance that maintains visual hierarchy
  - Clear contrast between interactive and static elements

### 2. Color System

- **Base Colors**
  - Grays
  - Soft, muted secondary colors

- **Three-Tone Monochromatic System**
  - Darkest: Background layer
  - Medium: Foreground group elements
  - Lightest: Active/selected elements
  - Text contrast follows prominence:
    - Group items: Darker/less prominent text
    - Active items: Brighter/more prominent text
    - Text color intensity varies based on background chroma

- **Navigation & Icon Colors**
  - Primary navigation (view tabs): Grayscale only with soft, muted accent color text
  - Interactive iconography (slide-out editing controls, breadcrumbs): Soft, muted accent colors with grayscale text
  - Maintain consistent color application across similar interaction patterns

### 3. Typography

- **Font Choice**
  - Clean, modern sans-serif
  - Slightly rounded edges for friendliness
  - Recommended: Inter, Nunito, or similar Google Fonts
  - Consistent weights: Regular (400), Medium (500), Semibold (600)

- **Text Hierarchy**
  - Clear size differentiation between levels
  - Minimal use of different weights
  - Limited text styles to maintain simplicity

### 4. Interactive Elements

- **Buttons & Controls**
  - Clean rectangular shape
  - Subtle hover states with minimal color shifts
  - Clear active/pressed states
  - Consistent touch targets (minimum 44x44px on mobile)

- **Input Fields**
  - Clean white background
  - Simple rectangular appearance
  - Gentle focus states
  - Clear placeholder text in secondary gray
  - Mobile Permanent Input:
    - Solid white background
    - Clean rectangular input field
    - Matching white icon container
    - No borders on input field or icon container
    - Simple, integrated appearance

- **Icons**
  - Simple, line-style icons
  - Consistent stroke weight
  - Clear meaning without labels (where possible)
  - Optional tooltips on desktop hover

### 5. Animation & Transitions

- **Subtle Motion**
  - Short duration (150-300ms)
  - Smooth easing functions
  - Purposeful transitions that aid understanding
  - No unnecessary animation

- **Key Interactions**
  - Gentle expand/collapse for panels
  - Smooth page transitions
  - Soft fade for modal overlays
  - Subtle feedback for user actions

## Component Patterns

### 1. Navigation

- **Bottom Tab Bar**
  - Floating pill-shaped container
  - Full-width on mobile, centered with auto-width on desktop
  - Minimal margins from screen edges
  - Medium-dark gray background
  - Active tab:
    - Medium-dark gray background
    - Bright white text
  - Inactive tabs:
    - Light gray text
  - Clear active state
  - Consistent spacing

- **Title Headers**
  - Clean, centered text
  - Tappable for navigation
  - Minimal ornamentation

### 2. Lists & Cards

- **Item Cards**
  - Fully rounded corners
  - Subtle shadows
  - Clear tap targets
  - Consistent internal spacing

- **Action Rows**
  - Floating appearance
  - Icon-based actions
  - Clear visual grouping
  - Smooth expansion/collapse

### 3. Modals & Overlays

- **Creation Modal**
  - Floating card design
  - Clear focus on input
  - Organized control row
  - Smooth entrance/exit

- **Pickers**
  - Grid-based layout
  - Clear key-value structure
  - Horizontal scrolling where needed
  - Subtle indicators for more content

## Implementation Guidelines

### 1. Responsive Design

- **Mobile First**
  - Optimized touch targets
  - Vertical scrolling priority
  - Bottom sheet patterns
  - Keyboard-aware layouts

- **Desktop Enhancements**
  - Hover states
  - Tooltip hints
  - Keyboard shortcuts
  - Expanded layouts where appropriate

### 2. Accessibility

- **Visual Design**
  - Sufficient color contrast
  - Clear focus indicators
  - Consistent interactive patterns
  - Readable text sizes

- **Interaction Support**
  - Keyboard navigation
  - Screen reader compatibility
  - Clear ARIA labels
  - Touch/click alternatives

## Brand Expression

While Driftful doesn't have formal brand guidelines, our visual identity should consistently express:

- **Calm & Focus**: Through generous white space and soft colors
- **Digital Notebook**: Via subtle paper-like textures and clean typography
- **Minimalist Efficiency**: Through clear hierarchy and purposeful design
- **Friendly Accessibility**: Via rounded shapes and gentle interactions

The overall aesthetic should feel like a modern, digital interpretation of a beloved notebook—clean and efficient, but with a warm, personal touch that makes it inviting for daily use. 