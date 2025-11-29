import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateConsultant } from '../api/mock-api';
import { consultantKeys } from '../api/query-keys';
import type { Consultant } from '../../shared/types';

interface UpdateConsultantVariables {
  id: string;
  data: Partial<Omit<Consultant, 'id'>>;
}

export function useUpdateConsultantMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateConsultantVariables) =>
      updateConsultant(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: consultantKeys.all });
    },
  });
}
