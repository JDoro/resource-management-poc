import { Link } from '@tanstack/react-router';

export function Header() {
  return (
    <header className="bg-gradient-to-r from-secondary via-secondary to-secondary-light text-white shadow-lg border-b border-secondary">
      <div className="container mx-auto px-6 py-2">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-tight">
            Resource Management POC
          </h1>
          <nav className="flex gap-4">
            <Link
              to="/"
              className="px-3 py-1 rounded font-medium text-sm transition-colors hover:bg-white/20"
              activeProps={{ className: 'bg-white/30' }}
            >
              Home
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
