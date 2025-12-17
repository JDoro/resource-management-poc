import { useForm } from '@tanstack/react-form';
import { useEffect, useRef, useState } from 'react';
import { useConsultantsQuery } from '../../temp/hooks/use-consultants-query';
import { useContractsQuery } from '../../temp/hooks/use-contracts-query';
import { useConsultantContractsQuery } from '../../temp/hooks/use-consultant-contracts-query';
import { useAssignConsultantToClientMutation } from '../../temp/hooks/use-assign-consultant-to-client-mutation';

interface AssignConsultantDialogProps {
  clientId: string;
  isOpen: boolean;
  onClose: () => void;
}

export function AssignConsultantDialog({
  clientId,
  isOpen,
  onClose,
}: AssignConsultantDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const timeoutRef = useRef<number | null>(null);
  const [assignmentSuccess, setAssignmentSuccess] = useState(false);

  const { data: consultants = [] } = useConsultantsQuery();
  const { data: contracts = [] } = useContractsQuery();
  const { data: consultantContracts = [] } = useConsultantContractsQuery();

  const assignConsultantMutation = useAssignConsultantToClientMutation({
    onSuccess: () => {
      setAssignmentSuccess(true);
      timeoutRef.current = window.setTimeout(() => {
        setAssignmentSuccess(false);
        onClose();
      }, 2000);
    },
  });

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Get contract IDs for this client
  const clientContractIds = new Set(
    contracts
      .filter((contract) => contract.client_id === clientId)
      .map((contract) => contract.id)
  );

  // Get consultant contracts for this client
  const clientConsultantContracts = consultantContracts.filter((cc) =>
    clientContractIds.has(cc.contract_id)
  );

  // Get consultant IDs already assigned to this client
  const assignedConsultantIds = new Set(
    clientConsultantContracts.map((cc) => cc.consultant_id)
  );

  // Filter out already assigned consultants from the dropdown
  const availableConsultants = consultants.filter(
    (consultant) => !assignedConsultantIds.has(consultant.id)
  );

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
        clientId,
        role: value.role,
        utilization: value.utilization,
        startDate: new Date(value.startDate),
      });
      formApi.reset();
    },
  });

  // Handle dialog open/close
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  // Handle backdrop click
  const handleDialogClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    // Close dialog if clicking on the backdrop (outside the dialog content)
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      onClick={handleDialogClick}
      className="backdrop:bg-black backdrop:bg-opacity-50 rounded-xl shadow-2xl p-0 max-w-2xl w-full"
    >
      <div className="bg-white rounded-xl p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-dark-grey">
            Assign Consultant
          </h2>
          <button
            onClick={onClose}
            className="text-dark-grey/60 hover:text-dark-grey transition-colors"
            aria-label="Close dialog"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <p className="text-dark-grey/70 mb-6">
          Assign a consultant to this client. A contract will be created automatically if one doesn't exist.
        </p>

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
                  className="block text-sm font-medium text-dark-grey mb-2"
                >
                  Consultant
                </label>
                <select
                  id="consultantId"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full px-4 py-2 border border-light-grey rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
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
                  className="block text-sm font-medium text-dark-grey mb-2"
                >
                  Role
                </label>
                <input
                  id="role"
                  type="text"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full px-4 py-2 border border-light-grey rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
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
                  className="block text-sm font-medium text-dark-grey mb-2"
                >
                  Utilization
                </label>
                <select
                  id="utilization"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    // Ensure value is either 0 or 1
                    if (value === 0 || value === 1) {
                      field.handleChange(value);
                    }
                  }}
                  className="w-full px-4 py-2 border border-light-grey rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
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
                  className="block text-sm font-medium text-dark-grey mb-2"
                >
                  Start Date
                </label>
                <input
                  id="startDate"
                  type="date"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full px-4 py-2 border border-light-grey rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
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
                  className="px-6 py-2 bg-secondary text-white font-medium rounded-lg hover:bg-secondary-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? 'Assigning...' : 'Assign Consultant'}
                </button>
              )}
            </assignmentForm.Subscribe>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-light-grey text-dark-grey font-medium rounded-lg hover:bg-light-grey/80 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
