import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateConsultantContract } from '../api/mock-api';
import { consultantContractsKeys } from '../api/query-keys';
import type { ConsultantContract } from '../../shared/types';

interface UpdateConsultantContractVariables {
  id: string;
  data: Partial<Omit<ConsultantContract, 'id' | 'consultant_id' | 'contract_id'>>;
}

interface UseUpdateConsultantContractMutationOptions {
  onSuccess?: () => void;
}

export function useUpdateConsultantContractMutation(
  options?: UseUpdateConsultantContractMutationOptions
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateConsultantContractVariables) =>
      updateConsultantContract(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: consultantContractsKeys.all });
      options?.onSuccess?.();
    },
  });
}
