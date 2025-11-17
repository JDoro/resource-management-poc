import { useQuery } from '@tanstack/react-query';
import { fetchRoles } from '../api/mock-api';
import { rolesKeys } from '../api/query-keys';

export function useRolesQuery() {
  return useQuery({
    queryKey: rolesKeys.all,
    queryFn: () => fetchRoles(),
  });
}
