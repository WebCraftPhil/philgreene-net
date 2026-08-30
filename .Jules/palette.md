## 2025-05-18 - Modal Focus Trapping and Focus Restoration
**Learning:** Custom overlay dialogs (like `GuidedLeadAssistant`) must explicitly trap keyboard focus (`Tab`/`Shift+Tab`) within the modal container and restore focus to the trigger button when closed. Without this, screen readers and keyboard users tab into hidden background page elements behind the backdrop.
**Action:** Always attach keydown listeners in modal components to restrict tab navigation to internal focusable elements and refocus `triggerRef` on dismiss.
