## 2025-09-13 - Accessible Triggers & Package Action Context
**Learning:** Floating trigger buttons and repeated package choice buttons need explicit ARIA state (`aria-expanded`) and descriptive labels (`aria-label`) that start with the visible button text to satisfy WCAG 2.5.3 (Label in Name) and give screen reader users clear context.
**Action:** Always include `aria-expanded` on popup/dialog triggers and prefix package button `aria-label` with the visible button text.
