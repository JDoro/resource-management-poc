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
  - `{feature-name}/`: Feature-specific components, hooks, and utilities.
    - `components/`: Reusable UI components.
    - `hooks/`: Custom React hooks.
    - `api/`: API interaction logic.
    - `routes/`: Route definitions and configurations.
  - `shared/`: code that is shared across features.
    - `components/`: Global reusable components.
    - `utils/`: Utility functions and helpers.
    - `types/`: TypeScript type definitions.
    - `styles/`: Global styles and theming.
  - `temp/`: Temporary files for iteration and testing.
    - `store/`: mock data for mock api calls.
  - `styles/`: Global styles and Tailwind CSS configurations.

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

