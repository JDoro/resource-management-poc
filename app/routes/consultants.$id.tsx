import { createFileRoute, Link } from '@tanstack/react-router';
import { fetchConsultantById } from '../temp/api/mock-api';
import { useConsultantContractsQuery } from '../temp/hooks/use-consultant-contracts-query';
import { useContractsQuery } from '../temp/hooks/use-contracts-query';
import { useClientsQuery } from '../temp/hooks/use-clients-query';

export const Route = createFileRoute('/consultants/$id')({
  component: ConsultantDetailRoute,
  loader: async ({ params }) => {
    const consultant = await fetchConsultantById(params.id);
    return { consultant };
  },
});

function ConsultantDetailRoute() {
  const { id } = Route.useParams();
  const { consultant } = Route.useLoaderData();
  
  const { data: consultantContracts = [] } = useConsultantContractsQuery();
  const { data: contracts = [] } = useContractsQuery();
  const { data: clients = [] } = useClientsQuery();

  if (!consultant) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-dark-grey mb-4">Consultant Not Found</h2>
        <p className="text-dark-grey/70 mb-6">
          No consultant found with ID: {id}
        </p>
        <Link
          to="/"
          className="text-primary hover:text-primary-light font-medium"
        >
          ← Back to Home
        </Link>
      </div>
    );
  }

  // Get contracts for this consultant
  const consultantContractsList = consultantContracts.filter(
    (cc) => cc.consultant_id === consultant.id
  );

  // Enrich contracts with client information
  const enrichedContracts = consultantContractsList.map((cc) => {
    const contract = contracts.find((c) => c.id === cc.contract_id);
    const client = contract ? clients.find((cl) => cl.id === contract.client_id) : null;
    return {
      ...cc,
      contractName: contract?.contract_name || 'Unknown Contract',
      clientName: client?.name || 'Unknown Client',
      startDate: cc.start_date,
      endDate: cc.end_date,
    };
  });

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/"
            className="text-primary hover:text-primary-light font-medium"
          >
            ← Back to Home
          </Link>
          <Link
            to="/consultants/$id/edit"
            params={{ id }}
            className="px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary-light transition-colors"
          >
            Edit Consultant
          </Link>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-dark-grey mb-2">
            {consultant.name}
          </h2>
          <p className="text-dark-grey/70">
            {consultant.years_employed} {consultant.years_employed === 1 ? 'year' : 'years'} employed
          </p>
        </div>

        <div className="bg-gradient-to-br from-light-blue/30 to-light-grey/50 rounded-lg p-6 border border-light-blue">
          <h3 className="text-xl font-semibold text-dark-grey mb-4">
            Assigned Contracts ({enrichedContracts.length})
          </h3>
          
          {enrichedContracts.length > 0 ? (
            <div className="space-y-4">
              {enrichedContracts.map((contract) => (
                <div
                  key={contract.id}
                  className="bg-white rounded-lg p-4 shadow-sm border border-light-grey"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-dark-grey">
                        {contract.contractName}
                      </p>
                      <p className="text-sm text-dark-grey/70 mt-1">
                        Client: {contract.clientName}
                      </p>
                      <p className="text-sm text-dark-grey/70">
                        Role: {contract.role}
                      </p>
                    </div>
                    <div className="text-right text-sm text-dark-grey/60">
                      <p>
                        Started: {new Date(contract.startDate).toLocaleDateString()}
                      </p>
                      {contract.endDate && (
                        <p>
                          Ended: {new Date(contract.endDate).toLocaleDateString()}
                        </p>
                      )}
                      <p className="mt-1">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          contract.utilization === 0 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {contract.utilization === 0 ? 'Full Time' : 'Part Time'}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-dark-grey/60 italic">
              No contracts assigned to this consultant
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
