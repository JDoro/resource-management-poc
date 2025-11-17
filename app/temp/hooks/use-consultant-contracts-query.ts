import { useQuery } from '@tanstack/react-query';
import { fetchConsultantContracts } from '../api/mock-api';
import { consultantContractsKeys } from '../api/query-keys';

export function useConsultantContractsQuery() {
  return useQuery({
    queryKey: consultantContractsKeys.all,
    queryFn: () => fetchConsultantContracts(),
  });
}
