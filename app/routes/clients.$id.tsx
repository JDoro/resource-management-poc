import { createFileRoute, Link } from '@tanstack/react-router';
import { useClientQuery } from '../temp/hooks/use-client-query';
import { useContractsQuery } from '../temp/hooks/use-contracts-query';
import { useConsultantContractsQuery } from '../temp/hooks/use-consultant-contracts-query';
import { useConsultantsQuery } from '../temp/hooks/use-consultants-query';

export const Route = createFileRoute('/clients/$id')({
  component: ClientDetailRoute,
});

function ClientDetailRoute() {
  const { id } = Route.useParams();
  
  const { data: client, isLoading: isLoadingClient } = useClientQuery(id);
  const { data: contracts = [], isLoading: isLoadingContracts } = useContractsQuery();
  const { data: consultantContracts = [], isLoading: isLoadingConsultantContracts } = useConsultantContractsQuery();
  const { data: consultants = [], isLoading: isLoadingConsultants } = useConsultantsQuery();

  const isLoading = isLoadingClient || isLoadingContracts || isLoadingConsultantContracts || isLoadingConsultants;

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <p className="text-gray-600">Loading client details...</p>
      </div>
    );
  }

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

  // Get contracts for this client
  const clientContracts = contracts.filter(
    (contract) => contract.client_id === client.id
  );

  // Enrich contracts with consultant information
  const enrichedContracts = clientContracts.map((contract) => {
    const contractConsultants = consultantContracts
      .filter((cc) => cc.contract_id === contract.id)
      .map((cc) => {
        const consultant = consultants.find((c) => c.id === cc.consultant_id);
        return {
          ...cc,
          consultantName: consultant?.name || 'Unknown Consultant',
          yearsEmployed: consultant?.years_employed || 0,
        };
      });
    
    return {
      ...contract,
      consultants: contractConsultants,
    };
  });

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
          <Link
            to="/clients/$id/edit"
            params={{ id }}
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Edit Client
          </Link>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {client.name}
          </h2>
          <p className="text-gray-600 mb-2">
            {client.description}
          </p>
          <p className="text-gray-500 text-sm">
            📍 {client.address}
          </p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Contracts ({enrichedContracts.length})
          </h3>
          
          {enrichedContracts.length > 0 ? (
            <div className="space-y-4">
              {enrichedContracts.map((contract) => (
                <div
                  key={contract.id}
                  className="bg-white rounded-lg p-4 shadow-sm border border-gray-200"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-medium text-gray-800">
                        {contract.contract_name}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        Started: {new Date(contract.start_date).toLocaleDateString()}
                        {contract.end_date && (
                          <> · Ended: {new Date(contract.end_date).toLocaleDateString()}</>
                        )}
                      </p>
                    </div>
                  </div>
                  
                  {contract.consultants.length > 0 ? (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <p className="text-sm font-medium text-gray-700 mb-2">
                        Assigned Consultants ({contract.consultants.length})
                      </p>
                      <div className="space-y-2">
                        {contract.consultants.map((consultant) => (
                          <div
                            key={consultant.id}
                            className="flex justify-between items-center text-sm bg-gray-50 rounded px-3 py-2"
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
                    </div>
                  ) : (
                    <p className="mt-3 pt-3 border-t border-gray-100 text-sm text-gray-500 italic">
                      No consultants assigned to this contract
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">
              No contracts for this client
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
