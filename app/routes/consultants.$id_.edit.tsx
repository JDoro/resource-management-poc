import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useForm } from '@tanstack/react-form';
import { useState } from 'react';
import { fetchConsultantById } from '../temp/api/mock-api';
import { useUpdateConsultantMutation } from '../temp/hooks/use-update-consultant-mutation';
import { useClientsQuery } from '../temp/hooks/use-clients-query';
import { useAssignConsultantToClientMutation } from '../temp/hooks/use-assign-consultant-to-client-mutation';

export const Route = createFileRoute('/consultants/$id_/edit')({
  component: ConsultantEditRoute,
  loader: async ({ params }) => {
    const consultant = await fetchConsultantById(params.id);
    return { consultant };
  },
});

function ConsultantEditRoute() {
  const { id } = Route.useParams();
  const { consultant } = Route.useLoaderData();
  const navigate = useNavigate();
  const updateConsultantMutation = useUpdateConsultantMutation({
    onSuccess: () => navigate({ to: '/consultants/$id', params: { id } }),
  });
  
  const [assignmentSuccess, setAssignmentSuccess] = useState(false);
  const { data: clients = [] } = useClientsQuery();
  const assignToClientMutation = useAssignConsultantToClientMutation({
    onSuccess: () => {
      setAssignmentSuccess(true);
      setTimeout(() => setAssignmentSuccess(false), 3000);
    },
  });

  const form = useForm({
    defaultValues: {
      name: consultant?.name || '',
      years_employed: consultant?.years_employed || 0,
    },
    onSubmit: async ({ value }) => {
      await updateConsultantMutation.mutateAsync({ id, data: value });
    },
  });

  const assignmentForm = useForm({
    defaultValues: {
      clientId: '',
      role: '',
      utilization: 0 as 0 | 1,
      startDate: new Date().toISOString().split('T')[0],
    },
    onSubmit: async ({ value }) => {
      await assignToClientMutation.mutateAsync({
        consultantId: id,
        clientId: value.clientId,
        role: value.role,
        utilization: value.utilization,
        startDate: new Date(value.startDate),
      });
    },
  });

  if (!consultant) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Consultant Not Found</h2>
        <p className="text-gray-600 mb-6">
          No consultant found with ID: {id}
        </p>
        <Link
          to="/"
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/consultants/$id"
            params={{ id }}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Consultant Details
          </Link>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Edit Consultant
          </h2>
          <p className="text-gray-600">
            Update the consultant information below
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-6"
        >
          <form.Field
            name="name"
            validators={{
              onChange: ({ value }) =>
                !value
                  ? 'Name is required'
                  : value.length < 2
                    ? 'Name must be at least 2 characters'
                    : undefined,
            }}
          >
            {(field) => (
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  placeholder="Enter consultant name"
                />
                {field.state.meta.errors.length > 0 && (
                  <p className="mt-1 text-sm text-red-600">
                    {field.state.meta.errors.join(', ')}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          <form.Field
            name="years_employed"
            validators={{
              onChange: ({ value }) =>
                value < 0
                  ? 'Years employed cannot be negative'
                  : value > 50
                    ? 'Years employed cannot exceed 50'
                    : undefined,
            }}
          >
            {(field) => (
              <div>
                <label
                  htmlFor="years_employed"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Years Employed
                </label>
                <input
                  id="years_employed"
                  type="number"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  placeholder="Enter years employed"
                  min="0"
                  max="50"
                />
                {field.state.meta.errors.length > 0 && (
                  <p className="mt-1 text-sm text-red-600">
                    {field.state.meta.errors.join(', ')}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          <div className="flex gap-4 pt-4">
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit, isSubmitting]) => (
                <>
                  <button
                    type="submit"
                    disabled={!canSubmit}
                    className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                  </button>
                  <Link
                    to="/consultants/$id"
                    params={{ id }}
                    className="px-6 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </Link>
                </>
              )}
            </form.Subscribe>
          </div>
        </form>
      </div>

      {/* Assign to Client Form */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Assign to Client
          </h2>
          <p className="text-gray-600">
            Assign this consultant to a client. A contract will be created automatically if one doesn't exist for the selected client.
          </p>
        </div>

        {assignmentSuccess && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 font-medium">
              ✓ Consultant successfully assigned to client!
            </p>
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            assignmentForm.handleSubmit();
          }}
          className="space-y-6"
        >
          <assignmentForm.Field
            name="clientId"
            validators={{
              onChange: ({ value }) =>
                !value ? 'Please select a client' : undefined,
            }}
          >
            {(field) => (
              <div>
                <label
                  htmlFor="clientId"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Client
                </label>
                <select
                  id="clientId"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                >
                  <option value="">Select a client...</option>
                  {clients.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.name}
                    </option>
                  ))}
                </select>
                {field.state.meta.errors.length > 0 && (
                  <p className="mt-1 text-sm text-red-600">
                    {field.state.meta.errors.join(', ')}
                  </p>
                )}
              </div>
            )}
          </assignmentForm.Field>

          <assignmentForm.Field
            name="role"
            validators={{
              onChange: ({ value }) =>
                !value
                  ? 'Role is required'
                  : value.length < 2
                    ? 'Role must be at least 2 characters'
                    : undefined,
            }}
          >
            {(field) => (
              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Role
                </label>
                <input
                  id="role"
                  type="text"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  placeholder="e.g., Senior Developer, Project Manager"
                />
                {field.state.meta.errors.length > 0 && (
                  <p className="mt-1 text-sm text-red-600">
                    {field.state.meta.errors.join(', ')}
                  </p>
                )}
              </div>
            )}
          </assignmentForm.Field>

          <assignmentForm.Field name="utilization">
            {(field) => (
              <div>
                <label
                  htmlFor="utilization"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Utilization
                </label>
                <select
                  id="utilization"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(Number(e.target.value) as 0 | 1)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                >
                  <option value={0}>Full Time</option>
                  <option value={1}>Part Time</option>
                </select>
              </div>
            )}
          </assignmentForm.Field>

          <assignmentForm.Field
            name="startDate"
            validators={{
              onChange: ({ value }) =>
                !value ? 'Start date is required' : undefined,
            }}
          >
            {(field) => (
              <div>
                <label
                  htmlFor="startDate"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Start Date
                </label>
                <input
                  id="startDate"
                  type="date"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                />
                {field.state.meta.errors.length > 0 && (
                  <p className="mt-1 text-sm text-red-600">
                    {field.state.meta.errors.join(', ')}
                  </p>
                )}
              </div>
            )}
          </assignmentForm.Field>

          <div className="flex gap-4 pt-4">
            <assignmentForm.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit, isSubmitting]) => (
                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="px-6 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? 'Assigning...' : 'Assign to Client'}
                </button>
              )}
            </assignmentForm.Subscribe>
          </div>
        </form>
      </div>
    </div>
  );
}
