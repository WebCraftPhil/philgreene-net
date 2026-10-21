# Palette's Journal - Critical Learnings

## 2025-05-20 - Explicit Labeling and Visual Feedback on Website Checkup Page
**Learning:** Form controls in report gate forms and operational check sections require explicit `id` and `htmlFor` pairings to ensure accessibility for screen readers, and async submission buttons should include visual loading spinners (`LoaderCircle`) alongside text state changes for immediate visual feedback.
**Action:** Always verify `id` and `htmlFor` pairings on forms and add loading spinner icons to submit buttons during async states.

## 2025-05-22 - WAI-ARIA Attributes for Custom Progress Track Elements
**Learning:** Custom progress bar track elements (`<div>` styled with widths) in modal flows and score breakdowns require `role="progressbar"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, and `aria-label`/`aria-valuetext` to ensure screen readers communicate step progress and category values.
**Action:** Always include WAI-ARIA progressbar attributes when building custom progress bars or score tracks.
