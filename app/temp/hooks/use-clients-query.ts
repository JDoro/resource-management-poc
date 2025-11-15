import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { clientKeys } from '../api/query-keys';
import { fetchClients } from '../api/mock-api';
import type { Client } from '../../shared/types/client';

/**
 * Custom hook to fetch all clients using TanStack Query
 * @returns Query result containing clients data, loading, and error states
 */
export function useClientsQuery(): UseQueryResult<Client[], Error> {
  return useQuery({
    queryKey: clientKeys.list(),
    queryFn: fetchClients,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
