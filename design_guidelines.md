# Design Guidelines: Community Problem Reporting Platform

## Design Approach & Philosophy

**Selected Approach:** Civic-Tech Design System  
**Reference Inspiration:** SeeClickFix, FixMyStreet, and modern municipal platforms  
**Core Principle:** Build trust through clarity, accessibility, and visual hierarchy that prioritizes action over decoration

This application serves both mobile citizens reporting issues and desktop administrators managing them. The design balances approachability for diverse users with the efficiency needed for municipal workflows.

## Color Palette

**Light Mode:**
- Primary: 220 85% 45% (Trustworthy civic blue)
- Primary Hover: 220 85% 38%
- Secondary: 140 60% 45% (Success/resolution green)
- Background: 220 20% 98%
- Surface: 0 0% 100%
- Text Primary: 220 15% 20%
- Text Secondary: 220 10% 45%

**Dark Mode:**
- Primary: 220 80% 55%
- Primary Hover: 220 80% 62%
- Secondary: 140 55% 50%
- Background: 220 15% 12%
- Surface: 220 12% 16%
- Text Primary: 220 10% 95%
- Text Secondary: 220 8% 70%

**Status Colors (Light/Dark):**
- Pending: 40 95% 55% / 40 90% 60% (Amber warning)
- In Progress: 220 85% 55% / 220 80% 60% (Active blue)
- Resolved: 140 60% 45% / 140 55% 50% (Success green)

**Accent (Sparingly):**
- Error/Urgent: 0 75% 55% / 0 70% 60% (Alert red)

## Typography

**Font Stack:**
- Primary: 'Inter' (via Google Fonts CDN)
- Monospace: 'JetBrains Mono' (for timestamps, coordinates)

**Scale:**
- Hero Heading: text-5xl md:text-6xl font-bold (mobile reporting hero)
- Section Heading: text-3xl md:text-4xl font-bold
- Card Title: text-xl font-semibold
- Body: text-base leading-relaxed
- Caption/Meta: text-sm text-secondary
- Button Text: text-sm md:text-base font-medium

## Layout System

**Spacing Primitives:** Standardize on Tailwind units of **2, 4, 6, 8, 12** (e.g., p-4, gap-6, mb-8, py-12)

**Containers:**
- Full-width: w-full with inner max-w-7xl mx-auto px-4
- Dashboard: max-w-7xl (wide for data tables)
- Forms: max-w-2xl (focused submission)
- Cards: Consistent p-6 with rounded-xl

**Grid Systems:**
- Problem Cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
- Dashboard Table: Full-width responsive table with sticky headers
- Map + Form Split: lg:grid-cols-2 (50/50 on desktop, stacked mobile)

## Component Library

### Navigation
- **User Header:** Logo left, "Report Problem" CTA right, mobile hamburger
- **Admin Dashboard Nav:** Sidebar (desktop) / bottom tabs (mobile) with icon labels for Reports, Map View, Analytics, Settings
- Status filter pills with active state indicators

### Core UI Elements

**Problem Submission Flow:**
1. Hero section with background image of community, centered CTA "Report a Problem"
2. Photo upload card: Large drag-drop zone, camera icon, mobile camera access button
3. Location selector: Interactive Leaflet map embed, "Use My Location" button with GPS icon, manual pin placement
4. Form fields: Title (text-lg input), Description (textarea with character count), auto-populated timestamp display
5. Submit button: Full-width, primary color, with loading state

**Admin Dashboard:**
- Data table with alternating row colors, sortable columns (Title, Location, Status, Date)
- Inline status dropdown for each row (color-coded pills)
- Bulk action toolbar (appears on row selection)
- Export button (top right) with CSV/PDF options
- Real-time update indicator

**Problem Cards (Public/Admin Views):**
- Image thumbnail (aspect-square, rounded-lg, object-cover)
- Status badge (top-right corner of image)
- Title (text-lg font-semibold, truncate)
- Location with map pin icon + truncated address
- Timestamp with clock icon (relative time: "2 hours ago")
- Description preview (2 lines, text-ellipsis)
- Hover: Subtle shadow-lg transition

### Interactive Elements

**Map Integration:**
- Leaflet.js with OpenStreetMap tiles
- Custom marker colors by status (pending=amber, in-progress=blue, resolved=green)
- Marker clusters for dense areas
- Info popup on marker click: thumbnail + title + status + "View Details" link
- Zoom controls, current location button

**Status Workflow Visualization:**
- Progress stepper: Pending → In Progress → Resolved
- Color-coded circles with connecting lines
- Current status highlighted, future steps grayed
- Status change triggers subtle success toast notification

**Search & Filters:**
- Global search bar (top of dashboard): placeholder "Search by title, location..."
- Filter dropdowns: Status (multi-select), Date range picker, Location radius slider
- Active filter chips below search with X to remove
- "Clear All Filters" link

### Forms & Inputs
- Floating labels for all text inputs
- File upload with image preview grid (thumbnail + remove X)
- Date/time picker: Auto-populated but editable
- Validation: Inline error messages (text-sm text-error below input)
- Required field indicators (red asterisk)

### Data Displays
- Statistics cards: Large number (text-4xl), label below, icon left, background gradient
- Timeline view: Vertical line with status changes, timestamps, admin notes
- Export modal: Format selection, date range, checkbox for "Include images"

### Overlays & Modals
- Problem detail modal: Full-screen on mobile, centered lg:max-w-4xl on desktop
- Image lightbox: Dark backdrop, centered image, prev/next arrows, close X
- Confirmation dialogs: Centered, with icon, clear action buttons
- Toast notifications: Top-right, slide-in animation, auto-dismiss

### Mobile Optimizations
- Bottom action bar for report submission (sticky)
- Swipeable problem cards
- Thumb-friendly tap targets (min-h-12)
- Camera-first photo capture on mobile
- Collapsed filters (drawer menu)

## Images

**Hero Section (User Landing):**
- Large hero image (h-96 md:h-[500px]): Community scene—people fixing neighborhood issues, clean streets, or town hall (conveys civic engagement)
- Dark gradient overlay (from-black/60 to-transparent) for text readability
- Centered white text overlay with CTA button (outline variant with backdrop-blur-sm bg-white/10)

**Problem Photos:**
- User-submitted: Display actual issue photos (potholes, graffiti, broken infrastructure)
- Aspect ratio: Square for thumbnails, original aspect for detail view
- Placeholder: Gray background with camera icon for "No image" states

**Dashboard Background:**
- Subtle: Light geometric pattern (opacity-5) or solid color
- Focus on data, not decorative imagery

## Animations

Use animations extremely sparingly:
- Status change: Smooth color transition (duration-300)
- Card hover: Subtle lift (hover:shadow-lg transition-shadow)
- Map marker pulse: Gentle scale on new problem (animate-pulse, stops after 2s)
- Loading states: Spinner only, no elaborate animations
- Avoid: Scroll animations, parallax, unnecessary motion

## Accessibility & Consistency

- Dark mode: Consistent across all views (no bright white popups in dark UI)
- ARIA labels on all interactive elements (map controls, status buttons)
- Keyboard navigation: Tab order follows visual flow, focus indicators (ring-2 ring-primary)
- Color contrast: WCAG AA compliant (verified for status indicators)
- Form inputs: Maintain dark backgrounds in dark mode (bg-surface, not bright white)
- Screen reader: Status changes announced, image alt text required

---

**Design Philosophy Summary:** This civic platform prioritizes trust, clarity, and action. Clean typography, generous spacing (py-8, py-12), and a restrained color palette (primarily blue/green) build confidence. The mobile reporting flow is frictionless (3 taps: photo → location → submit), while the admin dashboard provides powerful filtering without complexity. Every design choice serves the goal: connecting citizens with solutions, efficiently.