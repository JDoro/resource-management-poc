import { useQuery } from '@tanstack/react-query';
import { fetchConsultantRoles } from '../api/mock-api';
import { consultantRolesKeys } from '../api/query-keys';

export function useConsultantRolesQuery() {
  return useQuery({
    queryKey: consultantRolesKeys.all,
    queryFn: () => fetchConsultantRoles(),
  });
}
