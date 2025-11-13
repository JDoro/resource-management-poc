import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/bubblechart')({
  component: BubblechartRoute,
})

function BubblechartRoute() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Bubble Chart</h2>
        <p className="text-gray-600 mb-6">
          This page will display a bubble chart visualization showing consultants across different projects and the bench.
        </p>
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-12 border-2 border-dashed border-blue-300">
          <p className="text-center text-gray-500 text-lg">
            Bubble chart visualization will be implemented here
          </p>
        </div>
      </div>
    </div>
  )
}
