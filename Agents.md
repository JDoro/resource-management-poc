# Agents Instructions

This document consolidates all GitHub Copilot instructions for this repository. These instructions are designed to help GitHub Copilot and other AI agents understand the context and requirements for generating code in this repository.

---

# Copilot Instructions

## Overview
These instructions are designed to help GitHub Copilot understand the context 
and requirements for generating code in this repository.

### Repository Purpose
This project is a proof of concept for a resource management application built using
TanStack Start and TypeScript. It aims to demonstrate efficient resource handling,
dynamic routing, and a seamless user experience through a modern web application

### Key Features
- Resource management functionalities including creation, updating, and deletion of resources.
- Bubble chart display that visualizes the consultants who are on different 
  projects and the bench at a point in time.

### Languages
- TypeScript

### Frameworks
- React 19
- TanStack Start
- TanStack Router
- Vite
- Vitest
- Testing Library
- TailwindCss

### Tools
- ESLint
- Prettier
- GitHub Actions

### Folder Structure

- `app/`: Contains the source code for the application.
  - `routes/`: TanStack Router route definitions and configurations.
  - `{feature-name}/`: Feature-specific components, hooks, and utilities.
    - `components/`: Reusable UI components.
    - `hooks/`: Custom React hooks.
    - `api/`: API interaction logic.
  - `shared/`: code that is shared across features.
    - `components/`: Global reusable components.
    - `utils/`: Utility functions and helpers.
    - `types/`: TypeScript type definitions.
    - `styles/`: Global styles and theming.
  - `temp/`: Temporary files for iteration and testing.
    - `store/`: mock data for mock api calls.
  - `styles/`: Global styles and Tailwind CSS configurations.

## Workflows

### Creating Pull Requests

- Ensure all code changes are made through pull requests.
- Include a clear description of the changes made in the pull request.
- Link related issues or tasks in the pull request description.
- Ensure that all tests pass before creating a pull request or committing
  changes to a pull request.
- Ensure all coding standards are followed and any tool enforcing those standards
  (e.g., ESLint, Prettier) report no issues.
- If the changes involve a web application or user interface, include
  screenshots or screen recordings of the changes made.
- if the changes involve a web application run the application and
  verify that the chrome devtools console shows no errors or warnings.
- If the changes involve bug fixes, include steps to reproduce the issue and
  verify the fix.
- If the changes involve performance improvements, include before-and-after
  benchmarks or metrics.

### Reviewing Pull Requests

- Review code for adherence to coding standards.
- If the changes involve a web application or user interface, verify the
  functionality by running the application and testing the changes. Ensuring
  that the chrome devtools console shows no errors or warnings.
- Provide constructive feedback and suggestions for improvement.

## Coding Standards

### Indentation

Use 2 spaces for indentation.

### Line Length

Limit lines to a maximum of 80 characters.

### Naming Conventions

- Use camelCase for variable and function names.
- Use PascalCase for component and class names.
- Use UPPER_SNAKE_CASE for constants.
- Use kebab-case for file and folder names.
- Use descriptive names that clearly indicate the purpose of the variable, 
function, or component.
- Avoid abbreviations unless they are widely recognized.
- Prefix boolean variables and functions with "is", "has", "can", or "should".
- Avoid using reserved words or names that may conflict with existing libraries.
- Ensure consistency in naming conventions throughout the codebase.

### Comments

- Use comments to explain the purpose of complex code blocks or functions.
- Avoid redundant comments that do not add value or clarity to the code.
- Keep comments up-to-date with code changes to prevent misinformation.
- Use comments to indicate TODOs, FIXMEs, and other notes for future improvements or
  refactoring.

### style
- Always use semicolons at the end of statements.
- Always surround loop and conditional blocks with curly braces `{}`.
- Open braces `{` should be on the same line as the control statement.

---

# React Copilot Instructions

This instruction set is tailored to help GitHub Copilot generate code for a 
React web application or library.

This is an extension of the .github/copilot-instructions.md file.

## Coding Standards

### Naming Conventions

- Use singular nouns for component names (e.g., Button, InputField).
- Use plural nouns for collections (e.g., UserList, ProductArray).
- Use verbs for function names that perform actions (e.g., fetchData, 
handleClick).
- Use nouns for function names that return values (e.g., getUser, calculateTotal).
- Prefix event handler functions with "handle" (e.g., handleSubmit, handleChange).
- Prefix event names with "on" (e.g., onClick, onSubmit).
- Use "use" prefix for custom hooks (e.g., useFetch, useAuth).

### Comments

- Use JSDoc style comments for functions, classes, and components to describe
their purpose, parameters, and return values.
- Use inline comments sparingly to explain complex logic or decisions in the code.

### Strings

- Use template literals for string interpolation and multi-line strings.
- Prefer single quotes for strings unless the string contains a single quote that
needs to be escaped.
- Use descriptive variable names for string constants to improve readability.
- Use double quotes for JSX attributes.

### Style

- Follow the Airbnb JavaScript Style Guide for React projects.
- Use Prettier for code formatting to ensure consistent style across the codebase.
- Use ESLint with the React plugin to enforce coding standards and catch potential
issues.
- Use arrow functions `=>` over anonymous functions
- Prefer destructuring assignment for props and state objects in components.
- Use React Fragments (`<>...</>`) to group multiple elements without adding extra
nodes to the DOM.
- Whenever possible, use in top-level scopes `export function x(…) {…}` instead 
of `export const x = (…) => {…}`. One advantage of using the `function` keyword 
is that the stack-trace shows a good name when debugging.

### Code Quality

- Prefer `async/await` syntax for handling asynchronous operations over `.then()` and
`.catch()`.
- If you create any temporary new files, scripts, or helper files for iteration,
clean up these files by removing them at the end of the task
- Do not use `any` or `unknown` as the type for variables, parameters, or return
values unless absolutely necessary. If they need type annotations, they should 
have proper types or interfaces defined.
- Never duplicate imports. Always reuse existing imports if they are present.
- When creating a new component, create a new directory for it that includes the
component file, its styles (if any)`*.styles.(ts|js|css|scss)`, and its 
tests `*.test.(ts|js|tsx|jsx)`.
- Prefer const declarations for variables that are not reassigned.
- Always handle potential errors in asynchronous operations using try/catch blocks.

### Components

- Ensure all React components are properly typed using TypeScript interfaces or
  types.
- Ensure all components are functional components using React Hooks instead of
  class components, unless there is a specific reason to use a class component.
- Avoid duplicating state across components by lifting state up to a common ancestor or
  using context or state management libraries or composing new values with 
  `useMemo`.
- Encapsulate reusable logic in custom hooks to promote code reuse and 
separation of concerns.
- Use tailwindcss utility classes for styling components instead of inline 
  styles or CSS modules, unless there is a specific reason to do otherwise.

---

# TanStack Query Copilot Instructions

This instruction set is tailored to help GitHub Copilot generate code that 
uses TanStack Query (formerly React Query) following best practices.

This is an extension of the .github/copilot-instructions.md file and works 
alongside the React Copilot Instructions.

## Coding Standards

### Naming Conventions

- Prefix query hooks with "use" followed by descriptive action and suffix with 
"Query" (e.g., `useUserDataQuery`, `useProductsQuery`, `usePostCommentsQuery`).
- Use descriptive query keys that reflect the data structure (e.g., 
`['users', userId]`, `['posts', 'list', filters]`).
- Name mutation hooks with "use" prefix, action verb, and suffix with 
"Mutation" (e.g., `useCreateUserMutation`, `useUpdatePostMutation`, 
`useDeleteCommentMutation`).
- Use camelCase for query and mutation function names (e.g., `fetchUserData`, 
`createPost`, `updateProfile`).
- Name query key factory functions with the resource name followed by "Keys" 
(e.g., `userKeys`, `postKeys`, `productKeys`).

### Query Keys

- Always use array format for query keys to enable hierarchical invalidation.
- Structure query keys from general to specific: `[resource, scope, ...params]`.
- Create query key factories for related queries to ensure consistency:
  ```typescript
  const userKeys = {
    all: ['users'] as const,
    lists: () => [...userKeys.all, 'list'] as const,
    list: (filters: string) => [...userKeys.lists(), { filters }] as const,
    details: () => [...userKeys.all, 'detail'] as const,
    detail: (id: number) => [...userKeys.details(), id] as const,
  };
  ```
- Never use string-only keys; always use arrays for better type safety and 
invalidation control.
- Keep query keys serializable (avoid functions, class instances, or 
non-serializable objects).

### Query Hooks

- Always specify explicit return types for custom query hooks.
- Use `queryFn` to keep the query function close to the hook definition.
- Enable `staleTime` appropriately based on data volatility (e.g., user 
profiles can have longer stale time than real-time data).
- Set `gcTime` (formerly `cacheTime`) based on how long you want to keep 
unused data in cache.
- Use `enabled` option to conditionally execute queries based on dependencies.
- Leverage `select` option to transform or derive data from queries rather 
than transforming in components.
- Always handle loading and error states appropriately in components using 
the query.
- Use `placeholderData` or `initialData` when appropriate to improve perceived 
performance.
- Never call hooks conditionally; use the `enabled` option instead.

### Mutation Hooks

- Always use `useMutation` for operations that create, update, or delete data.
- Implement optimistic updates for better user experience when appropriate.
- Use `onSuccess`, `onError`, and `onSettled` callbacks for side effects.
- Invalidate or update related queries after successful mutations using 
`queryClient.invalidateQueries()` or `queryClient.setQueryData()`.
- Handle errors gracefully with proper error messages and rollback logic for 
optimistic updates.
- Use `mutateAsync` only when you need promise-based control flow; otherwise 
prefer `mutate`.
- Group related invalidations together for efficiency.

### Query Client Configuration

- Create a single QueryClient instance and provide it through 
`QueryClientProvider` at the app root.
- Configure default options in the QueryClient constructor:
  ```typescript
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
        gcTime: 1000 * 60 * 10, // 10 minutes
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  });
  ```
- Override defaults per-query only when necessary.
- Enable React Query DevTools in development for debugging.

### Data Fetching Functions

- Keep data fetching functions separate from hooks for better testability and 
reusability.
- Always throw errors in fetch functions rather than returning error objects; 
TanStack Query handles errors through its error state.
- Use proper TypeScript types for request parameters and response data.
- Create an API client module to centralize fetch logic and configuration.
- Include proper error handling and transformation in fetch functions.

### Infinite Queries

- Use `useInfiniteQuery` for paginated or infinite scroll data.
- Always provide `getNextPageParam` and `getPreviousPageParam` functions.
- Use `hasNextPage` and `fetchNextPage` to implement load more functionality.
- Structure data to work efficiently with `pages` array structure.
- Consider using `select` to flatten paginated data if needed by components.

### Dependent Queries

- Use the `enabled` option to create dependent queries that wait for required 
data.
- Pass data from one query to another through the `enabled` and `queryFn` 
parameters.
- Avoid running queries when their dependencies are not yet available.

### Prefetching

- Use `queryClient.prefetchQuery()` to load data before it's needed (e.g., on 
hover, route transitions).
- Prefetch next pages in infinite queries to improve perceived performance.
- Use `queryClient.setQueryData()` to seed cache with data from other sources 
(e.g., list to detail transitions).

### Error Handling

- Always provide meaningful error types and messages from API functions.
- Use error boundaries or global error handlers for critical query failures.
- Implement retry logic appropriately based on error types (avoid retrying on 
4xx errors).
- Display user-friendly error messages in the UI based on query error states.
- Log errors appropriately for debugging and monitoring.

### Performance Optimization

- Use `select` option to subscribe only to specific parts of query data to 
minimize re-renders.
- Implement proper TypeScript types to catch errors at compile time.
- Use structural sharing (enabled by default) to prevent unnecessary re-renders.
- Avoid over-fetching by keeping query functions focused and specific.
- Use `refetchOnMount`, `refetchOnWindowFocus`, and `refetchOnReconnect` 
judiciously based on data requirements.
- Consider using `keepPreviousData` (now `placeholderData: 
keepPreviousData`) for paginated queries to prevent loading states between 
pages.

### Code Organization

- Group related query hooks in dedicated files (e.g., `useUserQuery.ts`, 
`useProductQuery.ts`).
- Keep query key factories, hooks, and fetch functions co-located for the 
same resource.
- Export query hooks from a central queries/hooks directory for easy imports.
- Separate query logic from component logic for better separation of concerns.

### Testing

- Test query hooks in isolation using testing libraries like 
`@testing-library/react`.
- Mock API responses rather than the query hooks themselves.
- Use `QueryClientProvider` with a new `QueryClient` instance for each test.
- Test loading, success, and error states for queries.
- Verify that mutations trigger appropriate invalidations and updates.

### Type Safety

- Always define TypeScript interfaces or types for query data and errors.
- Use generics properly with `useQuery<TData, TError>` and 
`useMutation<TData, TError, TVariables>`.
- Avoid using `any` type; use `unknown` if the type is truly dynamic and 
narrow it appropriately.
- Define separate types for API responses and application data models when 
transformation is needed.

### Best Practices

- Never fetch data in `useEffect`; use `useQuery` instead.
- Avoid storing server state in local state (useState); let TanStack Query 
manage it.
- Use background refetching to keep data fresh without showing loading states.
- Implement proper loading skeletons or placeholders during initial data fetch.
- Use suspense mode for queries when using React Suspense (via `suspense: 
true` option or `useSuspenseQuery`).
- Keep mutations as close to the user action as possible for better UX.
- Document complex query configurations with comments explaining the rationale.
- Avoid premature optimization; start with sensible defaults and optimize 
based on actual performance metrics.

---

# TanStack Router Copilot Instructions

This instruction set is tailored to help GitHub Copilot generate code that 
uses TanStack Router following best practices.

This is an extension of the .github/copilot-instructions.md file and works 
alongside the React Copilot Instructions.

## Coding Standards

### Naming Conventions

- Name route files using kebab-case (e.g., `about.tsx`, `user-profile.tsx`, 
`blog-post.tsx`).
- Use PascalCase for route component names (e.g., `AboutRoute`, 
`UserProfileRoute`, `BlogPostRoute`).
- Prefix layout components with "Layout" (e.g., `RootLayout`, 
`DashboardLayout`, `AuthLayout`).
- Name loader functions with the resource name followed by "Loader" (e.g., 
`userLoader`, `postsLoader`, `productLoader`).
- Use descriptive names for search param schemas that reflect their purpose 
(e.g., `userSearchSchema`, `productsFilterSchema`).
- Name error components with "Error" suffix (e.g., `RouteError`, 
`NotFoundError`, `GenericError`).
- Use "Pending" suffix for pending/loading components (e.g., `RoutePending`, 
`DataPending`).

### File-Based Routing Structure

- Use file-based routing with the `routes` directory at the project root or 
within `src`.
- Follow the flat file structure convention: `routes/about.tsx`, 
`routes/posts.$postId.tsx`.
- Use underscore prefix for pathless layout routes (e.g., `_layout.tsx`, 
`_auth.tsx`).
- Use dollar sign for dynamic route parameters (e.g., `$userId.tsx`, 
`posts.$postId.tsx`).
- Use parentheses for route groups that don't affect the URL (e.g., 
`(dashboard)/settings.tsx`).
- Place the root route in `__root.tsx` at the routes directory root.
- Keep route files focused on route configuration; extract complex components 
to separate files.
- Organize related routes in subdirectories when they share common layouts or 
functionality.

### Route Configuration

- Always define routes using the `createFileRoute` or `createRootRoute` 
functions.
- Export route configuration as the default export from route files.
- Define route options (loader, component, errorComponent, pendingComponent) 
within the route configuration.
- Use `beforeLoad` for authentication checks and redirects.
- Implement `validateSearch` with Zod or similar schema validation for type-
safe search parameters.
- Set appropriate `staleTime` for loaders based on data volatility.
- Use `gcTime` (formerly `cacheTime`) to control how long inactive loader 
data stays in memory.
- Configure `shouldReload` to control when loaders re-execute on navigation.

Example:
```typescript
export const Route = createFileRoute('/posts/$postId')({
  component: PostRoute,
  loader: async ({ params }) => fetchPost(params.postId),
  errorComponent: PostError,
  pendingComponent: PostPending,
  validateSearch: (search) => postSearchSchema.parse(search),
  beforeLoad: async ({ context }) => {
    if (!context.user) {
      throw redirect({ to: '/login' });
    }
  },
});
```

### Type Safety

- Always use TypeScript for route definitions and loader functions.
- Define strict types for route parameters using generics.
- Create type-safe search parameter schemas using Zod or similar validation 
libraries.
- Use the router's type inference to ensure type safety across the 
application.
- Define context types for route-level context data.
- Use `RouteContext` generic to type the route context properly.
- Leverage `inferLoaderData` utility type to infer loader return types.
- Never use `any` type for route parameters, search params, or loader data.

Example:
```typescript
import { z } from 'zod';

const postSearchSchema = z.object({
  page: z.number().optional().default(1),
  sort: z.enum(['recent', 'popular']).optional().default('recent'),
});

type PostSearch = z.infer<typeof postSearchSchema>;
```

### Data Loading

- Always use loader functions for data fetching rather than `useEffect` in 
components.
- Keep loader functions async and return serializable data.
- Throw errors from loaders to trigger error boundaries.
- Use loader context to access shared data like authentication state.
- Leverage loader caching to prevent redundant data fetching.
- Implement proper error handling in loaders with meaningful error messages.
- Use `defer` for streaming data when appropriate to improve perceived 
performance.
- Preload data on link hover using `preload="intent"` for better UX.
- Access loader data in components using `Route.useLoaderData()`.

Example:
```typescript
loader: async ({ params, context, abortController }) => {
  const data = await fetchData(params.id, {
    signal: abortController.signal,
  });
  
  if (!data) {
    throw new Error('Data not found');
  }
  
  return data;
};
```

### Navigation and Linking

- Use `<Link>` component for internal navigation instead of `<a>` tags.
- Leverage type-safe navigation with `to` prop using route paths.
- Pass search params and hash using the `search` and `hash` props.
- Use `params` prop for dynamic route parameters in links.
- Implement active link styling using `activeProps` and `inactiveProps`.
- Use `useNavigate` hook for programmatic navigation.
- Use `navigate` function returned from `useNavigate` with type-safe options.
- Implement `preload` prop on links to prefetch data on hover or mount.
- Use `resetScroll` option to control scroll behavior on navigation.

Example:
```typescript
<Link
  to="/posts/$postId"
  params={{ postId: '123' }}
  search={{ page: 1 }}
  activeProps={{ className: 'active-link' }}
  preload="intent"
>
  View Post
</Link>;
```

### Search Parameters

- Always validate search parameters using schema validation (Zod, Yup, etc.).
- Define search param schemas at the route level using `validateSearch`.
- Use `useSearch` hook to access type-safe search parameters in components.
- Update search params using `useNavigate` with the `search` option.
- Implement search param defaults in the validation schema.
- Keep search params serializable (strings, numbers, booleans, arrays).
- Use search params for filters, pagination, and UI state that should be 
shareable via URL.
- Avoid storing complex objects or functions in search parameters.

### Error Handling

- Always implement `errorComponent` for routes to handle loader and component 
errors.
- Use `useRouteError` hook in error components to access error information.
- Create reusable error components for common error scenarios (404, 403, 500).
- Implement proper error boundaries at appropriate levels (route, layout, 
root).
- Display user-friendly error messages while logging technical details.
- Use `isNotFound` utility to check for 404 errors specifically.
- Implement retry mechanisms for transient errors when appropriate.
- Throw `notFound()` from loaders for missing resources to trigger 404 
handling.

Example:
```typescript
function RouteError() {
  const error = useRouteError();
  
  if (isNotFound(error)) {
    return <NotFound />;
  }
  
  return (
    <div>
      <h1>Error</h1>
      <p>{error.message}</p>
    </div>
  );
};
```

### Pending States

- Implement `pendingComponent` for routes to show loading states during 
navigation.
- Use `useNavigation` hook to access navigation state and show global loading 
indicators.
- Display skeleton screens or loading spinners in pending components.
- Keep pending components lightweight to render quickly.
- Use `pendingMs` and `pendingMinMs` options to control when pending UI shows.
- Implement optimistic UI updates for better perceived performance.
- Use `Outlet` with proper loading states for nested route transitions.

### Layouts and Nested Routes

- Use layout routes (pathless routes with `_` prefix) for shared UI across 
multiple routes.
- Implement the `<Outlet />` component in layouts to render child routes.
- Keep layout components focused on shared UI concerns (navigation, sidebars, 
footers).
- Pass layout-specific context down through route context.
- Use nested routes for hierarchical UI structures.
- Implement proper error boundaries at layout levels.
- Use layout routes to avoid repeating route configuration.

Example:
```typescript
// _layout.tsx
export const Route = createFileRoute('/_layout')({
  component: LayoutComponent,
});

function LayoutComponent() {
  return (
    <div>
      <nav>Navigation</nav>
      <Outlet />
      <footer>Footer</footer>
    </div>
  );
};
```

### Route Guards and Authentication

- Use `beforeLoad` hook for authentication checks and redirects.
- Implement route-level authorization by checking user permissions in 
`beforeLoad`.
- Throw `redirect()` to navigate users to login or unauthorized pages.
- Store user authentication state in router context for access in all routes.
- Use context to share authentication data between routes and components.
- Implement proper session management and token refresh logic.
- Avoid client-side only authentication; validate on the server when possible.

Example:
```typescript
beforeLoad: async ({ context, location }) => {
  if (!context.auth.isAuthenticated) {
    throw redirect({
      to: '/login',
      search: {
        redirect: location.href,
      },
    });
  }
};
```

### Code Splitting and Lazy Loading

- Use `lazyRouteComponent` for code splitting route components.
- Lazy load large components that aren't needed immediately.
- Split routes into separate chunks to reduce initial bundle size.
- Use dynamic imports for heavy dependencies or conditional features.
- Implement proper loading states while lazy components load.
- Prefetch critical routes on app initialization for better UX.
- Use `pendingComponent` to show loading UI during lazy component loading.

Example:
```typescript
export const Route = createFileRoute('/dashboard')({
  component: lazyRouteComponent(() => import('./Dashboard')),
  pendingComponent: DashboardPending,
});
```

### Router Configuration

- Create a single router instance using `createRouter` with route tree.
- Configure router options (default preload, default error component, etc.) 
at router creation.
- Use `RouterProvider` to provide the router to the React application.
- Set up router context with shared data (auth, theme, etc.).
- Enable strict mode for better error detection during development.
- Configure `defaultPreload` to control link preloading behavior globally.
- Set appropriate `defaultPendingMs` and `defaultPendingMinMs` for loading 
states.

Example:
```typescript
const router = createRouter({
  routeTree,
  context: {
    auth: undefined!,
  },
  defaultPreload: 'intent',
  defaultPendingMs: 1000,
  defaultPendingMinMs: 500,
});
```

### Testing

- Test route components in isolation using testing libraries like `@testing-
library/react`.
- Mock loader functions and route context in tests.
- Test navigation flows and route transitions.
- Verify error handling and error components render correctly.
- Test search parameter validation and updates.
- Use `createMemoryHistory` for testing navigation without browser 
dependencies.
- Test route guards and authentication flows.
- Verify pending states and loading indicators work as expected.

### Performance Optimization

- Use `staleTime` to prevent unnecessary loader re-executions.
- Implement proper code splitting to reduce initial bundle size.
- Leverage link preloading to prefetch data before navigation.
- Use `defer` for streaming non-critical data.
- Implement virtualization for long lists in route components.
- Avoid expensive computations in render; move to loaders when possible.
- Use React.memo and useMemo appropriately for expensive components.
- Monitor bundle size and lazy load routes that aren't frequently accessed.

### Code Organization

- Keep route files in a dedicated `routes` directory.
- Separate route configuration from component implementation for complex 
routes.
- Group related utilities (loaders, validators, types) near their routes.
- Create shared route utilities in a common directory (e.g., `lib/routing`).
- Export route-specific types from route files for use in components.
- Keep components that are only used in one route co-located with that route.
- Use barrel exports (index files) for cleaner imports of route-related code.

### Best Practices

- Never navigate using `window.location` or `history.pushState`; use router 
navigation.
- Avoid storing router state in external state management; use router's built-
in state.
- Use search params for shareable UI state; use local state for ephemeral UI 
state.
- Implement proper loading and error states for all routes.
- Keep loaders focused and single-purpose; compose multiple loaders if 
needed.
- Use type-safe routing throughout the application for better DX and fewer 
bugs.
- Implement proper SEO metadata in route components (title, meta tags).
- Use meaningful route paths that reflect the content and hierarchy.
- Document complex routing logic and route configuration with comments.
- Validate and sanitize route parameters and search params to prevent 
security issues.
- Use the router's built-in caching; avoid implementing separate caching 
layers.
- Prefer declarative routing configuration over imperative navigation logic.

---

# Tailwind CSS Copilot Instructions

This instruction set is tailored to help GitHub Copilot generate code that 
uses Tailwind CSS following best practices.

This is an extension of the .github/copilot-instructions.md file and works 
alongside the React Copilot Instructions.

## Coding Standards

### Class Organization and Ordering

- Always order Tailwind classes in a consistent, logical manner for better 
readability and maintainability.
- Follow this recommended ordering: layout → spacing → sizing → typography → 
visual → effects → interactivity → transitions.
- Example ordering:
  1. Layout: `flex`, `grid`, `block`, `inline`, `absolute`, `relative`, `fixed`
  2. Spacing: `m-*`, `p-*`, `space-*`, `gap-*`
  3. Sizing: `w-*`, `h-*`, `min-w-*`, `max-w-*`, `min-h-*`, `max-h-*`
  4. Typography: `text-*`, `font-*`, `leading-*`, `tracking-*`
  5. Visual: `bg-*`, `border-*`, `rounded-*`, `shadow-*`, `opacity-*`
  6. Effects: `blur-*`, `brightness-*`, `contrast-*`, `filter`
  7. Interactivity: `cursor-*`, `select-*`, `pointer-events-*`
  8. Transitions: `transition-*`, `duration-*`, `ease-*`, `animate-*`
- Use Prettier with the `prettier-plugin-tailwindcss` plugin to automatically 
sort classes.
- Keep responsive modifiers (`sm:`, `md:`, `lg:`, `xl:`, `2xl:`) after base 
classes.
- Keep state modifiers (`hover:`, `focus:`, `active:`, `disabled:`) after 
responsive modifiers.
- Example:
  ```jsx
  <div className="flex items-center justify-between px-4 py-2 bg-white 
rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 md:px-6 
md:py-3">
  ```

### Responsive Design

- Always design mobile-first using Tailwind's default (unprefixed) classes for 
mobile, then add responsive modifiers.
- Use Tailwind's breakpoint system: `sm` (640px), `md` (768px), `lg` 
(1024px), `xl` (1280px), `2xl` (1536px).
- Apply responsive classes in ascending order: base → `sm:` → `md:` → `lg:` 
→ `xl:` → `2xl:`.
- Use `min-width` thinking: classes apply at that breakpoint and above unless 
overridden.
- Avoid excessive breakpoint usage; use only the breakpoints necessary for 
your design.
- Example:
  ```jsx
  <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
    <p className="text-sm md:text-base lg:text-lg">Responsive text</p>
  </div>
  ```
- Use container utilities with responsive breakpoints for consistent max-
widths:
  ```jsx
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
  ```

### Color and Theme Usage

- Always use Tailwind's color palette rather than arbitrary color values 
unless absolutely necessary.
- Use semantic color naming from your custom theme when available (e.g., 
`primary`, `secondary`, `accent`).
- Prefer color scale notation: `gray-50` (lightest) to `gray-950` (darkest).
- Use opacity utilities with colors when needed: `bg-blue-500/50` for 50% 
opacity.
- Define custom colors in `tailwind.config.js` rather than using arbitrary 
values:
  ```javascript
  // tailwind.config.js
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        },
        brand: '#ff6b6b',
      },
    },
  }
  ```
- Avoid using arbitrary values like `text-[#abc123]`; extend the theme 
instead.
- Use CSS variables with Tailwind for dynamic theming:
  ```css
  @layer base {
    :root {
      --color-primary: 59 130 246; /* RGB values */
    }
  }
  ```
  ```jsx
  <div className="bg-[rgb(var(--color-primary))]">
  ```

### Dark Mode Implementation

- Always implement dark mode using Tailwind's `dark:` variant.
- Configure dark mode strategy in `tailwind.config.js`:
  ```javascript
  module.exports = {
    darkMode: 'class', // or 'media' for system preference
  }
  ```
- Apply dark mode classes alongside regular classes:
  ```jsx
  <div className="bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-
100">
  ```
- Use semantic background and text colors that work well in both modes:
  ```jsx
  <div className="bg-gray-50 text-gray-900 dark:bg-gray-800 dark:text-gray-
50">
  ```
- Consider using CSS custom properties for complex dark mode implementations.
- Test all components in both light and dark modes during development.
- Provide proper contrast ratios in both modes for accessibility (WCAG AA 
minimum).

### Spacing and Sizing

- Use Tailwind's spacing scale (0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 
8, 9, 10, 11, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 
72, 80, 96).
- Each unit represents 0.25rem (4px): `p-4` = 1rem = 16px.
- Use consistent spacing multiples for visual rhythm (e.g., 4, 8, 12, 16, 24, 
32).
- Prefer spacing utilities over arbitrary values:
  - Good: `mt-4 mb-8 px-6`
  - Avoid: `mt-[17px] mb-[33px] px-[25px]`
- Use `space-x-*` and `space-y-*` for consistent spacing between child 
elements:
  ```jsx
  <div className="flex space-x-4">
    <button>Button 1</button>
    <button>Button 2</button>
  </div>
  ```
- Use `gap-*` utilities with flexbox and grid for cleaner spacing:
  ```jsx
  <div className="flex gap-4">
  <div className="grid grid-cols-3 gap-6">
  ```
- Extend the spacing scale in config for project-specific needs:
  ```javascript
  theme: {
    extend: {
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
    },
  }
  ```

### Typography

- Always use Tailwind's typography utilities for consistent text styling.
- Use the typography scale: `text-xs`, `text-sm`, `text-base`, `text-lg`, 
`text-xl`, `text-2xl`, `text-3xl`, `text-4xl`, `text-5xl`, `text-6xl`, 
`text-7xl`, `text-8xl`, `text-9xl`.
- Set font weights using: `font-thin`, `font-extralight`, `font-light`, 
`font-normal`, `font-medium`, `font-semibold`, `font-bold`, `font-extrabold`, 
`font-black`.
- Use line height utilities for readability: `leading-none`, `leading-tight`, 
`leading-snug`, `leading-normal`, `leading-relaxed`, `leading-loose`.
- Apply letter spacing when appropriate: `tracking-tighter`, `tracking-tight`, 
`tracking-normal`, `tracking-wide`, `tracking-wider`, `tracking-widest`.
- Use the `@tailwindcss/typography` plugin for rich text content:
  ```jsx
  <article className="prose prose-lg dark:prose-invert">
    {/* Markdown or rich content */}
  </article>
  ```
- Define custom font families in config:
  ```javascript
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
        mono: ['Fira Code', 'monospace'],
      },
    },
  }
  ```

### Component Styling Patterns

- Extract repeated utility combinations into reusable components rather than 
using `@apply` in CSS.
- Use `@apply` sparingly and only for base styles or third-party component 
integration:
  ```css
  /* Use only when necessary */
  .btn-primary {
    @apply px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 
transition-colors;
  }
  ```
- Prefer component composition over `@apply`:
  ```jsx
  // Good: Component-based approach
  const Button = ({ children, variant = 'primary' }) => {
    const baseClasses = "px-4 py-2 rounded-lg font-medium transition-colors";
    const variantClasses = {
      primary: "bg-blue-500 text-white hover:bg-blue-600",
      secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
    };
    return (
      <button className={`${baseClasses} ${variantClasses[variant]}`}>
        {children}
      </button>
    );
  };
  ```
- Use `clsx` or `classnames` libraries for conditional class application:
  ```jsx
  import clsx from 'clsx';
  
  <button className={clsx(
    'px-4 py-2 rounded-lg',
    isActive && 'bg-blue-500 text-white',
    isDisabled && 'opacity-50 cursor-not-allowed'
  )}>
  ```
- Create variant-based components using object notation:
  ```jsx
  const variants = {
    size: {
      sm: 'text-sm px-3 py-1.5',
      md: 'text-base px-4 py-2',
      lg: 'text-lg px-6 py-3',
    },
    color: {
      blue: 'bg-blue-500 hover:bg-blue-600',
      red: 'bg-red-500 hover:bg-red-600',
    },
  };
  ```

### Layout Patterns

- Use Flexbox for one-dimensional layouts (rows or columns):
  ```jsx
  <div className="flex items-center justify-between gap-4">
  ```
- Use Grid for two-dimensional layouts:
  ```jsx
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  ```
- Use `container` utility for centered, max-width layouts:
  ```jsx
  <div className="container mx-auto px-4">
  ```
- Implement common layout patterns:
  - **Centered content**: `flex items-center justify-center`
  - **Sticky header**: `sticky top-0 z-50`
  - **Full height**: `min-h-screen`
  - **Aspect ratio**: `aspect-video`, `aspect-square`
  - **Sidebar layout**: 
    ```jsx
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-100">Sidebar</aside>
      <main className="flex-1 overflow-auto">Content</main>
    </div>
    ```
- Use `space-y-*` or `gap-*` for consistent vertical rhythm in content.

### State Variants and Interactivity

- Always use state variants for interactive elements: `hover:`, `focus:`, 
`active:`, `disabled:`, `focus-visible:`.
- Implement proper focus states for accessibility:
  ```jsx
  <button className="focus:outline-none focus:ring-2 focus:ring-blue-500 
focus:ring-offset-2">
  ```
- Use `focus-visible:` instead of `focus:` when you only want visible focus 
indicators for keyboard navigation.
- Apply hover states that provide clear visual feedback:
  ```jsx
  <a className="text-blue-600 hover:text-blue-800 hover:underline">
  ```
- Use `group` and `peer` utilities for parent/sibling state-based styling:
  ```jsx
  <div className="group">
    <img className="group-hover:scale-110 transition-transform" />
  </div>
  
  <input className="peer" />
  <label className="peer-focus:text-blue-600" />
  ```
- Implement disabled states with proper visual indicators:
  ```jsx
  <button className="disabled:opacity-50 disabled:cursor-not-allowed" 
disabled={isDisabled}>
  ```

### Transitions and Animations

- Always use Tailwind's transition utilities for smooth state changes.
- Apply the `transition` utility with specific properties:
  ```jsx
  <button className="transition-colors duration-200 hover:bg-blue-600">
  <div className="transition-transform duration-300 hover:scale-105">
  <div className="transition-all duration-200 ease-in-out">
  ```
- Use appropriate duration values: `duration-75`, `duration-100`, 
`duration-150`, `duration-200`, `duration-300`, `duration-500`, 
`duration-700`, `duration-1000`.
- Apply easing functions: `ease-linear`, `ease-in`, `ease-out`, `ease-in-
out`.
- Use built-in animations: `animate-spin`, `animate-ping`, `animate-pulse`, 
`animate-bounce`.
- Define custom animations in config:
  ```javascript
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  }
  ```
- Keep animations subtle and purposeful; avoid overuse.

### Accessibility

- Always include proper focus indicators using `focus:ring-*` utilities:
  ```jsx
  <button className="focus:outline-none focus:ring-2 focus:ring-blue-500 
focus:ring-offset-2">
  ```
- Ensure sufficient color contrast for text (WCAG AA: 4.5:1 for normal text, 
3:1 for large text).
- Use `sr-only` utility for screen reader-only content:
  ```jsx
  <span className="sr-only">Close menu</span>
  ```
- Implement visible focus states for keyboard navigation with `focus-visible:`:
  ```jsx
  <a className="focus-visible:outline-none focus-visible:ring-2 focus-
visible:ring-blue-500">
  ```
- Use semantic HTML elements with appropriate Tailwind styling.
- Provide proper ARIA attributes alongside Tailwind classes.
- Test components with keyboard navigation and screen readers.
- Ensure interactive elements have sufficient touch target sizes (minimum 44x44 
pixels): `min-h-[44px] min-w-[44px]`.

### Performance and Optimization

- Enable JIT (Just-In-Time) mode in Tailwind v3+ for optimal build 
performance (enabled by default).
- Purge unused CSS in production by configuring the content paths:
  ```javascript
  module.exports = {
    content: [
      './src/**/*.{js,jsx,ts,tsx}',
      './public/index.html',
    ],
  }
  ```
- Avoid using arbitrary values excessively; they reduce the effectiveness of 
purging.
- Use `@layer` directive to properly organize custom CSS:
  ```css
  @layer base {
    h1 { @apply text-4xl font-bold; }
  }
  
  @layer components {
    .btn { @apply px-4 py-2 rounded; }
  }
  
  @layer utilities {
    .content-auto { content-visibility: auto; }
  }
  ```
- Minimize the use of `@apply` to keep CSS bundle size small.
- Use PurgeCSS safelist for dynamically generated classes:
  ```javascript
  module.exports = {
    purge: {
      safelist: ['bg-blue-500', 'text-red-600'],
    },
  }
  ```

### Custom Configuration

- Extend Tailwind's default configuration rather than overriding it:
  ```javascript
  module.exports = {
    theme: {
      extend: {
        // Adds to defaults
        colors: {
          brand: '#ff6b6b',
        },
      },
    },
  }
  ```
- Override defaults only when necessary:
  ```javascript
  module.exports = {
    theme: {
      colors: {
        // Replaces all defaults
        primary: '#3b82f6',
      },
    },
  }
  ```
- Use plugins to add reusable utilities and components:
  ```javascript
  module.exports = {
    plugins: [
      require('@tailwindcss/forms'),
      require('@tailwindcss/typography'),
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
- Create custom plugins for project-specific utilities:
  ```javascript
  const plugin = require('tailwindcss/plugin');
  
  module.exports = {
    plugins: [
      plugin(function({ addUtilities }) {
        addUtilities({
          '.scrollbar-hide': {
            '-ms-overflow-style': 'none',
            'scrollbar-width': 'none',
            '&::-webkit-scrollbar': { display: 'none' },
          },
        });
      }),
    ],
  }
  ```

### Arbitrary Values

- Use arbitrary values sparingly and only when the design requires a value not 
in the default scale:
  ```jsx
  <div className="top-[117px]"> {/* Use only if 117px is required */}
  ```
- Prefer extending the theme in config over using arbitrary values:
  ```javascript
  // Better approach
  theme: {
    extend: {
      spacing: {
        '117': '117px',
      },
    },
  }
  ```
- Use arbitrary values for one-off custom properties:
  ```jsx
  <div className="bg-[url('/images/hero.jpg')]">
  <div className="text-[clamp(1rem,5vw,3rem)]">
  ```
- Document why arbitrary values are used when they appear in code.

### Utility-First Best Practices

- Embrace utility-first approach; avoid premature abstraction into custom 
classes.
- Start with utilities in JSX/templates; extract to components when patterns 
emerge.
- Use component libraries (Headless UI, Radix UI) with Tailwind for complex 
components.
- Keep utility classes in templates for better visibility and maintainability.
- Use editor extensions (Tailwind CSS IntelliSense) for autocomplete and 
previews.
- Avoid mixing CSS-in-JS solutions with Tailwind; use one approach 
consistently.
- Document complex utility combinations with comments when necessary:
  ```jsx
  {/* Complex gradient with custom positioning */}
  <div className="bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 
bg-[length:200%_200%]">
  ```

### Responsive Images and Media

- Use Tailwind utilities for responsive images:
  ```jsx
  <img className="w-full h-auto object-cover" src="..." alt="..." />
  ```
- Apply object-fit utilities: `object-contain`, `object-cover`, `object-fill`, 
`object-none`, `object-scale-down`.
- Use object-position utilities: `object-center`, `object-top`, `object-right`, 
etc.
- Implement aspect ratios with `aspect-*` utilities:
  ```jsx
  <div className="aspect-video">
    <img className="w-full h-full object-cover" />
  </div>
  ```
- Use srcset attributes with Tailwind classes for responsive images:
  ```jsx
  <img 
    className="w-full h-auto"
    srcSet="small.jpg 480w, medium.jpg 800w, large.jpg 1200w"
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  />
  ```

### Forms and Inputs

- Use the `@tailwindcss/forms` plugin for better form element defaults.
- Style form inputs consistently:
  ```jsx
  <input 
    type="text"
    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-
2 focus:ring-blue-500 focus:border-transparent"
  />
  ```
- Implement form validation states:
  ```jsx
  <input 
    className={clsx(
      'w-full px-4 py-2 border rounded-lg',
      hasError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 
focus:ring-blue-500'
    )}
  />
  ```
- Style checkboxes and radio buttons:
  ```jsx
  <input 
    type="checkbox"
    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-
500"
  />
  ```
- Use proper spacing and alignment for form groups:
  ```jsx
  <div className="space-y-4">
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium text-gray-700">Label</label>
      <input className="..." />
    </div>
  </div>
  ```

### Code Organization

- Keep Tailwind configuration in a dedicated `tailwind.config.js` file at the 
project root.
- Organize custom CSS in separate files by purpose (base, components, 
utilities).
- Import Tailwind directives in the main CSS file:
  ```css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  
  @layer base {
    /* Custom base styles */
  }
  
  @layer components {
    /* Component classes with @apply if needed */
  }
  
  @layer utilities {
    /* Custom utility classes */
  }
  ```
- Use meaningful names for custom utilities and components.
- Document complex configurations and custom utilities in comments.

### Testing and Quality Assurance

- Test components in all breakpoints during development.
- Verify dark mode appearance for all components.
- Test with browser DevTools to ensure proper responsive behavior.
- Use Tailwind's built-in responsive design mode in the browser.
- Validate color contrast ratios for accessibility compliance.
- Test keyboard navigation and focus states for interactive elements.
- Use PostCSS plugins to check for unused or duplicate utilities in CI/CD.

### Best Practices Summary

- Always use utility classes directly in JSX/HTML rather than creating custom 
CSS classes.
- Keep class strings readable by breaking long lists into multiple lines or 
using template literals.
- Use responsive design mobile-first with appropriate breakpoints.
- Implement dark mode support using the `dark:` variant.
- Ensure proper accessibility with focus states, color contrast, and semantic 
HTML.
- Optimize performance by configuring content paths correctly for purging.
- Extend the default theme rather than overriding it to maintain consistency.
- Use Tailwind plugins for common patterns (forms, typography, aspect-ratio).
- Embrace the utility-first approach and avoid premature abstraction.
- Leverage editor tooling (IntelliSense, Prettier plugin) for better DX.
- Document complex utility combinations and custom configurations.
- Test thoroughly across devices, browsers, and accessibility tools.
