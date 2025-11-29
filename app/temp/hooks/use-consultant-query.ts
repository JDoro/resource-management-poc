import { useQuery } from '@tanstack/react-query';
import { fetchConsultantById } from '../api/mock-api';
import { consultantKeys } from '../api/query-keys';

export function useConsultantQuery(id: string) {
  return useQuery({
    queryKey: consultantKeys.detail(id),
    queryFn: () => fetchConsultantById(id),
    enabled: !!id,
  });
}
