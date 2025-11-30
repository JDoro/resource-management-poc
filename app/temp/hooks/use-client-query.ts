import { useQuery } from '@tanstack/react-query';
import { fetchClientById } from '../api/mock-api';
import { clientKeys } from '../api/query-keys';

export function useClientQuery(id: string) {
  return useQuery({
    queryKey: clientKeys.detail(id),
    queryFn: () => fetchClientById(id),
    enabled: !!id,
  });
}
