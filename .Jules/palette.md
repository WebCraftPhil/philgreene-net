## 2025-02-18 - Floating dialog trigger & form accessibility in custom widgets
**Learning:** Floating widget trigger buttons and custom form controls in multi-step wizard modals (like `GuidedLeadAssistant`) often lack direct form control pairing (`id`/`htmlFor`) and dialog state indicators (`aria-expanded`), preventing screen readers from properly announcing form field labels and modal expanded state.
**Action:** Always pair form controls explicitly with `htmlFor` and `id` attributes and provide `aria-expanded` and clear `aria-label` attributes on floating trigger buttons.
