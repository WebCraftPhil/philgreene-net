## 2026-09-20 - Visual feedback on copy actions
**Learning:** Providing temporary visual feedback (switching icon and label for 2s) on copy-to-clipboard buttons reassures users immediately that the action succeeded without relying solely on screen messages.
**Action:** Always complement clipboard API calls with transient state changes (`isCopied`) and distinct icons (`<ClipboardCheck />`).
