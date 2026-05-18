## Feature: Public Pages (Job Discovery)

### Context
Public users need to be able to browse available job listings, filter them, and apply directly via a pre-filled WhatsApp message or email.

### Scope
IN Scope:
- Homepage/Browse jobs with search and filter functionality.
- Job Detail page with SEO metadata.
- "Apply via WhatsApp" functionality with auto-filled template.

OUT of Scope:
- Advanced recommendation algorithm.
- Direct apply tracking in DB (clicks only tracked via WA redirect if needed, but not required for MVP).

### Design & UI Constraints
- Follow the `DESIGN.md` guidelines:
  - **Typography**: Inter font exclusively.
  - **Colors**: Primary blue (`#2563EB`), backgrounds white or soft gray (`#F9FAFB`), text high contrast.
  - **Shapes**: Buttons and Inputs (6px radius), Cards and Containers (8px radius).
  - **Borders & Shadows**: 1px solid border (`#E5E7EB`) for structure, subtle shadow on hover `0px 1px 3px rgba(0,0,0,0.1)`.
  - **Spacing**: 8px linear scale, minimum 16px padding between list items.

### Files to Modify
- `app/layout.tsx` → Add basic global layout (Navbar/Footer).
- `lib/utils.ts` → Add formatting utilities (currency, date).

### Files to Create
- `app/(public)/page.tsx` → Homepage and job list.
- `app/(public)/jobs/[id]/page.tsx` → Job detail page.
- `components/layout/Navbar.tsx` → Public navigation.
- `components/layout/Footer.tsx` → Public footer.
- `components/jobs/JobCard.tsx` → UI for a single job listing.
- `components/jobs/JobFilter.tsx` → UI for filtering/searching.

### Implementation Steps
1. Create `components/layout/Navbar.tsx` with links to login/register or dashboard if authenticated. Add to `app/layout.tsx`.
2. Create `components/jobs/JobCard.tsx` that displays job title, company, location, salary, and job type.
3. In `app/(public)/page.tsx`, fetch active jobs from `prisma.jobListing` including `employer` and `locations`. Implement search (by title) and filters (category, location).
4. Create `app/(public)/jobs/[id]/page.tsx` that fetches a single job by ID. Render job details (description, requirements, etc.).
5. Add generateMetadata in `app/(public)/jobs/[id]/page.tsx` for SEO (Dynamic Meta Title).
6. Implement the "Apply via WhatsApp" button on the job detail page using the exact URL encoding logic specified in the PRD (using job title and company name).
7. If `applyMethod` is `email`, the button should open a `mailto:` link with a pre-filled subject.

### Expected Behavior
- Homepage lists active jobs.
- Searching and filtering updates the list.
- Clicking a job opens its details.
- Clicking "Apply via WA" opens `wa.me` with the correct pre-filled template.

### What NOT to Touch
- Auth system files.
- Protected dashboard routes.

### Definition of Done
- [ ] List displays active jobs only.
- [ ] Detail page renders correctly and has dynamic SEO tags.
- [ ] WhatsApp apply button generates correct URL with pre-filled text.
