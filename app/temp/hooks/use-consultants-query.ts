import { useQuery } from '@tanstack/react-query';
import { fetchConsultantContracts, fetchConsultants } from '../api/mock-api';
import { consultantKeys } from '../api/query-keys';

export function useConsultantsQuery() {
  return useQuery({
    queryKey: consultantKeys.all,
    queryFn: async () => {
      const [consultants, consultantContracts] = await Promise.all([
        fetchConsultants(),
        fetchConsultantContracts(),
      ]);

      return consultants.map((consultant) => {
        const now = new Date();

        // Find all contracts for the current consultant.
        const contractsForConsultant = consultantContracts.filter(
          (contract) => contract.consultant_id === consultant.id
        );

        // Filter for active contracts (started in the past, not yet ended).
        const activeContracts = contractsForConsultant.filter(
          (contract) =>
            contract.start_date <= now &&
            (!contract.end_date || contract.end_date > now)
        );

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
