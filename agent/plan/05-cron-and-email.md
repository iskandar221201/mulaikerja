## Feature: Cron Job and Email Notifications

### Context
The system needs to automatically expire jobs past their deadline and notify job seekers when new jobs matching their preferences are posted.

### Scope
IN Scope:
- API endpoint for cron job to expire jobs.
- Setup matching logic for preferences.
- Send emails via Resend.

OUT of Scope:
- Complex ML matching.
- Immediate real-time notifications (batch processing or simple trigger on job post is fine).

### Files to Modify
- `app/api/jobs/route.ts` → Trigger matching logic when a new job is posted.

### Files to Create
- `lib/email.ts` → Resend email integration.
- `lib/matching.ts` → Logic to find seekers whose preferences match a job.
- `app/api/cron/expire-jobs/route.ts` → Cron endpoint.

### Implementation Steps
1. Create `app/api/cron/expire-jobs/route.ts`. Validate a `CRON_SECRET` authorization header. Execute Prisma query to update jobs where `deadline < CURRENT_DATE` and `status = 'active'` to `status = 'expired'`. Return success response.
2. Create `lib/email.ts` utilizing the `resend` SDK. Add a function `sendJobMatchEmail(seekerEmail, jobDetails)`.
3. Create `lib/matching.ts` with a function `findMatchingSeekers(job)`. It should query `prisma.seekerPreferences` where job category is in `categories` and salary criteria match.
4. Update `app/api/jobs/route.ts` (POST job): After a job is successfully created, asynchronously call `findMatchingSeekers` and `sendJobMatchEmail` for the matched seekers.
5. Create a record in `NotificationLog` for each email sent to prevent spamming.

### Expected Behavior
- Calling the cron endpoint expires old jobs.
- Posting a new job triggers an email to seekers whose preferences match the job's category/location.

### What NOT to Touch
- Dashboard UIs.
- Public pages UIs.

### Definition of Done
- [ ] Cron endpoint successfully expires old jobs and is protected by a secret.
- [ ] `lib/matching.ts` returns the correct seekers based on logic.
- [ ] Resend is integrated and can send an email.
