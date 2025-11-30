import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateClient } from '../api/mock-api';
import { clientKeys } from '../api/query-keys';
import type { Client } from '../../shared/types';

interface UpdateClientVariables {
  id: string;
  data: Partial<Omit<Client, 'id'>>;
}

interface UseUpdateClientMutationOptions {
  onSuccess?: () => void;
}

export function useUpdateClientMutation(options?: UseUpdateClientMutationOptions) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateClientVariables) =>
      updateClient(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: clientKeys.all });
      options?.onSuccess?.();
    },
  });
}
