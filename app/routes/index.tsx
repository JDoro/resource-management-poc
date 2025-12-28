import { createFileRoute, Link } from '@tanstack/react-router';
import { fetchClients, fetchConsultants, fetchContracts, fetchConsultantContracts, fetchRoles, fetchConsultantRoles } from '../temp/api/mock-api';
import type { Client, Contract, ConsultantContract, Consultant, Role, ConsultantRole } from '../shared/types';

export const Route = createFileRoute('/')({
  component: HomeComponent,
  loader: async () => {
    // Prefetch all data
    const [clients, consultants, contracts, consultantContracts, roles, consultantRoles] = await Promise.all([
      fetchClients(),
      fetchConsultants(),
      fetchContracts(),
      fetchConsultantContracts(),
      fetchRoles(),
      fetchConsultantRoles(),
    ]);
    return { clients, consultants, contracts, consultantContracts, roles, consultantRoles };
  },
});

/**
 * Retrieve consultants assigned to a client, including each consultant's resolved role when available.
 *
 * Resolves assignments by matching the client's contracts to consultant assignments. Entries that reference a missing consultant are omitted. For each consultant, the function first attempts to resolve a role name via consultant-role and role mappings and falls back to the role value from the consultant assignment when no mapping is found.
 *
 * @param clientId - The ID of the client
 * @returns An array of consultants assigned to the client where each consultant object includes a `role` property when available
 */
function HomeComponent() {
  const loaderData = Route.useLoaderData();
  const clients = loaderData.clients;
  const consultants = loaderData.consultants;
  const contracts = loaderData.contracts;
  const consultantContracts = loaderData.consultantContracts;
  const roles = loaderData.roles;
  const consultantRoles = loaderData.consultantRoles;

  /**
   * Returns consultants for a given client, using data from component scope.
   * @param clientId - The ID of the client.
   * @returns Array of consultants with their roles for the client.
   */
  const getConsultantsForClient = (clientId: string): Consultant[] => {
    const clientContracts = contracts.filter(
      (contract: Contract) => contract.client_id === clientId
    );
    const clientContractIds = clientContracts.map((contract: Contract) => contract.id);
    const ccsForClient = consultantContracts.filter((cc: ConsultantContract) =>
      clientContractIds.includes(cc.contract_id)
    );

    return ccsForClient.map((cc: ConsultantContract) => {
      const consultant = consultants.find(
        (c: Consultant) => c.id === cc.consultant_id
      );
      if (!consultant) {
        return null;
      }
      const consultantRole = consultantRoles.find(
        (cr: ConsultantRole) => cr.consultant_id === consultant.id
      );
      const role = roles.find((r: Role) => r.id === consultantRole?.role_id);
      return {
        ...consultant,
        role: role?.name || cc.role,
      };
    }).filter((consultant: Consultant | null): consultant is Consultant => consultant !== null); // Type guard filter
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-dark-grey mb-4">
          Clients and Consultants
        </h2>
        <p className="text-dark-grey/70 mb-6">
          View the list of clients and their assigned consultants.
        </p>

        <div className="space-y-6">
          {clients.map((client: Client) => {
            const consultantsForClient = getConsultantsForClient(client.id);

            return (
              <div
                key={client.id}
                className="bg-gradient-to-br from-light-blue/30 to-light-grey/50 rounded-lg p-6 border border-light-blue"
              >
                <div className="mb-4">
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-semibold text-dark-grey">
                      {client.name}
                    </h3>
                    <Link
                      to="/clients/$id"
                      params={{ id: client.id }}
                      className="text-primary hover:text-primary-light transition-colors"
                      title={`View ${client.name} details`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                        />
                      </svg>
                    </Link>
                  </div>
                  <p className="text-sm text-dark-grey/70 mt-1">
                    {client.description}
                  </p>
                  <p className="text-sm text-dark-grey/60 mt-1">
                    {client.address}
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-medium text-dark-grey mb-3">
                    Assigned Consultants ({consultantsForClient.length})
                  </h4>
                  {consultantsForClient.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {consultantsForClient.map((consultant) => (
                        <Link
                          key={consultant.id}
                          to="/consultants/$id"
                          params={{ id: consultant.id }}
                          className="bg-white rounded-lg p-4 shadow-sm border border-light-grey hover:border-primary hover:shadow-md transition-all"
                        >
                          <p className="font-medium text-dark-grey hover:text-primary">
                            {consultant.name}
                          </p>
                          {consultant.role && (
                            <p className="text-sm text-dark-grey/70 mt-1">
                              {consultant.role}
                            </p>
                          )}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="text-dark-grey/60 italic">
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