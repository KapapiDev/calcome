# CalCome

CalCome is a modern calculator platform focused first on clear, trustworthy finance calculators. Its calculators are built on a shared application foundation and permanent engineering standards.

**CalCome · 금융 계산을 쉽게.**

- Production domain: <https://www.calcome.com>
- Repository: <https://github.com/maxtop9843-byte/calcome>
- Issues: <https://github.com/maxtop9843-byte/calcome/issues>

## Vision

Make useful calculations fast to find, easy to understand, accessible on any device, and transparent enough to trust. Product experience comes before monetization; performance, correctness, and clarity are release requirements.

## Tech stack

- Next.js App Router and React
- TypeScript in strict mode
- Tailwind CSS
- shadcn/ui primitives
- Decimal.js for precision-safe financial calculations
- Vitest and Testing Library
- ESLint and Prettier
- npm for dependency and lockfile management

## Folder structure

```text
.
├── .github/               Pull request templates and repository metadata
├── public/                 Static assets
├── docs/                   Permanent standards and feature specifications
├── src/
│   ├── app/                Routes, layouts, metadata, and global styles
│   ├── components/
│   │   ├── layout/         Shared site chrome
│   │   └── ui/             Reusable shadcn/ui primitives
│   ├── config/             Typed product configuration
│   ├── features/           Feature-local UI and framework-independent logic
│   └── lib/                Framework-independent shared utilities
├── ARCHITECTURE.md         Technical boundaries and evolution
├── BOOTSTRAP.md            Engineering handbook
├── DESIGN_SYSTEM.md        Visual and interaction language
└── CONTRIBUTING.md         Contribution workflow
```

Calculator routes compose server-rendered content with feature-local interactive UI and framework-independent domain modules. See [ARCHITECTURE.md](./ARCHITECTURE.md) for the intended boundaries.

## Feature Driven Development

CalCome does not implement features directly from prompts. Every feature begins with an approved specification in `docs/features/`, which remains the source of truth for implementation, testing, documentation, and review. Follow [Feature Driven Development](./docs/FEATURE_DRIVEN_DEVELOPMENT.md) before starting feature work.

Use the reusable [feature template](./docs/features/_TEMPLATE.md) for new specifications. The [Compound Interest Calculator](./docs/features/compound-interest.md) is the first implementation of this workflow.

## Local development

Requirements: Node.js 20.19 or newer and npm.

```bash
npm install
npm run test
npm run dev
```

Open `http://localhost:3000`.

Copy `.env.example` to `.env.local`. Production builds use
`NEXT_PUBLIC_SITE_URL=https://www.calcome.com`; local development can override it
with `http://localhost:3000` when explicitly testing local absolute URLs.

## Commands

```bash
npm run dev          # Start the development server
npm run build        # Create a production build
npm run start        # Run the production build
npm run lint         # Run ESLint with zero warnings allowed
npm run typecheck    # Check TypeScript
npm run format       # Format tracked source and documentation
npm run format:check # Verify formatting
npm run test         # Run unit and component tests
npm run test:watch   # Run tests in watch mode
npm run check        # Run static checks and tests
```

## Contributing

Keep changes small, mobile-first, accessible, and consistent with the documented architecture and design system. Before opening a pull request, run `npm run check` and `npm run build`. Full branch, commit, and review conventions are in [CONTRIBUTING.md](./CONTRIBUTING.md).

Before a public deployment or launch announcement, complete the repository and production-domain gates in the [Production Readiness Checklist](./docs/PRODUCTION_READINESS_CHECKLIST.md).

## Roadmap

1. Establish and validate the shared calculator contract with one finance calculator.
2. Expand the finance calculator catalog using the proven pattern.
3. Improve discovery, explanations, comparison tools, and platform-wide quality signals.
4. Consider additional calculator categories only after the finance foundation is mature.

## License

[MIT](./LICENSE)
