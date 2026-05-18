## Feature: Seeker Dashboard

### Context
Job seekers need a place to set their job preferences (categories, locations, salary) so they can receive notifications when matching jobs are posted.

### Scope
IN Scope:
- Seeker Dashboard Overview.
- Preferences Form (Categories, Locations, Job Types, Min Salary).

OUT of Scope:
- In-app notification center.
- Saving/bookmarking jobs.

### Design & UI Constraints
- Follow the `DESIGN.md` guidelines:
  - **Typography**: Inter font exclusively.
  - **Colors**: Primary blue (`#2563EB`), backgrounds white or soft gray (`#F9FAFB`), text high contrast.
  - **Shapes**: Buttons and Inputs (6px radius), Cards and Containers (8px radius).
  - **Borders & Shadows**: 1px solid border (`#E5E7EB`) for structure, subtle shadow on hover `0px 1px 3px rgba(0,0,0,0.1)`.
  - **Spacing**: 8px linear scale, minimum 16px padding between list items.

### Files to Modify
- None.

### Files to Create
- `app/(seeker)/dashboard/page.tsx` → Overview dashboard.
- `app/(seeker)/dashboard/preferences/page.tsx` → Preferences UI.
- `app/api/seeker/preferences/route.ts` → API for preferences.

### Implementation Steps
1. Create `app/api/seeker/preferences/route.ts` to handle GET (fetch current preferences) and PUT/POST (upsert preferences). Parse JSON fields correctly.
2. Create `app/(seeker)/dashboard/preferences/page.tsx` with a form for:
   - Checkboxes/Select for Categories.
   - Checkboxes/Select for Job Types.
   - Input for Locations.
   - Input for Min Salary.
3. On form submit, call the API to save data into `prisma.seekerPreferences`.
4. Create `app/(seeker)/dashboard/page.tsx` to show a basic welcome message and a summary of their current preferences, encouraging them to complete it if empty.

### Expected Behavior
- Seeker can view and update their preferences.
- Data is correctly saved as JSON in the database.

### What NOT to Touch
- Employer routes.
- Auth system.

### Definition of Done
- [ ] Preferences API correctly upserts data.
- [ ] Preferences form successfully loads and saves state.
