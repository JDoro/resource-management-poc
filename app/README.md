# App Directory Structure

This directory follows the folder structure defined in the copilot instructions.

## Structure

```
app/
├── routes/                     # TanStack Router route files
│   ├── __root.tsx             # Root layout component
│   └── index.tsx              # Home page route
├── router.tsx                  # Router configuration
├── shared/                     # Shared code across features
│   ├── components/            # Global reusable components
│   ├── utils/                 # Utility functions and helpers
│   ├── types/                 # TypeScript type definitions
│   └── styles/                # Global styles and theming
│       └── styles.css         # Main stylesheet
├── styles/                     # Global styles and Tailwind CSS configurations
├── temp/                       # Temporary files for iteration and testing
│   └── store/                 # Mock data for mock API calls
└── {feature-name}/            # Feature-specific directories (to be created as needed)
    ├── components/            # Feature-specific UI components
    ├── hooks/                 # Feature-specific custom React hooks
    └── api/                   # Feature-specific API interaction logic
```

## Usage Guidelines

### Shared Code (`shared/`)
Place code that is used across multiple features:
- **components/**: Reusable UI components (buttons, inputs, layouts, etc.)
- **utils/**: Helper functions, formatters, validators, etc.
- **types/**: Shared TypeScript interfaces and types
- **styles/**: Global styles, theme configuration, Tailwind utilities

### Feature-Specific Code (`{feature-name}/`)
When adding new features, create a directory with the feature name and organize code within:
- **components/**: UI components specific to this feature
- **hooks/**: Custom hooks used only by this feature
- **api/**: API calls and data fetching logic for this feature

### Temporary Files (`temp/`)
Use this directory for:
- Mock data during development
- Test fixtures
- Experimental code
- Files that should not be committed to the repository

### Routes (`routes/`)
All TanStack Router route files are defined in this top-level directory. 
TanStack Router automatically generates the route tree from files in this directory.
Follow TanStack Router file naming conventions for route definition.

Note: Routes are kept at the top level (not within feature directories) because 
TanStack Router requires all route files to be in a single directory as configured 
in `tsr.config.json`.
