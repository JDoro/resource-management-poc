import { useQuery } from '@tanstack/react-query';
import { fetchClients } from '../api/mock-api';
import { clientKeys } from '../api/query-keys';

export function useClientsQuery() {
  return useQuery({
    queryKey: clientKeys.all,
    queryFn: () => fetchClients(),
  });
}
