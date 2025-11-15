import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { consultantKeys } from '../api/query-keys';
import { fetchConsultants, fetchConsultantsByClientId } from '../api/mock-api';
import type { Consultant } from '../../shared/types/consultant';

/**
 * Custom hook to fetch all consultants using TanStack Query
 * @returns Query result containing consultants data, loading, and error states
 */
export function useConsultantsQuery(): UseQueryResult<Consultant[], Error> {
  return useQuery({
    queryKey: consultantKeys.list(),
    queryFn: fetchConsultants,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

/**
 * Custom hook to fetch consultants for a specific client using TanStack Query
 * @param clientId - The ID of the client
 * @returns Query result containing consultants data for the client
 */
export function useConsultantsByClientQuery(
  clientId: string
): UseQueryResult<Consultant[], Error> {
  return useQuery({
    queryKey: consultantKeys.byClient(clientId),
    queryFn: () => fetchConsultantsByClientId(clientId),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
