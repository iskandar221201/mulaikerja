## Feature: Employer Dashboard

### Context
Employers need a dashboard to manage their company profile and post/edit job listings.

### Scope
IN Scope:
- Employer Profile Management (Create/Update).
- Job Listing CRUD (Create, Read, Update, Soft Delete).

OUT of Scope:
- Analytics or view counters (Planned for Growth phase).
- Premium features.

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
- `app/(employer)/dashboard/page.tsx` → Overview for Employer.
- `app/(employer)/dashboard/profile/page.tsx` → Profile form.
- `app/(employer)/dashboard/jobs/page.tsx` → List of employer's jobs.
- `app/(employer)/dashboard/jobs/new/page.tsx` → Post new job form.
- `app/(employer)/dashboard/jobs/[id]/edit/page.tsx` → Edit job form.
- `components/employer/JobForm.tsx` → Reusable form for create/edit.
- `components/employer/CompanyProfileForm.tsx` → Profile form.
- `app/api/employer/profile/route.ts` → API for profile update.
- `app/api/jobs/route.ts` → API for creating jobs.
- `app/api/jobs/[id]/route.ts` → API for updating/deleting jobs.

### Implementation Steps
1. Create `app/api/employer/profile/route.ts` to handle GET (fetch profile) and POST/PUT (upsert profile) for the logged-in user.
2. Create `components/employer/CompanyProfileForm.tsx` and integrate it into `app/(employer)/dashboard/profile/page.tsx`. Force employers to fill this before posting a job.
3. Create `components/employer/JobForm.tsx` that includes fields for title, category, type, salary, description, experience, deadline, and apply method.
4. Create `app/api/jobs/route.ts` (POST) to save a new job listing to `prisma.jobListing`. Ensure `employerId` is linked correctly.
5. Create `app/(employer)/dashboard/jobs/new/page.tsx` using `JobForm`.
6. Create `app/api/jobs/[id]/route.ts` (PUT, DELETE) to handle updates and soft-deletes (setting `deletedAt`).
7. Create `app/(employer)/dashboard/jobs/page.tsx` to list jobs belonging to the current employer, showing their status and edit/delete actions.

### Expected Behavior
- Employer can update their company name, description, etc.
- Employer can post a new job. It defaults to 'active'.
- Employer can see their jobs, edit them, or soft delete them.

### What NOT to Touch
- Seeker routes.
- Public job discovery pages.

### Definition of Done
- [ ] Profile can be upserted.
- [ ] New job can be posted and appears in the employer's list.
- [ ] Job can be edited.
- [ ] Job can be soft deleted (no longer appears in public list).
