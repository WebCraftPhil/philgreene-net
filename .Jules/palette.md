## 2026-03-31 - Trigger buttons with hidden responsive text need explicit ARIA labels
**Learning:** Fixed floating trigger buttons (like `GuidedLeadAssistant.tsx`) hide description text (`<small>`) on mobile or narrow viewports, leaving visual text short. Adding explicit `aria-label` and `aria-expanded` attributes ensures screen reader context and popover state are communicated consistently across device sizes.
**Action:** Always include explicit `aria-label` and `aria-expanded` attributes on fixed or floating overlay triggers that toggle modal dialogs.
