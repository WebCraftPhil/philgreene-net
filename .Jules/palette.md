## 2025-05-18 - Form inputs and progress indicators in modal checkup assistant
**Learning:** Modal wizard steps with descriptive hint text (`<small>`) and custom progress bars need explicit `aria-describedby` associations and `role="progressbar"` attributes to properly inform screen reader users of field context and step progression.
**Action:** Link hint text using `aria-describedby` and add full progressbar ARIA attributes (`aria-valuenow`, `aria-valuemin`, `aria-valuemax`, `aria-valuetext`) to progress containers in wizard components.
