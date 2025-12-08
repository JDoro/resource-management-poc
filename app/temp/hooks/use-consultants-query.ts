import { useQuery } from '@tanstack/react-query';
import { fetchConsultantContracts, fetchConsultants } from '../api/mock-api';
import { consultantKeys, consultantContractsKeys } from '../api/query-keys';

/**
 * Enriches consultant data with their current role from active contracts.
 * 
 * Active contracts are those that have started (start_date <= now) and 
 * haven't ended yet (no end_date or end_date > now).
 * 
 * If multiple active contracts exist, the most recently started contract
 * is used to determine the current role.
 */
export function useConsultantsQuery() {
  return useQuery({
    queryKey: [...consultantKeys.all, ...consultantContractsKeys.all],
    queryFn: async () => {
      const [consultants, consultantContracts] = await Promise.all([
        fetchConsultants(),
        fetchConsultantContracts(),
      ]);

      // Build a map of consultant_id -> active contracts
      const now = new Date();
      const activeContractsByConsultant = new Map<string, typeof consultantContracts>();

      consultantContracts.forEach((contract) => {
        if (contract.start_date <= now && (!contract.end_date || contract.end_date > now)) {
          const contracts = activeContractsByConsultant.get(contract.consultant_id) || [];
          contracts.push(contract);
          activeContractsByConsultant.set(contract.consultant_id, contracts);
        }
      });

      return consultants.map((consultant) => {
        const activeContracts = activeContractsByConsultant.get(consultant.id) || [];

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
    },
  });
}
