## 2025-05-20 - [Package Selection Button ARIA Labels]
**Learning:** In pricing/package grid components with identical action button text (e.g., "Ask about this package"), adding an `aria-label` starting with the visible button text and appending the package name (e.g. `Ask about this package: High-Converting Website`) satisfies WCAG 2.5.3 (Label in Name) while providing essential context for screen reader users browsing buttons out of context.
**Action:** Always include the package or item name in `aria-label` when repetitive action buttons appear across cards or list items.
