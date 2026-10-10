# Palette's Journal - Critical Learnings

## 2025-05-20 - Explicit Labeling and Visual Feedback on Website Checkup Page
**Learning:** Form controls in report gate forms and operational check sections require explicit `id` and `htmlFor` pairings to ensure accessibility for screen readers, and async submission buttons should include visual loading spinners (`LoaderCircle`) alongside text state changes for immediate visual feedback.
**Action:** Always verify `id` and `htmlFor` pairings on forms and add loading spinner icons to submit buttons during async states.

## 2025-05-21 - Complete WAI-ARIA Attributes for Custom Progress Bars
**Learning:** Custom `<div>`-based progress and score indicator tracks in this app often omit WAI-ARIA attributes, preventing screen readers from perceiving step or score progress.
**Action:** Always complement custom progress elements with `role="progressbar"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, and descriptive `aria-valuetext` or `aria-label`.
