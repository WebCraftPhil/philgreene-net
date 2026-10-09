# Palette's Journal - Critical Learnings

## 2025-05-20 - Explicit Labeling and Visual Feedback on Website Checkup Page
**Learning:** Form controls in report gate forms and operational check sections require explicit `id` and `htmlFor` pairings to ensure accessibility for screen readers, and async submission buttons should include visual loading spinners (`LoaderCircle`) alongside text state changes for immediate visual feedback.
**Action:** Always verify `id` and `htmlFor` pairings on forms and add loading spinner icons to submit buttons during async states.

## 2026-10-09 - WAI-ARIA Semantics for Custom Progress and Score Bars
**Learning:** Custom progress elements (such as modal checkup step progress bars and category score bars) rendered with styled `div` elements require explicit `role="progressbar"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, and `aria-label` attributes for screen readers to recognize and announce them as progress indicators.
**Action:** When adding or modifying custom visual bar indicators, always include `role="progressbar"` and numeric range ARIA attributes.
