import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createConsultant } from '../api/mock-api';
import { consultantKeys } from '../api/query-keys';
import type { Consultant } from '../../shared/types';

export interface UseCreateConsultantMutationOptions {
  onSuccess?: (consultant: Consultant) => void;
}

export function useCreateConsultantMutation(options?: UseCreateConsultantMutationOptions) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createConsultant,
    onSuccess: (consultant) => {
      queryClient.invalidateQueries({ queryKey: consultantKeys.all });
      options?.onSuccess?.(consultant);
    },
  });
}
