import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createClient } from '../api/mock-api';
import { clientKeys } from '../api/query-keys';
import type { Client } from '../../shared/types';

export interface UseCreateClientMutationOptions {
  onSuccess?: (client: Client) => void;
}

export function useCreateClientMutation(options?: UseCreateClientMutationOptions) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createClient,
    onSuccess: (client) => {
      queryClient.invalidateQueries({ queryKey: clientKeys.all });
      options?.onSuccess?.(client);
    },
  });
}
