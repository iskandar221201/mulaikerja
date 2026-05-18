## Feature: Authentication System

### Context
To allow Job Seekers and Employers to login, register, and manage their data securely, we need to implement NextAuth.js with both Google OAuth and Email/Password credentials.

### Scope
IN Scope:
- NextAuth configuration with session management.
- Custom login and register pages.
- Middleware to protect private routes (`/(seeker)/*` and `/(employer)/*`).
- Basic Server Actions or API route for user registration.

OUT of Scope:
- Employer profile creation flow (handled in Employer Dashboard spec).
- Email verification.

### Design & UI Constraints
- Follow the `DESIGN.md` guidelines:
  - **Typography**: Inter font exclusively.
  - **Colors**: Primary blue (`#2563EB`), backgrounds white or soft gray (`#F9FAFB`), text high contrast.
  - **Shapes**: Buttons and Inputs (6px radius), Cards and Containers (8px radius).
  - **Borders & Shadows**: 1px solid border (`#E5E7EB`) for structure, subtle shadow on hover `0px 1px 3px rgba(0,0,0,0.1)`.
  - **Spacing**: 8px linear scale, minimum 16px padding between list items.

### Files to Modify
- (None - mostly new files)

### Files to Create
- `lib/auth.ts` → NextAuth configuration and options.
- `app/api/auth/[...nextauth]/route.ts` → NextAuth route handler.
- `app/api/auth/register/route.ts` → API route to handle user registration (insert to DB).
- `app/(auth)/login/page.tsx` → Login form UI.
- `app/(auth)/register/page.tsx` → Registration form UI.
- `middleware.ts` → Route protection.

### Implementation Steps
1. Create `lib/auth.ts` and define `authOptions` with `CredentialsProvider` (verify against DB using bcrypt) and `GoogleProvider`.
2. Add `jwt` and `session` callbacks in `authOptions` to inject user `id` and `role` into the session.
3. Create `app/api/auth/[...nextauth]/route.ts` and export GET/POST handlers.
4. Create `app/api/auth/register/route.ts` to accept POST requests with `name, email, password, role`, hash the password using `bcryptjs`, and save to `prisma.user`.
5. Create `app/(auth)/register/page.tsx` containing a form (Name, Email, Password, Role radio buttons) that calls the register API.
6. Create `app/(auth)/login/page.tsx` containing a form (Email, Password) calling `signIn('credentials')` and a Google login button calling `signIn('google')`.
7. Create `middleware.ts` to protect `/employer/*` and `/seeker/*` routes. Redirect unauthenticated users to `/login`.

### Expected Behavior
- User can register an account and specify their role.
- User can log in. Session contains `user.id` and `user.role`.
- Accessing protected routes without auth redirects to login.

### What NOT to Touch
- `prisma/schema.prisma`
- Public pages and layouts

### Definition of Done
- [ ] NextAuth initializes successfully.
- [ ] Registration saves correctly to the database.
- [ ] Login issues a session cookie.
- [ ] `middleware.ts` correctly blocks unauthorized access.
