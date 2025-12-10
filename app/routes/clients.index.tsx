import { createFileRoute, Link } from '@tanstack/react-router';
import { useClientsQuery } from '../temp/hooks/use-clients-query';

export const Route = createFileRoute('/clients/')({
  component: ClientsListComponent,
});

function ClientsListComponent() {
  const { data: clients = [], isLoading } = useClientsQuery();

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <p className="text-dark-grey/70">Loading clients...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-dark-grey mb-2">
              All Clients
            </h2>
            <p className="text-dark-grey/70">
              Browse our portfolio of {clients.length} client{clients.length !== 1 ? 's' : ''}.
            </p>
          </div>
          <Link
            to="/clients/new"
            className="px-6 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary-light transition-colors"
          >
            Create New Client
          </Link>
        </div>

        {clients.length === 0 ? (
          <p className="text-dark-grey/70 text-center py-8">
            No clients found.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clients.map((client) => (
              <Link
                key={client.id}
                to="/clients/$id"
                params={{ id: client.id }}
                aria-label={`View details for ${client.name}`}
                className="bg-gradient-to-br from-light-blue/30 to-light-grey/50 rounded-lg p-6 border border-light-blue hover:border-primary hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                <div className="flex flex-col h-full">
                  <h3 className="text-xl font-semibold text-dark-grey mb-2 hover:text-primary transition-colors">
                    {client.name}
                  </h3>
                  <p className="text-dark-grey/70 mb-3 flex-grow">
                    {client.description}
                  </p>
                  <p className="text-dark-grey/60 text-sm mt-auto">
                    📍 {client.address}
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
