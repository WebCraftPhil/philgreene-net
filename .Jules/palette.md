## 2025-05-22 - Explicit ARIA Context for Package Action Buttons and Floating Triggers
**Learning:** Generic action button text like "Ask about this package" or icon-heavy floating triggers lack specific accessible names for screen reader users and fail WCAG 2.5.3 (Label in Name) when repeated in card grids.
**Action:** Always include package/context names in `aria-label` attributes (e.g., `aria-label={`Ask about this package: ${item.name}`}`) and state descriptors (`aria-expanded={isOpen}`) on interactive trigger elements.
