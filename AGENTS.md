# AGENTS Guide

This document explains how automated agents (e.g., GitHub Copilot, OpenAI Codex, Anthropic Claude) and human contributors should work in this repository. Follow these practices whenever you modify the codebase, submit changes, or automate workflows.

---

## 1. Required Checks

- **Linting:** Run `npm run lint` after making any code changes and fix all issues before committing.
- **Build:** Run `npm run build` to ensure the Next.js project compiles without errors.
- **Testing:** Run `npm test` and ensure that all tests pass. Maintain or improve code coverage.
- **Dependency Security:** Run `npm audit` and address all critical vulnerabilities before merging.
- **Formatting:** Run `npm run format` (if available) or ensure code adheres to formatting rules (e.g., Prettier).

---

## 2. Project Structure

- `app/` – Next.js pages and layouts.
- `components/` – Reusable React components.
- `lib/` – Helper libraries and utilities.
- `hooks/` – Custom React hooks.
- `types/` – Shared TypeScript types.
- `public/` – Static assets (images, fonts, etc.).
- `tests/` – Test files and related utilities.
- `docs/` – Project documentation.
- `scripts/` – Utility scripts for setup, CI, or migration.
- `config/` – Configuration files (e.g., custom ESLint, Prettier, or other tool configs).

> **Note:** Place new files in the appropriate folder. If unsure, ask in a pull request or discussion.

---

## 3. Coding Conventions

- **Language:** Use TypeScript for all source files.
- **Style:** Adhere to ESLint rules in `.eslintrc.json` and formatting rules in `.prettierrc` (if present).
- **React:** Prefer functional components. Use descriptive and meaningful variable and function names.
- **Imports:** Use absolute imports where configured, otherwise prefer relative imports within the same domain.
- **Documentation:** Document complex functions and modules with JSDoc or code comments.
- **Type Safety:** Use explicit types; avoid `any` unless absolutely necessary and justified.
- **Testing:** Write tests for new features and significant changes (unit, integration, or E2E as appropriate).
- **Environment:** Do not commit secrets or credentials. Use `.env.example` to document required environment variables.

---

## 4. Dependency Management

- **Install:** Run `npm install` to ensure all dependencies are present.
- **Updates:** Use pull requests to update dependencies, referencing release notes or changelogs.
- **Security:** Address vulnerabilities reported by `npm audit` or GitHub Dependabot alerts.
- **Lockfile:** Commit changes to `package-lock.json` with dependency updates.

---

## 5. Testing

- **Local Testing:** Run `npm run dev` to start the development server and test changes locally.
- **Automated Tests:** Run `npm test` for unit/integration tests. Ensure all tests pass before pushing.
- **Coverage:** Maintain >80% code coverage. Improvements are encouraged.
- **End-to-End:** If E2E tests are present, run them as instructed in `docs/testing.md` or relevant documentation.

---

## 6. Pull Request Guidelines

- **Title:** Use a descriptive format, e.g., `[Feature] Add user authentication`.
- **Description:** Summarize the changes, reference related issues (e.g., `Closes #123`), and list any breaking changes.
- **Commits:** Use short, imperative commit messages. Separate unrelated changes into distinct commits.
- **Review:** Assign appropriate reviewers. All PRs should be reviewed by at least one human maintainer unless otherwise specified.
- **Checks:** Ensure all required status checks (lint, build, test, audit) pass before requesting review.

---

## 7. Verification Steps

- `npm run lint` – Lint the codebase.
- `npm run build` – Build the project for production.
- `npm test` – Run all automated tests.
- `npm audit` – Check for security vulnerabilities.
- `npm run format` (if available) – Enforce code formatting.

---

## 8. Documentation

- Update `README.md` and other documentation files as needed to reflect new features or changes.
- Add or update code comments for complex logic.
- Document public APIs, endpoints, or reusable components in `docs/` or inline.

---

## 9. Environment Variables

- List all required environment variables in `.env.example`.
- Never commit actual secrets or credentials.
- Document new environment variables added by your changes.

---

## 10. Branching Strategy

- **Default Branch:** Base changes on `main` unless otherwise instructed.
- **Feature Branches:** Name as `feature/short-description`.
- **Bugfix Branches:** Name as `bugfix/issue-description`.
- **Hotfixes:** Name as `hotfix/short-description`.
- Keep branches focused and up-to-date with `main` via regular merges or rebases.

---

## 11. Issue Management

- Reference issues in PRs with keywords (`Closes #`, `Fixes #`).
- Use clear, descriptive titles when creating issues.
- Label issues appropriately (e.g., `bug`, `enhancement`, `documentation`).
- Close issues via PRs or comment when resolved.

---

## 12. Subdirectory and File Scope

- Instructions in this file apply to the entire repository.
- Subdirectories may contain their own `AGENTS.md` files that override these rules for files within their scope.
- If conflicting guidelines exist, the most specific file (nearest in the directory tree) takes precedence.

---

## 13. Automation & CI/CD

- Ensure all required CI checks pass before merging.
- Configure new workflows in `.github/workflows/` as needed, following repository standards.
- Review CI/CD logs for failed jobs and address errors promptly.

---

## 14. Security & Compliance

- Do not commit secrets, credentials, or private keys.
- Use secret scanning and automated tools to detect accidental secret exposure.
- Follow secure coding practices and review security alerts regularly.

---

## 15. Contact & Support

- For questions or clarifications, open a discussion or issue.
- Tag or assign relevant maintainers or code owners as needed.
- Consult the `CONTRIBUTING.md` or `CODEOWNERS` file (if present) for more on contribution and review processes.

---

_Thank you for helping keep this project healthy and maintainable!_
