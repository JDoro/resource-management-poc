import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { useClientQuery } from '../temp/hooks/use-client-query';
import { useContractsQuery } from '../temp/hooks/use-contracts-query';
import { useConsultantContractsQuery } from '../temp/hooks/use-consultant-contracts-query';
import { useConsultantsQuery } from '../temp/hooks/use-consultants-query';
import { AssignConsultantDialog } from '../shared/components/assign-consultant-dialog';

export const Route = createFileRoute('/clients/$id')({
  component: ClientDetailRoute,
});

function ClientDetailRoute() {
  const { id } = Route.useParams();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const { data: client, isLoading: isLoadingClient } = useClientQuery(id);
  const { data: contracts = [], isLoading: isLoadingContracts } = useContractsQuery();
  const { data: consultantContracts = [], isLoading: isLoadingConsultantContracts } = useConsultantContractsQuery();
  const { data: consultants = [], isLoading: isLoadingConsultants } = useConsultantsQuery();

  const isLoading = isLoadingClient || isLoadingContracts || isLoadingConsultantContracts || isLoadingConsultants;

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <p className="text-dark-grey/70">Loading client details...</p>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-dark-grey mb-4">Client Not Found</h2>
        <p className="text-dark-grey/70 mb-6">
          No client found with ID: {id}
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

  // Get all unique consultants currently working for this client
  const currentRoster = clientContracts.flatMap((contract) => {
    const contractConsultants = consultantContracts
      .filter((cc) => cc.contract_id === contract.id)
      .filter((cc) => !cc.end_date || new Date(cc.end_date) > new Date()) // Only active assignments
      .map((cc) => {
        const consultant = consultants.find((c) => c.id === cc.consultant_id);
        return {
          consultantId: cc.consultant_id,
          consultantName: consultant?.name || 'Unknown Consultant',
          yearsEmployed: consultant?.years_employed || 0,
          role: cc.role,
          utilization: cc.utilization,
          contractName: contract.contract_name,
          contractId: contract.id,
          startDate: cc.start_date,
        };
      });
    return contractConsultants;
  });

  // Remove duplicates if consultant is on multiple contracts
  const seenConsultantIds = new Set<string>();
  const uniqueRoster = currentRoster.filter((curr) => {
    if (seenConsultantIds.has(curr.consultantId)) {
      return false;
    }
    seenConsultantIds.add(curr.consultantId);
    return true;
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
          <div className="flex gap-3">
            <button
              onClick={() => setIsDialogOpen(true)}
              className="px-4 py-2 bg-secondary text-white font-medium rounded-lg hover:bg-secondary-light transition-colors"
            >
              Assign Consultant
            </button>
            <Link
              to="/clients/$id/edit"
              params={{ id }}
              className="px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary-light transition-colors"
            >
              Edit Client
            </Link>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-dark-grey mb-2">
            {client.name}
          </h2>
          <p className="text-dark-grey/70 mb-2">
            {client.description}
          </p>
          <p className="text-dark-grey/60 text-sm">
            📍 {client.address}
          </p>
        </div>

        <div className="bg-gradient-to-br from-light-blue/30 to-light-grey/50 rounded-lg p-6 border border-light-blue mb-6">
          <h3 className="text-xl font-semibold text-dark-grey mb-4">
            Current Roster ({uniqueRoster.length})
          </h3>
          
          {uniqueRoster.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {uniqueRoster.map((consultant) => (
                <div
                  key={consultant.consultantId}
                  className="bg-white rounded-lg p-4 shadow-sm border border-light-grey"
                >
                  <div className="mb-2">
                    <p className="font-semibold text-dark-grey">
                      {consultant.consultantName}
                    </p>
                    <p className="text-xs text-dark-grey/60">
                      {consultant.yearsEmployed} {consultant.yearsEmployed === 1 ? 'year' : 'years'} employed
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-dark-grey/70">
                      <span className="font-medium">Role:</span> {consultant.role}
                    </p>
                    <p className="text-sm text-dark-grey/70">
                      <span className="font-medium">Contract:</span> {consultant.contractName}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-light-grey">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
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
          ) : (
            <div className="text-center py-8">
              <p className="text-dark-grey/60 italic mb-4">
                No consultants currently assigned to this client
              </p>
              <button
                onClick={() => setIsDialogOpen(true)}
                className="inline-block px-6 py-2 bg-secondary text-white font-medium rounded-lg hover:bg-secondary-light transition-colors"
              >
                Assign Your First Consultant
              </button>
            </div>
          )}
        </div>

        <div className="bg-gradient-to-br from-light-blue/30 to-light-grey/50 rounded-lg p-6 border border-light-blue">
          <h3 className="text-xl font-semibold text-dark-grey mb-4">
            Contracts ({enrichedContracts.length})
          </h3>
          
          {enrichedContracts.length > 0 ? (
            <div className="space-y-4">
              {enrichedContracts.map((contract) => (
                <div
                  key={contract.id}
                  className="bg-white rounded-lg p-4 shadow-sm border border-light-grey"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-medium text-dark-grey">
                        {contract.contract_name}
                      </p>
                      <p className="text-sm text-dark-grey/70 mt-1">
                        Started: {new Date(contract.start_date).toLocaleDateString()}
                        {contract.end_date && (
                          <> · Ended: {new Date(contract.end_date).toLocaleDateString()}</>
                        )}
                      </p>
                    </div>
                  </div>
                  
                  {contract.consultants.length > 0 ? (
                    <div className="mt-3 pt-3 border-t border-light-grey">
                      <p className="text-sm font-medium text-dark-grey mb-2">
                        Assigned Consultants ({contract.consultants.length})
                      </p>
                      <div className="space-y-2">
                        {contract.consultants.map((consultant) => (
                          <div
                            key={consultant.id}
                            className="flex justify-between items-center text-sm bg-light-grey/50 rounded px-3 py-2"
                          >
                            <div>
                              <span className="font-medium text-dark-grey">
                                {consultant.consultantName}
                              </span>
                              <span className="text-dark-grey/60 ml-2">
                                ({consultant.yearsEmployed} {consultant.yearsEmployed === 1 ? 'year' : 'years'} employed)
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-dark-grey/70">{consultant.role}</span>
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
                    <p className="mt-3 pt-3 border-t border-light-grey text-sm text-dark-grey/60 italic">
                      No consultants assigned to this contract
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-dark-grey/60 italic">
              No contracts for this client
            </p>
          )}
        </div>
      </div>

      <AssignConsultantDialog
        clientId={id}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </div>
  );
}
