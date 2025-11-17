import { useQuery } from '@tanstack/react-query';
import { fetchContracts } from '../api/mock-api';
import { contractsKeys } from '../api/query-keys';

export function useContractsQuery() {
  return useQuery({
    queryKey: contractsKeys.all,
    queryFn: () => fetchContracts(),
  });
}
