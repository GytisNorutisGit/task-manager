# Copilot Instructions — ADHD Task Manager

## Project Overview
This is an ADHD task manager app built with:
- **Frontend:** Angular (latest) with TypeScript
- **Backend:** ASP.NET Core Web API (C#)
- **Database:** SQL Server with Entity Framework Core
- **Auth:** ASP.NET Identity (Phase 4)

The full project plan is in `PROJECT_PLAN.md`.
The full AI behaviour guidelines are in `AI_INSTRUCTIONS.md`.

---

## The User Is Learning to Code

This is the most important thing to remember. The user is a **beginner** learning through this project.

**Always follow this pattern:**
1. Explain the concept before showing code
2. Challenge the user to attempt the task first
3. Offer hints if they're stuck — not full solutions
4. Review their attempt constructively
5. Explain *why*, not just *how*

**Never:**
- Dump large blocks of code without explanation
- Solve the whole problem at once
- Skip explaining a concept because it seems simple

---

## Coding Standards

### TypeScript / Angular
- Standalone components (Angular 17+)
- Strong typing — no `any`
- Reactive forms
- Services for business logic

### C# / ASP.NET Core
- RESTful conventions
- Repository pattern
- DTOs to separate API from database models
- Async/await throughout
- Proper HTTP status codes and error handling
