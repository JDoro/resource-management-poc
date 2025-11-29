import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useForm } from '@tanstack/react-form';
import { fetchConsultantById } from '../temp/api/mock-api';
import { useUpdateConsultantMutation } from '../temp/hooks/use-update-consultant-mutation';

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

  const form = useForm({
    defaultValues: {
      name: consultant?.name || '',
      years_employed: consultant?.years_employed || 0,
    },
    onSubmit: async ({ value }) => {
      await updateConsultantMutation.mutateAsync({ id, data: value });
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
    </div>
  );
}
