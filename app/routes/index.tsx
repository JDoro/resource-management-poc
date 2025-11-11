import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomeComponent,
})

function HomeComponent() {
  return (
    <div>
      <h2>Welcome to Resource Management POC</h2>
      <p>This is a React application built with TanStack Start and TypeScript.</p>
    </div>
  )
}
