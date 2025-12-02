import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useForm } from '@tanstack/react-form';
import { useState } from 'react';
import { fetchConsultantById } from '../temp/api/mock-api';
import { useUpdateConsultantMutation } from '../temp/hooks/use-update-consultant-mutation';
import { useClientsQuery } from '../temp/hooks/use-clients-query';
import { useAssignConsultantToClientMutation } from '../temp/hooks/use-assign-consultant-to-client-mutation';
import { useConsultantContractsQuery } from '../temp/hooks/use-consultant-contracts-query';
import { useContractsQuery } from '../temp/hooks/use-contracts-query';
import { useUpdateConsultantContractMutation } from '../temp/hooks/use-update-consultant-contract-mutation';

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
  const [editingContractId, setEditingContractId] = useState<string | null>(null);
  const [editUpdateSuccess, setEditUpdateSuccess] = useState(false);
  const { data: clients = [] } = useClientsQuery();
  const { data: consultantContracts = [] } = useConsultantContractsQuery();
  const { data: contracts = [] } = useContractsQuery();
  const assignToClientMutation = useAssignConsultantToClientMutation({
    onSuccess: () => {
      setAssignmentSuccess(true);
      setTimeout(() => setAssignmentSuccess(false), 3000);
    },
  });
  const updateContractMutation = useUpdateConsultantContractMutation({
    onSuccess: () => {
      setEditingContractId(null);
      setEditUpdateSuccess(true);
      setTimeout(() => setEditUpdateSuccess(false), 3000);
    },
  });

  // Get current assignments for this consultant
  const currentAssignments = consultantContracts.filter(
    (cc) => cc.consultant_id === id
  );

  // Enrich assignments with client information
  const enrichedAssignments = currentAssignments.map((cc) => {
    const contract = contracts.find((c) => c.id === cc.contract_id);
    const client = contract ? clients.find((cl) => cl.id === contract.client_id) : null;
    return {
      ...cc,
      contractName: contract?.contract_name || 'Unknown Contract',
      clientName: client?.name || 'Unknown Client',
      clientId: contract?.client_id || '',
    };
  });

  // Get client IDs that this consultant is already assigned to (filter out empty strings)
  const assignedClientIds = new Set(
    enrichedAssignments.map((ea) => ea.clientId).filter((id) => id !== '')
  );

  // Filter out clients that this consultant is already assigned to
  const availableClients = clients.filter((client) => !assignedClientIds.has(client.id));

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

      {/* Current Client Assignments */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Current Client Assignments ({enrichedAssignments.length})
          </h2>
          <p className="text-gray-600">
            Clients this consultant is currently assigned to
          </p>
        </div>

        {editUpdateSuccess && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 font-medium">
              ✓ Contract updated successfully!
            </p>
          </div>
        )}

        {enrichedAssignments.length > 0 ? (
          <div className="space-y-4">
            {enrichedAssignments.map((assignment) => (
              <div
                key={assignment.id}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200"
              >
                {editingContractId === assignment.id ? (
                  <EditContractForm
                    assignment={assignment}
                    onSave={async (data) => {
                      await updateContractMutation.mutateAsync({
                        id: assignment.id,
                        data,
                      });
                    }}
                    onCancel={() => setEditingContractId(null)}
                    isSubmitting={updateContractMutation.isPending}
                  />
                ) : (
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-800">
                        {assignment.clientName}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        Contract: {assignment.contractName}
                      </p>
                      <p className="text-sm text-gray-600">
                        Role: {assignment.role}
                      </p>
                    </div>
                    <div className="text-right text-sm text-gray-500">
                      <p>
                        Started: {new Date(assignment.start_date).toLocaleDateString()}
                      </p>
                      {assignment.end_date && (
                        <p>
                          Ended: {new Date(assignment.end_date).toLocaleDateString()}
                        </p>
                      )}
                      <p className="mt-1">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          assignment.utilization === 0 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {assignment.utilization === 0 ? 'Full Time' : 'Part Time'}
                        </span>
                      </p>
                      <button
                        onClick={() => setEditingContractId(assignment.id)}
                        className="mt-2 px-3 py-1 text-xs bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition-colors"
                        aria-label={`Edit contract for ${assignment.clientName}`}
                        aria-label={`Edit contract for ${assignment.clientName}`}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">
            No clients assigned to this consultant yet
          </p>
        )}
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

        {availableClients.length === 0 ? (
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <p className="text-gray-600 italic">
              This consultant is already assigned to all available clients.
            </p>
          </div>
        ) : (
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
                  {availableClients.map((client) => (
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
        )}
      </div>
    </div>
  );
}

interface EditContractFormProps {
  assignment: {
    id: string;
    role: string;
    utilization: 0 | 1;
    start_date: Date;
    end_date?: Date;
    clientName: string;
    contractName: string;
  };
  onSave: (data: {
    role: string;
    utilization: 0 | 1;
    start_date: Date;
    end_date?: Date;
  }) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
}

function EditContractForm({ assignment, onSave, onCancel, isSubmitting }: EditContractFormProps) {
  const formatDateForInput = (date: Date | undefined): string => {
    if (!date) return '';
    // Handle both Date objects and string representations
    const dateObj = date instanceof Date ? date : new Date(date);
    return dateObj.toISOString().split('T')[0];
  };

  const form = useForm({
    defaultValues: {
      role: assignment.role,
      utilization: assignment.utilization,
      startDate: formatDateForInput(assignment.start_date),
      endDate: formatDateForInput(assignment.end_date),
    },
    onSubmit: async ({ value }) => {
      await onSave({
        role: value.role,
        utilization: value.utilization,
        start_date: new Date(value.startDate),
        end_date: value.endDate ? new Date(value.endDate) : undefined,
      });
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-4"
    >
      <div className="mb-2">
        <p className="font-medium text-gray-800">{assignment.clientName}</p>
        <p className="text-sm text-gray-600">Contract: {assignment.contractName}</p>
      </div>

      <form.Field
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
              htmlFor={`role-${assignment.id}`}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Role
            </label>
            <input
              id={`role-${assignment.id}`}
              type="text"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm"
            />
            {field.state.meta.errors.length > 0 && (
              <p className="mt-1 text-sm text-red-600">
                {field.state.meta.errors.join(', ')}
              </p>
            )}
          </div>
        )}
      </form.Field>

      <form.Field name="utilization">
        {(field) => (
          <div>
            <label
              htmlFor={`utilization-${assignment.id}`}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Utilization
            </label>
            <select
              id={`utilization-${assignment.id}`}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => {
                const val = Number(e.target.value);
                field.handleChange(val === 0 ? 0 : 1);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm"
            >
              <option value={0}>Full Time</option>
              <option value={1}>Part Time</option>
            </select>
          </div>
        )}
      </form.Field>

      <form.Field
        name="startDate"
        validators={{
          onChange: ({ value }) =>
            !value ? 'Start date is required' : undefined,
        }}
      >
        {(field) => (
          <div>
            <label
              htmlFor={`startDate-${assignment.id}`}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Start Date
            </label>
            <input
              id={`startDate-${assignment.id}`}
              type="date"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm"
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
        name="endDate"
        validators={{
          onChange: ({ value, fieldApi }) => {
            if (!value) return undefined;
            const startDate = fieldApi.form.getFieldValue('startDate');
            if (startDate && new Date(value) < new Date(startDate)) {
              return 'End date must be after start date';
            }
            return undefined;
          },
        }}
      >
        {(field) => (
          <div>
            <label
              htmlFor={`endDate-${assignment.id}`}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              End Date (optional)
            </label>
            <input
              id={`endDate-${assignment.id}`}
              type="date"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm"
            />
            {field.state.meta.errors.length > 0 && (
              <p className="mt-1 text-sm text-red-600">
                {field.state.meta.errors.join(', ')}
              </p>
            )}
          </div>
        )}
      </form.Field>

      <div className="flex gap-2 pt-2">
        <form.Subscribe
          selector={(state) => [state.canSubmit]}
        >
          {([canSubmit]) => (
            <>
              <button
                type="submit"
                disabled={!canSubmit || isSubmitting}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                type="button"
                onClick={onCancel}
                disabled={isSubmitting}
                className="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300 disabled:opacity-50 transition-colors"
              >
                Cancel
              </button>
            </>
          )}
        </form.Subscribe>
      </div>
    </form>
  );
}
