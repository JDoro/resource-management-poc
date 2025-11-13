import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import '../shared/styles/styles.css'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <header className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white shadow-lg border-b border-blue-800">
          <div className="container mx-auto px-6 py-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-white/20 rounded flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </div>
                <h1 className="text-xl font-bold tracking-tight">Resource Manager</h1>
              </div>
              <nav className="flex gap-4">
                <Link
                  to="/"
                  className="px-3 py-1 rounded font-medium text-sm transition-colors hover:bg-white/20"
                  activeProps={{ className: "bg-white/30" }}
                >
                  Home
                </Link>
                <Link
                  to="/bubblechart"
                  className="px-3 py-1 rounded font-medium text-sm transition-colors hover:bg-white/20"
                  activeProps={{ className: "bg-white/30" }}
                >
                  Bubble Chart
                </Link>
              </nav>
            </div>
          </div>
        </header>
        <main className="container mx-auto px-6 py-10">
          <Outlet />
        </main>
      </div>
      <TanStackRouterDevtools position="bottom-right" />
    </>
  )
}
