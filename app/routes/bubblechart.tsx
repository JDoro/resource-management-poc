import { createFileRoute } from '@tanstack/react-router';
import { useClientsQuery } from '../temp/hooks/use-clients-query';
import { useConsultantsQuery } from '../temp/hooks/use-consultants-query';
import type { Client } from '../shared/types';

export const Route = createFileRoute('/bubblechart')({
  component: BubblechartRoute,
});

function BubblechartRoute() {
  const { data: clients = [], isLoading: isLoadingClients } =
    useClientsQuery();
  const { data: consultants = [], isLoading: isLoadingConsultants } =
    useConsultantsQuery();

  const getConsultantsForClient = (clientId: string) => {
    return consultants.filter((consultant) => consultant.clientId === clientId);
  };

  if (isLoadingClients || isLoadingConsultants) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Loading data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Clients and Consultants
        </h2>
        <p className="text-gray-600 mb-6">
          View the list of clients and their assigned consultants.
        </p>

        <div className="space-y-6">
          {clients.map((client: Client) => {
            const consultantsForClient = getConsultantsForClient(client.id);

            return (
              <div
                key={client.id}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200"
              >
                <div className="mb-4">
                  <h3 className="text-2xl font-semibold text-gray-800">
                    {client.name}
                  </h3>
                  {client.industry && (
                    <p className="text-sm text-gray-600 mt-1">
                      Industry: {client.industry}
                    </p>
                  )}
                </div>

                <div>
                  <h4 className="text-lg font-medium text-gray-700 mb-3">
                    Assigned Consultants ({consultantsForClient.length})
                  </h4>
                  {consultantsForClient.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {consultantsForClient.map((consultant) => (
                        <div
                          key={consultant.id}
                          className="bg-white rounded-lg p-4 shadow-sm border border-gray-200"
                        >
                          <p className="font-medium text-gray-800">
                            {consultant.name}
                          </p>
                          {consultant.role && (
                            <p className="text-sm text-gray-600 mt-1">
                              {consultant.role}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">
                      No consultants assigned to this client
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
