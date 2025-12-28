import {
  createFileRoute,
  Link,
  useNavigate,
  useSearch,
} from '@tanstack/react-router';
import { z } from 'zod';
import { useConsultantsQuery } from '../temp/hooks/use-consultants-query';
import { useClientsQuery } from '../temp/hooks/use-clients-query';

const consultantsSearchSchema = z.object({
  clientId: z.string().optional(),
});

export const Route = createFileRoute('/consultants/')({
  validateSearch: (search: Record<string, unknown>) => {
    const parsed = consultantsSearchSchema.safeParse(search);
    if (parsed.success) {
      return parsed.data;
    }
    return { clientId: undefined };
  },
  component: ConsultantsListComponent,
});

function ConsultantsListComponent() {
  const { clientId } = useSearch({ from: Route.id });
  const { data: consultants = [], isLoading } = useConsultantsQuery(clientId);
  const { data: clients = [] } = useClientsQuery();
  const navigate = useNavigate({ from: Route.id });

  const handleClientChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newClientId = e.target.value;
    navigate({
      search: (prev: { clientId?: string }) => ({ ...prev, clientId: newClientId || undefined }),
    });
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <p className="text-dark-grey/70">Loading consultants...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-dark-grey mb-2">
              All Consultants
            </h2>
            <p className="text-dark-grey/70">
              Browse our team of {consultants.length} consultant
              {consultants.length !== 1 ? 's' : ''}.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div>
              <label htmlFor="client-filter" className="sr-only">
                Filter by client
              </label>
              <select
                id="client-filter"
                onChange={handleClientChange}
                value={clientId || ''}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
              >
                <option value="">All Clients</option>
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.name}
                  </option>
                ))}
              </select>
            </div>
            <Link
              to="/consultants/new"
              className="px-6 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary-light transition-colors"
            >
              Create New Consultant
            </Link>
          </div>
        </div>

        {consultants.length === 0 ? (
          <p className="text-dark-grey/70 text-center py-8">
            No consultants found.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {consultants.map((consultant) => (
              <Link
                key={consultant.id}
                to="/consultants/$id"
                params={{ id: consultant.id }}
                aria-label={`View details for ${consultant.name}`}
                className="bg-gradient-to-br from-light-blue/30 to-light-grey/50 rounded-lg p-6 border border-light-blue hover:border-primary hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                <div className="flex flex-col h-full">
                  <h3 className="text-xl font-semibold text-dark-grey mb-2 hover:text-primary transition-colors">
                    {consultant.name}
                  </h3>
                  {consultant.role && (
                    <p className="text-dark-grey/50">{consultant.role}</p>
                  )}
                  <p className="text-dark-grey/70 mt-auto">
                    {consultant.years_employed}{' '}
                    {consultant.years_employed === 1 ? 'year' : 'years'}{' '}
                    employed
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
