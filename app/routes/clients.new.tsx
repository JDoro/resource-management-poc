import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useForm } from '@tanstack/react-form';
import { useCreateClientMutation } from '../temp/hooks/use-create-client-mutation';

export const Route = createFileRoute('/clients/new')({
  component: ClientNewRoute,
});

function ClientNewRoute() {
  const navigate = useNavigate();
  const createClientMutation = useCreateClientMutation({
    onSuccess: (client) => navigate({ to: '/clients/$id', params: { id: client.id } }),
  });

  const form = useForm({
    defaultValues: {
      name: '',
      description: '',
      address: '',
    },
    onSubmit: async ({ value }) => {
      await createClientMutation.mutateAsync(value);
    },
  });

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/clients"
            className="text-primary hover:text-primary-light font-medium"
          >
            ← Back to Clients
          </Link>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-dark-grey mb-2">
            Create New Client
          </h2>
          <p className="text-dark-grey/70">
            Add a new client to the system
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
                  className="block text-sm font-medium text-dark-grey mb-2"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full px-4 py-2 border border-light-grey rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
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
                  className="block text-sm font-medium text-dark-grey mb-2"
                >
                  Address
                </label>
                <input
                  id="address"
                  type="text"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full px-4 py-2 border border-light-grey rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
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
                    className="px-6 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isSubmitting ? 'Creating...' : 'Create Client'}
                  </button>
                  <Link
                    to="/clients"
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
