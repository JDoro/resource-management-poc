import { useQuery } from '@tanstack/react-query';
import { fetchConsultants } from '../api/mock-api';
import { consultantKeys } from '../api/query-keys';

export function useConsultantsQuery() {
  return useQuery({
    queryKey: consultantKeys.all,
    queryFn: () => fetchConsultants(),
  });
}
