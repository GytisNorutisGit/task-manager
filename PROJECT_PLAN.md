# Project Plan — ADHD Task Manager

## Vision
A task manager built specifically for people with ADHD.
Simple, focused, and designed around how ADHD brains actually work —
reducing friction, limiting overwhelm, and rewarding progress.

---

## Design Principles
1. **Reduce cognitive load** — fewer choices, cleaner UI
2. **Friction-free capture** — it must be fast to add a task
3. **One thing at a time** — focus mode shows only what matters now
4. **Celebrate small wins** — dopamine rewards for completing tasks
5. **Forgiving, not punishing** — missed tasks don't feel catastrophic

---

## Architecture Overview

```
[ Angular Frontend ]  <-->  [ ASP.NET Core Web API ]  <-->  [ SQL Database ]
     (TypeScript)               (C#)                      (Entity Framework)
```

### Frontend (Angular)
- Communicates with the API via HTTP (REST)
- Manages what the user sees and interacts with
- Handles routing between pages/views

### Backend (ASP.NET Core)
- Receives requests from the frontend
- Contains business logic
- Reads/writes to the database

### Database
- Stores tasks, users, categories etc.
- Accessed through Entity Framework Core (an ORM — maps C# objects to database tables)

---

## Folder Structure (Planned)

```
task-manager/
├── frontend/               # Angular app
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/       # Services, guards, interceptors
│   │   │   ├── features/   # Feature modules (tasks, focus-mode, etc.)
│   │   │   ├── shared/     # Reusable components, pipes, directives
│   │   │   └── models/     # TypeScript interfaces/types
│   │   └── environments/
│   └── ...
│
├── backend/                # ASP.NET Core Web API
│   ├── Controllers/        # API endpoints
│   ├── Models/             # Database entity classes
│   ├── DTOs/               # Data Transfer Objects
│   ├── Services/           # Business logic
│   ├── Repositories/       # Data access layer
│   └── Data/               # DbContext, migrations
│
├── AI_INSTRUCTIONS.md      # How AI should assist on this project
└── PROJECT_PLAN.md         # This file
```

---

## Data Models (Initial Design)

### Task
| Field | Type | Notes |
|---|---|---|
| Id | int | Primary key |
| Title | string | Required |
| Description | string | Optional |
| IsCompleted | bool | Default: false |
| Priority | enum | Low / Medium / High |
| DueDate | DateTime? | Optional |
| EstimatedMinutes | int? | Time blindness helper |
| CreatedAt | DateTime | Auto-set |
| UserId | string | Foreign key (Phase 4) |

### Focus Session *(Phase 3)*
| Field | Type | Notes |
|---|---|---|
| Id | int | Primary key |
| TaskId | int | Foreign key |
| StartedAt | DateTime | |
| CompletedAt | DateTime? | |

---

## API Endpoints (Planned)

### Tasks
| Method | Endpoint | Description |
|---|---|---|
| GET | /api/tasks | Get all tasks |
| GET | /api/tasks/{id} | Get a single task |
| POST | /api/tasks | Create a task |
| PUT | /api/tasks/{id} | Update a task |
| PATCH | /api/tasks/{id}/complete | Mark complete |
| DELETE | /api/tasks/{id} | Delete a task |

---

## UI Pages / Routes (Planned)

| Route | Page | Description |
|---|---|---|
| / | Dashboard | Overview, today's tasks |
| /tasks | Task List | All tasks, filterable |
| /brain-dump | Brain Dump | Quick capture mode |
| /focus | Focus Mode | Single task view |
| /settings | Settings | User preferences |

---

## Learning Milestones

Track your progress here as you complete each milestone:

- [ ] **M1:** Angular project created and running locally
- [ ] **M2:** Understand components, modules, and data binding
- [ ] **M3:** ASP.NET Core API project created and running locally
- [ ] **M4:** Understand controllers, routing, and HTTP verbs
- [ ] **M5:** Angular calls API and displays real data
- [ ] **M6:** Create, complete, and delete tasks end-to-end
- [ ] **M7:** Implement ADHD-specific features (focus mode, brain dump)
- [ ] **M8:** Add user authentication
- [ ] **M9:** App deployed and accessible online

---

## Key Concepts to Learn (by Phase)

### Phase 1 — Foundation
- Angular CLI and project structure
- TypeScript basics (types, interfaces, classes)
- Angular components and templates
- C# basics (classes, methods, properties)
- ASP.NET Core project structure
- What is REST and HTTP?

### Phase 2 — Core Features
- Angular services and dependency injection
- HttpClient (calling APIs from Angular)
- Angular routing
- Reactive forms
- Entity Framework Core (migrations, DbContext)
- Repository pattern
- DTOs and why they matter

### Phase 3 — Intermediate
- RxJS observables (how Angular handles async data)
- Angular animations
- Component communication (@Input/@Output)
- C# LINQ queries
- SQL basics

### Phase 4 — Advanced
- Authentication & JWT tokens
- Angular route guards
- ASP.NET Identity
- Deployment (Azure or similar)

---

## Tech Decisions Log

| Decision | Choice | Reason | Date |
|---|---|---|---|
| UI Library | Angular Material | Pre-built components, great for beginners, good accessibility | Jul 2026 |
| Database | SQL Server Express | Free, pairs naturally with ASP.NET Core / EF Core | Jul 2026 |
| Auth | ASP.NET Identity | Built-in, well-documented | Jul 2026 |
