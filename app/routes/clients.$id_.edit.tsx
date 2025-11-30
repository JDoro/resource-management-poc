import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useForm } from '@tanstack/react-form';
import { useState } from 'react';
import { fetchClientById } from '../temp/api/mock-api';
import { useUpdateClientMutation } from '../temp/hooks/use-update-client-mutation';
import { useConsultantsQuery } from '../temp/hooks/use-consultants-query';
import { useContractsQuery } from '../temp/hooks/use-contracts-query';
import { useConsultantContractsQuery } from '../temp/hooks/use-consultant-contracts-query';
import { useAssignConsultantToClientMutation } from '../temp/hooks/use-assign-consultant-to-client-mutation';

export const Route = createFileRoute('/clients/$id_/edit')({
  component: ClientEditRoute,
  loader: async ({ params }) => {
    const client = await fetchClientById(params.id);
    return { client };
  },
});

function ClientEditRoute() {
  const { id } = Route.useParams();
  const { client } = Route.useLoaderData();
  const navigate = useNavigate();
  const updateClientMutation = useUpdateClientMutation({
    onSuccess: () => navigate({ to: '/' }),
  });

  const [assignmentSuccess, setAssignmentSuccess] = useState(false);
  const { data: consultants = [] } = useConsultantsQuery();
  const { data: contracts = [] } = useContractsQuery();
  const { data: consultantContracts = [] } = useConsultantContractsQuery();
  const assignConsultantMutation = useAssignConsultantToClientMutation({
    onSuccess: () => {
      setAssignmentSuccess(true);
      setTimeout(() => setAssignmentSuccess(false), 3000);
    },
  });

  // Get contracts for this client
  const clientContracts = contracts.filter(
    (contract) => contract.client_id === id
  );

  // Get consultant contracts for this client
  const clientConsultantContracts = consultantContracts.filter((cc) =>
    clientContracts.some((c) => c.id === cc.contract_id)
  );

  // Get consultant IDs already assigned to this client
  const assignedConsultantIds = new Set(
    clientConsultantContracts.map((cc) => cc.consultant_id)
  );

  // Get assigned consultants with their contract details
  const assignedConsultants = clientConsultantContracts.map((cc) => {
    const consultant = consultants.find((c) => c.id === cc.consultant_id);
    return {
      ...cc,
      consultantName: consultant?.name || 'Unknown Consultant',
      yearsEmployed: consultant?.years_employed || 0,
    };
  });

  // Filter out already assigned consultants from the dropdown
  const availableConsultants = consultants.filter(
    (consultant) => !assignedConsultantIds.has(consultant.id)
  );

  const form = useForm({
    defaultValues: {
      name: client?.name || '',
      description: client?.description || '',
      address: client?.address || '',
    },
    onSubmit: async ({ value }) => {
      await updateClientMutation.mutateAsync({ id, data: value });
    },
  });

  const assignmentForm = useForm({
    defaultValues: {
      consultantId: '',
      role: '',
      utilization: 0 as 0 | 1,
      startDate: new Date().toISOString().split('T')[0],
    },
    onSubmit: async ({ value, formApi }) => {
      await assignConsultantMutation.mutateAsync({
        consultantId: value.consultantId,
        clientId: id,
        role: value.role,
        utilization: value.utilization,
        startDate: new Date(value.startDate),
      });
      formApi.reset();
    },
  });

  if (!client) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Client Not Found</h2>
        <p className="text-gray-600 mb-6">
          No client found with ID: {id}
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
            to="/"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Home
          </Link>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Edit Client
          </h2>
          <p className="text-gray-600">
            Update the client information below
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
                  placeholder="Enter client name"
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
            name="description"
            validators={{
              onChange: ({ value }) =>
                !value
                  ? 'Description is required'
                  : value.length < 10
                    ? 'Description must be at least 10 characters'
                    : undefined,
            }}
          >
            {(field) => (
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  placeholder="Enter client description"
                  rows={3}
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
            name="address"
            validators={{
              onChange: ({ value }) =>
                !value
                  ? 'Address is required'
                  : value.length < 5
                    ? 'Address must be at least 5 characters'
                    : undefined,
            }}
          >
            {(field) => (
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Address
                </label>
                <input
                  id="address"
                  type="text"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  placeholder="Enter client address"
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
                    to="/"
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

      {/* Currently Assigned Consultants */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Assigned Consultants ({assignedConsultants.length})
          </h2>
          <p className="text-gray-600">
            Consultants currently assigned to this client
          </p>
        </div>

        {assignedConsultants.length > 0 ? (
          <div className="space-y-3">
            {assignedConsultants.map((consultant) => (
              <div
                key={consultant.id}
                className="flex justify-between items-center bg-gray-50 rounded-lg px-4 py-3 border border-gray-200"
              >
                <div>
                  <span className="font-medium text-gray-800">
                    {consultant.consultantName}
                  </span>
                  <span className="text-gray-500 ml-2">
                    ({consultant.yearsEmployed} {consultant.yearsEmployed === 1 ? 'year' : 'years'} employed)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">{consultant.role}</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    consultant.utilization === 0 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {consultant.utilization === 0 ? 'Full Time' : 'Part Time'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">
            No consultants assigned to this client yet
          </p>
        )}
      </div>

      {/* Assign Consultant Form */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Assign Consultant
          </h2>
          <p className="text-gray-600">
            Assign a consultant to this client. A contract will be created automatically if one doesn't exist.
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
            name="consultantId"
            validators={{
              onChange: ({ value }) =>
                !value ? 'Please select a consultant' : undefined,
            }}
          >
            {(field) => (
              <div>
                <label
                  htmlFor="consultantId"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Consultant
                </label>
                <select
                  id="consultantId"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                >
                  <option value="">Select a consultant...</option>
                  {availableConsultants.map((consultant) => (
                    <option key={consultant.id} value={consultant.id}>
                      {consultant.name}
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
                  {isSubmitting ? 'Assigning...' : 'Assign Consultant'}
                </button>
              )}
            </assignmentForm.Subscribe>
          </div>
        </form>
      </div>
    </div>
  );
}
