# Professional Developer Portfolio with Monetization

## Overview

This is a full-stack developer portfolio application showcasing GitHub repositories and projects with integrated monetization features. The application presents a professional public-facing website for "Booze Lee" (personal brand) and "c Project Talent" (organization), featuring GitHub integration, Stripe payment processing, and a clean, modern design system inspired by GitHub and contemporary developer portfolios.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18 with TypeScript, built using Vite as the build tool and development server.

**Routing**: Wouter for lightweight client-side routing with two main routes:
- `/` - Home page with portfolio content
- `/checkout` - Stripe payment page for commission work

**UI Component Library**: shadcn/ui (Radix UI primitives) with custom Tailwind CSS theming. The design follows the "New York" style variant with extensive use of Radix UI components for accessibility and consistent behavior.

**State Management**: TanStack Query (React Query) for server state management, handling GitHub API data fetching with built-in caching and refetching strategies.

**Styling System**: 
- Tailwind CSS with custom configuration
- CSS custom properties for theming (light/dark mode support)
- Design tokens for spacing, colors, and typography
- Custom elevation utilities (`hover-elevate`, `active-elevate-2`) for interactive elements
- Typography uses DM Sans (primary), JetBrains Mono (code), and additional Google Fonts

**Component Structure**:
- Page components (`Home`, `Checkout`, `NotFound`)
- Feature sections (Hero, Featured Projects, Skills, Contact, Monetization)
- Repository displays (Personal and Organization repos)
- Reusable UI primitives in `components/ui/`

### Backend Architecture

**Server Framework**: Express.js running on Node.js with TypeScript.

**API Structure**: RESTful endpoints under `/api` namespace:
- `/api/github/user` - Fetch authenticated user or public profile
- `/api/github/repos` - Fetch personal repositories
- `/api/github/organization` - Fetch organization details
- `/api/github/organization/repos` - Fetch organization repositories
- `/api/stripe/payment-intent` - Create Stripe payment intents
- `/api/stripe/webhook` - Handle Stripe webhook events

**Middleware**:
- Request logging with timing and response capture
- Raw body parsing for Stripe webhook signature verification
- JSON and URL-encoded body parsing
- Vite development middleware in development mode

**Development Mode**: Vite middleware integration for HMR and development server capabilities, with custom error overlay and Replit-specific plugins.

**Production Mode**: Static file serving from built assets in `dist/public`.

### Data Storage Solutions

**Current Implementation**: In-memory storage using Map-based storage class (`MemStorage`) for user data.

**Schema Definition**: Drizzle ORM configuration pointing to PostgreSQL, though not actively used in current implementation. Database schema defined in `shared/schema.ts` with migration configuration in `drizzle.config.ts`.

**Data Models**:
- User model with id, username fields
- GitHub-specific types (User, Repo, Organization) defined as TypeScript interfaces
- Zod schemas for validation (payment intents, contact forms)

**Design Decision**: The application currently uses in-memory storage as a placeholder, with infrastructure in place to migrate to PostgreSQL via Drizzle ORM when persistence is required. This allows rapid development while maintaining a clear migration path.

### Authentication and Authorization

**GitHub Integration**: Octokit REST API client with optional token-based authentication:
- Falls back gracefully to unauthenticated requests if `GITHUB_TOKEN` is not provided
- Uses public GitHub API for portfolio data when authentication fails
- No user authentication system currently implemented

**Security Considerations**:
- Stripe webhook signature verification using raw request body
- CORS and request origin handling via Express middleware
- Environment variable-based secrets management

### Type System and Validation

**Shared Types**: Common TypeScript interfaces and Zod schemas in `shared/schema.ts` for type safety across frontend and backend.

**Validation Strategy**: Zod schemas for runtime validation of API requests (payment intents, contact forms).

**Path Aliases**: TypeScript path mapping for clean imports:
- `@/*` → Client source files
- `@shared/*` → Shared type definitions
- `@assets/*` → Static assets

## External Dependencies

### Third-Party Services

**GitHub API** (via `@octokit/rest`):
- Fetches user profile data, personal repositories, and organization repositories
- Supports both authenticated and public API access
- Handles rate limiting gracefully with fallback behavior

**Stripe** (via `stripe` and `@stripe/stripe-js`):
- Payment processing for commission work
- Payment Elements UI for secure checkout flow
- Webhook integration for payment event handling
- Requires `STRIPE_SECRET_KEY` and `VITE_STRIPE_PUBLIC_KEY` environment variables

**Neon Database** (`@neondatabase/serverless`):
- PostgreSQL database driver configured but not actively used
- Serverless-optimized connection pooling
- Requires `DATABASE_URL` environment variable when enabled

### Development Tools

**Build Tools**:
- Vite for frontend bundling and development server
- esbuild for backend bundling
- TypeScript compiler for type checking

**Code Quality**:
- TypeScript strict mode enabled
- ESModule-based architecture throughout

### UI Dependencies

**Component Libraries**:
- Radix UI primitives for 30+ accessible components
- Lucide React for icons
- TailwindCSS for utility-first styling
- class-variance-authority for component variant management

**Form Handling**:
- react-hook-form for form state management
- @hookform/resolvers for Zod schema integration

**Additional Libraries**:
- date-fns for date manipulation
- cmdk for command palette functionality
- wouter for routing
- nanoid for ID generation

### Environment Configuration

**Required Environment Variables**:
- `DATABASE_URL` - PostgreSQL connection string (when database is enabled)
- `GITHUB_TOKEN` - GitHub personal access token (optional, enhances API limits)
- `STRIPE_SECRET_KEY` - Stripe API secret key
- `VITE_STRIPE_PUBLIC_KEY` - Stripe publishable key for frontend

**Configuration Files**:
- `components.json` - shadcn/ui configuration
- `tailwind.config.ts` - Tailwind CSS theme customization
- `drizzle.config.ts` - Database migration configuration
- `vite.config.ts` - Build tool configuration