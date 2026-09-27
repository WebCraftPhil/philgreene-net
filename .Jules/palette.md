## 2025-05-18 - Dialog Triggers and Explicit Form Control Pairing
**Learning:** Floating dialog triggers require explicit `aria-expanded` and descriptive `aria-label` attributes so screen readers convey state and intent. Form controls inside steps need explicit `id` and `htmlFor` pairings even when wrapped in `<label>` tags for consistent browser and assistive technology support.
**Action:** Always include explicit `aria-expanded={isOpen}`, descriptive `aria-label`, and `htmlFor`/`id` attributes on form fields in modal components.
