import { createRootRoute, Outlet, HeadContent, Scripts } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Header } from '../shared/components/header';
import '../shared/styles/styles.css';

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
        gcTime: 1000 * 60 * 10, // 10 minutes
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (typeof window === 'undefined') {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    // This prevents re-creating a client if React suspends during the initial render.
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const queryClient = getQueryClient();

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:; object-src 'none';"
        />
        <title>Resource Management POC</title>
        <HeadContent />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <div className="min-h-screen bg-gradient-to-br from-light-grey to-white">
            <Header />
            <main className="container mx-auto px-6 py-10">
              <Outlet />
            </main>
          </div>
          <TanStackRouterDevtools position="bottom-right" />
        </QueryClientProvider>
        <Scripts />
      </body>
    </html>
  );
}
