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
        const consultantContract = consultantContracts.find(
          (contract) => contract.consultant_id === consultant.id
        );
        return {
          ...consultant,
          role: consultantContract?.role,
        };
      });
    },
  });
}
