import { useSnackbar } from 'notistack';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { useAxios } from '../use-axios';
import { ENTITY } from './entity';
import { getCommentQueryKey } from './use-get-all-query';

export const useDeleteCommentMutation = () => {
  const { axios } = useAxios();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const mutationFn = useCallback(async (id: string) => axios.delete(`${ENTITY}/${id}`), [axios]);

  return useMutation({
    mutationFn,
    onSuccess: async () => {
      enqueueSnackbar('Delete comment successful', {
        variant: 'success',
      });
      queryClient.invalidateQueries({
        queryKey: getCommentQueryKey(),
      });
    },
    onError: () => {
      enqueueSnackbar('Delete comment failed', {
        variant: 'error',
      });
    },
  });
};
