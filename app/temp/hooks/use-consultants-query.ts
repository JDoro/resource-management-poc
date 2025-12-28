import { useQuery } from '@tanstack/react-query';
import {
  fetchConsultantContracts,
  fetchConsultants,
  fetchContracts,
} from '../api/mock-api';
import * as queryKeys from '../api/query-keys';
import type { ConsultantContract } from '../../shared/types';

/**
 * Enriches consultant data with their current role from active contracts.
 *
 * Active contracts are those that have started (start_date <= now) and
 * haven't ended yet (no end_date or end_date > now).
 *
 * If multiple active contracts exist, the most recently started contract
 * is used to determine the current role.
 */
export function useConsultantsQuery(clientId?: string) {
  return useQuery({
    queryKey: [
      ...queryKeys.consultantKeys.all,
      ...queryKeys.consultantContractsKeys.all,
      ...queryKeys.contractsKeys.all,
      clientId,
    ],
    queryFn: async () => {
      const [consultants, consultantContracts, contracts] = await Promise.all([
        fetchConsultants(),
        fetchConsultantContracts(),
        fetchContracts(),
      ]);

      let filteredConsultantIds: string[] | null = null;

      if (clientId) {
        const clientContractIds = contracts
          .filter((contract) => contract.client_id === clientId)
          .map((contract) => contract.id);

        filteredConsultantIds = consultantContracts
          .filter((cc) => clientContractIds.includes(cc.contract_id))
          .map((cc) => cc.consultant_id);
      }

      // Build a map of consultant_id -> active contracts
      const now = new Date();
      const activeContractsByConsultant = new Map<
        string,
        ConsultantContract[]
      >();

      consultantContracts.forEach((contract) => {
        if (
          contract.start_date <= now &&
          (!contract.end_date || contract.end_date > now)
        ) {
          const contracts =
            activeContractsByConsultant.get(contract.consultant_id) || [];
          contracts.push(contract);
          activeContractsByConsultant.set(contract.consultant_id, contracts);
        }
      });

      const allConsultants = consultants.map((consultant) => {
        const activeContracts =
          activeContractsByConsultant.get(consultant.id) || [];

        // If there are multiple active contracts, sort by the most recent start_date.
        if (activeContracts.length > 1) {
          activeContracts.sort(
            (a, b) => b.start_date.getTime() - a.start_date.getTime()
          );
        }

        // The current contract is the first one in the sorted list (or null if none are active).
        const currentContract =
          activeContracts.length > 0 ? activeContracts[0] : null;

        return {
          ...consultant,
          role: currentContract?.role,
        };
      });

      if (filteredConsultantIds) {
        return allConsultants.filter((consultant) =>
          filteredConsultantIds.includes(consultant.id)
        );
      }

      return allConsultants;
    },
  });
}
