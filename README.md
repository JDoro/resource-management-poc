# Resource Management POC

This is a resource management application built with TanStack Start and TypeScript.

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The development server will start at http://localhost:3000

## Building

```bash
# Build for production
npm run build
```

The build output will be in the `dist/client` directory.

## Deployment to GitHub Pages

This project is configured to deploy to GitHub Pages automatically via GitHub Actions.

### Setup

1. Go to your repository settings
2. Navigate to Pages section
3. Under "Build and deployment", select "GitHub Actions" as the source

The workflow will automatically deploy to GitHub Pages when changes are pushed to the main branch.

### Manual Deployment

You can also trigger a deployment manually from the Actions tab by running the "Deploy to GitHub Pages" workflow.

## Tech Stack

- **React 19** - UI library
- **TanStack Start** - Full-stack React framework with SSR/SSG
- **TanStack Router** - Type-safe file-based routing
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server

