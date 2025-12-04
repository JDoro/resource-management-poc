import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useForm } from '@tanstack/react-form';
import { useCreateConsultantMutation } from '../temp/hooks/use-create-consultant-mutation';

export const Route = createFileRoute('/consultants/new')({
  component: ConsultantNewRoute,
});

function ConsultantNewRoute() {
  const navigate = useNavigate();
  const createConsultantMutation = useCreateConsultantMutation({
    onSuccess: (consultant) => navigate({ to: '/consultants/$id', params: { id: consultant.id } }),
  });

  const form = useForm({
    defaultValues: {
      name: '',
      years_employed: 0,
    },
    onSubmit: async ({ value }) => {
      await createConsultantMutation.mutateAsync(value);
    },
  });

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/consultants"
            className="text-primary hover:text-primary-light font-medium"
          >
            ← Back to Consultants
          </Link>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-dark-grey mb-2">
            Create New Consultant
          </h2>
          <p className="text-dark-grey/70">
            Add a new consultant to the system
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
                  className="block text-sm font-medium text-dark-grey mb-2"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full px-4 py-2 border border-light-grey rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
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
                  className="block text-sm font-medium text-dark-grey mb-2"
                >
                  Years Employed
                </label>
                <input
                  id="years_employed"
                  type="number"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-light-grey rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
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
                    className="px-6 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isSubmitting ? 'Creating...' : 'Create Consultant'}
                  </button>
                  <Link
                    to="/consultants"
                    className="px-6 py-2 bg-light-grey text-dark-grey font-medium rounded-lg hover:bg-light-grey/80 transition-colors"
                  >
                    Cancel
                  </Link>
                </>
              )}
            </form.Subscribe>
          </div>
        </form>
      </div>
    </div>
  );
}
