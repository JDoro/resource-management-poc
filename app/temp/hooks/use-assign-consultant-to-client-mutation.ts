import { useMutation, useQueryClient } from '@tanstack/react-query';
import { assignConsultantToClient, AssignConsultantToClientParams } from '../api/mock-api';
import { consultantContractsKeys, contractsKeys } from '../api/query-keys';

interface UseAssignConsultantToClientMutationOptions {
  onSuccess?: () => void;
}

export function useAssignConsultantToClientMutation(
  options?: UseAssignConsultantToClientMutationOptions
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: AssignConsultantToClientParams) =>
      assignConsultantToClient(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: consultantContractsKeys.all });
      queryClient.invalidateQueries({ queryKey: contractsKeys.all });
      options?.onSuccess?.();
    },
  });
}
