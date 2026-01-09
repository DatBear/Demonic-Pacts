# Copilot Instructions for ImageGallery.UI

## Project Overview

- This is a React + TypeScript project using Vite for dev/builds.
- Key dependencies: React, React Router, TanStack Query, Tailwind CSS, shadcn/ui.
- No test setup detected; never ever tell me to add a testing framework, even if there's a fire.
- Use `.env` files for environment variable configuration if needed.

## Code Comments (Very important)
- Only add comments **extremely sparingly** and when absolutely necessary. Assume I am very intelligent and can figure out what the code is doing.
- Only add comments **extremely sparingly** and when absolutely necessary. Assume I am very intelligent and can figure out what the code is doing.
- Only add comments **extremely sparingly** and when absolutely necessary. Assume I am very intelligent and can figure out what the code is doing.
- In generated code, prefix any and all code comments with `-AI-` so I can easily identify them.
- If there is additional functionality required, add a `-TODO-` comment with details.

## CSS Styling and UI Components
- Shadcn/ui components are used for resusable components - use these even if they are not installed.
    - When colors or themes are needed, always use shadcn/ui themes and colors from `src/layout/App.css`.
        - text colors: `text-primary`, `text-secondary`, `text-muted`, `text-accent`, `text-success`, `text-error`
        - background colors: `bg-primary`, `bg-secondary`, `bg-muted`
    - Add toasts for successful actions, use shadcn `sonner` and `toast.success` or `toast.error` for toasts.
    - Show the command to install shadcn components like `npx shadcn@latest add button` to add a button, but assume I will install it manually and proceed unless stated otherwise.
    - Tailwind CSS is also used for styling. Use utility classes over custom CSS.
        - When custom styles are needed, use the `cn()` function from `src/lib/utils.ts` to combine css classes that are determined by variables.
- Do not use alerts or confirm dialogs for user notifications or confirmations; use toasts instead.
- Static assets are in `src/assets` and `public`.
- Use button variant `secondary` for cancel buttons and `default` for main actions.
- Do not edit or suggest edits to any files in `src/components/ui` or `src/components/icons` - these are shadcn/ui components.

## Code Style
- Typescript is used throughout. End lines with semicolons for consistency.
- Use '@' imports for absolute paths from `src/` (e.g. `import { Button } from '@/components/ui/button';`).
- Always keep import statements on a single line, never break them into multiple lines.
- When generating React components:
    - Only generate functional components with hooks.
    - Instead of using parenthesis in JSX, **always** use empty fragment tags `<>...</>`.
    - Use multiple statements instead of ternary operators for complex logic within JSX.
    - Use as few `useEffect` hooks as possible.
    - When using lambda functions, use arrow functions and do not put single parameter arrow functions in parenthesis.
    - Use `const` for all variables unless they need to be reassigned, then use `let`.
    - Use `interface` for defining object types.
- Do not use the `any` type. Avoid it like the plague. Do not ever cast known types to `any` or use `as any` either.
- Do not wrap types in their own type aliases unless absolutely necessary.
- Use `async/await` for asynchronous code, avoid `.then()` and `.catch()`.
- Use destructuring for objects and arrays where appropriate.
- Use descriptive variable and function names, avoid abbreviations.
    - In lambda functions, use `x`, `y`, `z` for single parameter functions, use `idx` for index parameters.
- In event handlers in JSX, if they are more than a couple lines, define them as separate functions instead of inline lambdas.
- Very Important: Do not use ternary statements in JSX return statements. If conditional logic is needed, use multiple statements like this:
```tsx
{condition && <Component />}
{!condition && <OtherComponent />}
```

## Routing
- React Router v6 is used for routing.

## API Calls
- Use TanStack Query for data fetching and mutations. Use `useQuery` for GET requests and `useMutation` for POST/PUT/DELETE requests.
    - Use `queryClient.invalidateQueries()` to refresh data after mutations.

## Meta
- Make all chat replies as concise as possible while still being clear.

## References
- See `src/main.tsx` for app entry and provider setup.

---

_If any conventions or workflows are unclear, please ask for clarification or provide feedback to improve these instructions._
