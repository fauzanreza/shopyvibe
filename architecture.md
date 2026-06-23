# ShopyVibe — Architecture & Implementation Guide

> **Version** 1.0 · Last updated: June 2025  
> Technical blueprint for ShopyVibe, a digital storefront builder.

---

## 1. Technology Stack

### Core Framework
- **Next.js 15 (App Router)**: Server Components by default for optimal performance and SEO.
- **React 19**: Utilizing modern hooks and concurrent features.
- **TypeScript**: Strict typing for end-to-end type safety.

### UI & Styling
- **Tailwind CSS 4**: Utility-first styling integrated with a custom design system token scale (`globals.css`).
- **Headless UI / Radix (via shadcn/ui)**: Accessible, unstyled primitive components.
- **Heroicons**: Lightweight SVG icon set.

### Database & Backend
- **Prisma ORM (v5+)**: Type-safe database client and schema management.
- **MariaDB / MySQL**: Relational database via `@prisma/adapter-mariadb` over TCP (`127.0.0.1:3306`).
- **NextAuth.js v5 (Beta)**: Authentication provider handling Google OAuth and Credentials.

---

## 2. Directory Structure

```text
/home/arzafr/Coding/NodeJS/shopyvibe/
├── actions/             # Server Actions (form mutations, data fetching)
│   └── auth.ts          # Authentication server actions
├── app/                 # Next.js App Router root
│   ├── (auth)/          # Authentication routes group
│   │   ├── login/
│   │   └── register/
│   ├── dashboard/       # Protected dashboard routes
│   │   ├── [storeId]/   # Per-store isolated dashboard view
│   │   │   ├── layout.tsx # Sidebar layout
│   │   │   ├── page.tsx   # Store overview metrics
│   │   │   └── products/  # Product management
│   ├── onboarding/      # Vibe Builder / Store creation interface
│   ├── vibes/           # User's Home Hub (Store list + Template picker)
│   ├── [storeSlug]/     # Public storefront dynamic route (e.g. shopyvibe.id/mystore)
│   ├── layout.tsx       # Root layout with hydration mismatch guards
│   └── globals.css      # Design system tokens and Tailwind entry
├── components/          # Reusable React components
│   ├── auth/            # Auth-related UI (SignOutButton, etc.)
│   └── ui/              # Base UI components (buttons, inputs)
├── lib/                 # Core utilities and singletons
│   └── db.ts            # Prisma client instantiation
├── prisma/              # Database schema and migrations
│   └── schema.prisma    # Prisma schema definition
└── public/              # Static assets (icon.png, etc.)
```

---

## 3. Data Model

The application relies on a relational database structured around these core entities:

### `User`
- Central identity managed by NextAuth.
- Contains profile data (name, email, image).
- Has a one-to-many relationship with `Store`.

### `Account` & `Session`
- Standard NextAuth models for OAuth token storage and session management.
- Google OAuth creates records in `Account` linked to a `User`.

### `Store` (A "Vibe")
- Represents a digital storefront.
- Fields: `id`, `name`, `slug` (unique identifier for URL routing), `theme`, `logo`, `userId`.
- Contains `Product` and `Analytics` records.

### `Product`
- Items listed within a store.
- Fields: `id`, `storeId`, `name`, `price`, `stockStatus`, `imageUrl`, `description`.

### `Analytics`
- Tracks interactions for a store.
- Fields: `id`, `storeId`, `type` (e.g., `LINK_CLICK`, `QR_SCAN`, `PAGE_VIEW`), `timestamp`.

---

## 4. Authentication Flow

ShopyVibe implements an industry-standard authentication flow ensuring data isolation:

1. **Login/Register (`/login`, `/register`)**:
   - Supports Google OAuth and Email/Password (Credentials).
   - `allowDangerousEmailAccountLinking` is enabled to merge manual and OAuth accounts under the same email.

2. **Redirect to Hub (`/vibes`)**:
   - Post-login, users are redirected to the Home Hub (Google Docs-style).
   - This prevents the "blank mock dashboard" issue by showing a list of *their actual* stores.

3. **Data Isolation**:
   - Database queries strictly filter by `userId: session.user.id`.
   - E.g., `db.store.findMany({ where: { userId: session.user.id } })`.

---

## 5. UI Architecture & The "Vibe Builder"

The Vibe Builder (`/onboarding`) is a complex, state-heavy client component.

- **State Management**: Uses React `useState` to manage theme colors, selected templates, and block arrays.
- **Preview System**:
  - Implements a dual-preview layout (Desktop 16:10 Browser Mockup + Mobile 9:19.5 Phone Mockup).
  - A shared `<PreviewContent />` component renders the live view, scaling dynamically based on the container context.
- **Design System Enforcement**:
  - The UI utilizes CSS Custom Properties defined in `globals.css` to enforce a warm, organic visual identity, moving away from generic, sterile defaults.

---

## 6. Known Issues & Limitations

- **Browser Extensions**: Extensions injecting attributes into `<html>` or `<body>` (e.g., Grammarly) cause React hydration mismatches. Mitigated via `suppressHydrationWarning` in `app/layout.tsx`.
- **Database Connection Pooling**: The MariaDB adapter on Linux environments fails if `localhost` is used due to Unix socket routing. `DATABASE_URL` must use `127.0.0.1` to force a TCP connection.
