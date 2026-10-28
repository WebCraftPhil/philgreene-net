# Palette's Journal - Critical Learnings

## 2025-05-20 - Explicit Labeling and Visual Feedback on Website Checkup Page
**Learning:** Form controls in report gate forms and operational check sections require explicit `id` and `htmlFor` pairings to ensure accessibility for screen readers, and async submission buttons should include visual loading spinners (`LoaderCircle`) alongside text state changes for immediate visual feedback.
**Action:** Always verify `id` and `htmlFor` pairings on forms and add loading spinner icons to submit buttons during async states.

## 2025-05-21 - WAI-ARIA Attributes on Custom Progress Bar Elements
**Learning:** Custom progress bar elements (e.g., step indicators and score breakdown tracks) require explicit `role="progressbar"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, and `aria-valuetext` attributes so screen readers announce numeric progress and range context rather than treating them as generic unannounced divs.
**Action:** Always include WAI-ARIA progressbar attributes (`role="progressbar"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, `aria-valuetext`) on custom progress bar divs.
