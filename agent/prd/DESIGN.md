---
name: MulaiKerja Visual Identity
colors:
  surface: '#f9f9ff'
  surface-dim: '#d3daef'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f3ff'
  surface-container: '#e9edff'
  surface-container-high: '#e1e8fd'
  surface-container-highest: '#dce2f7'
  on-surface: '#141b2b'
  on-surface-variant: '#434655'
  inverse-surface: '#293040'
  inverse-on-surface: '#edf0ff'
  outline: '#747686'
  outline-variant: '#c4c5d7'
  surface-tint: '#2151da'
  primary: '#0037b0'
  on-primary: '#ffffff'
  primary-container: '#1d4ed8'
  on-primary-container: '#cad3ff'
  inverse-primary: '#b7c4ff'
  secondary: '#0051d5'
  on-secondary: '#ffffff'
  secondary-container: '#316bf3'
  on-secondary-container: '#fefcff'
  tertiary: '#3e454c'
  on-tertiary: '#ffffff'
  tertiary-container: '#555d64'
  on-tertiary-container: '#ced6de'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dce1ff'
  primary-fixed-dim: '#b7c4ff'
  on-primary-fixed: '#001551'
  on-primary-fixed-variant: '#0039b5'
  secondary-fixed: '#dbe1ff'
  secondary-fixed-dim: '#b4c5ff'
  on-secondary-fixed: '#00174b'
  on-secondary-fixed-variant: '#003ea8'
  tertiary-fixed: '#dce3ec'
  tertiary-fixed-dim: '#c0c7d0'
  on-tertiary-fixed: '#151c23'
  on-tertiary-fixed-variant: '#40484f'
  background: '#f9f9ff'
  on-background: '#141b2b'
  surface-variant: '#dce2f7'
typography:
  headline-h1:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-h1-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-h2:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.3'
  headline-h3:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.4'
  body-regular:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  body-small:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caption:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: '1.4'
    letterSpacing: 0.01em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  gutter: 16px
  margin-mobile: 16px
  margin-desktop: auto
  max-width: 1200px
---

## Brand & Style
The design system is built to bridge the gap between professional recruitment and the industrial labor sector. It evokes a sense of reliability, efficiency, and structural integrity, mirroring the industries it serves: property and construction. 

The aesthetic is **Corporate Modern** with a strong leaning toward **Minimalism**. It prioritizes extreme legibility and high whitespace to ensure that users—often operating in high-pressure or outdoor environments—can navigate job listings and worker profiles without cognitive friction. The visual language is dependable and utilitarian, removing unnecessary decorative elements in favor of a clean, structured interface that communicates "work-ready" professionalism.

## Colors
The palette is rooted in "Industrial Blue," a color associated with trust and the blue-collar workforce. 

- **Primary & Accent:** The deep blue (#1D4ED8) provides an authoritative anchor, while the slightly brighter accent blue (#2563EB) is reserved for interactive elements like primary buttons and active states.
- **Supportive Tints:** A light primary wash (#EFF6FF) is used for subtle highlighting, badge backgrounds, and soft sectioning.
- **Neutrals:** High-contrast typography is handled by Gray-900 to ensure maximum readability. Backgrounds utilize a combination of pure white for the canvas and a very soft gray (#F9FAFB) for secondary containers and cards to create depth without using heavy shadows.

## Typography
This design system utilizes **Inter** exclusively to leverage its exceptional legibility and neutral, systematic tone. 

The type hierarchy is strictly defined to help users scan large amounts of data (job descriptions, salary figures, and location details). Headlines use tight letter spacing and bold weights to command attention, while body text maintains a generous line height (1.5) to prevent eye strain during long periods of reading. On mobile devices, the H1 scales down significantly to ensure headlines do not wrap awkwardly or dominate the viewport.

## Layout & Spacing
The layout follows a **Fixed Grid** model for desktop environments, centered with a maximum width of 1200px to keep content within a comfortable scanning range. On mobile, the system transitions to a fluid model with 16px side margins.

The spacing rhythm is based on an **8px linear scale**. This ensures consistency across padding, margins, and component heights. High whitespace is a functional requirement; it creates clear separation between job listings and prevents the interface from feeling "crowded," which is essential for a user base that may be accessing the platform on-site or on lower-resolution mobile devices.

## Elevation & Depth
This design system avoids heavy shadows and complex layering. Instead, it relies on **Tonal Layers** and **Low-Contrast Outlines** to communicate hierarchy.

- **Surface Levels:** The primary background is white. Secondary content, such as job cards or filter sidebars, sits on the Gray-50 (#F9FAFB) surface to provide subtle distinction.
- **Shadows:** A single, consistent elevation style is used for interactive components that float or need emphasis (like cards on hover). This shadow is highly diffused: `0px 1px 3px rgba(0, 0, 0, 0.1)`, providing just enough depth to indicate interactivity without breaking the minimal aesthetic.
- **Borders:** Structural separation is primarily achieved through 1px solid borders in Gray-200 (#E5E7EB), maintaining a "flat" but organized feel.

## Shapes
The shape language is "Soft-Square," reflecting the precision of the construction and property sectors. 

- **Cards & Containers:** Use a **0.5rem (8px)** radius to provide a modern, approachable feel while remaining structured.
- **Interactive Elements:** Buttons and input fields use a slightly tighter **0.375rem (6px)** radius. This subtle difference helps distinguish functional controls from static content containers.
- **Badges:** Success and warning badges may use a full pill-shape (999px) to contrast against the more rigid structural elements of the UI.

## Components
Consistent component behavior is vital for the target audience.

- **Buttons:** Primary buttons use the Accent Blue (#2563EB) with white text and 6px rounded corners. Secondary buttons should use a Gray-200 border with Gray-900 text.
- **Cards:** Job listings are housed in cards with a Gray-50 background, an 8px radius, and a 1px Gray-200 border. On hover, the subtle elevation shadow is applied.
- **Input Fields:** Search bars and form fields must have a 6px radius, a 1px Gray-200 border, and use the Body-Regular font size (16px) to prevent iOS auto-zoom issues.
- **Status Chips:** Use small, bold caps for status chips (e.g., "Full-time," "Hiring"). Backgrounds should be low-opacity versions of the status colors (Success/Warning) with high-contrast text.
- **Lists:** Job lists should have a minimum of 16px vertical padding between items to ensure easy tapping on mobile devices (touch-target compliance).