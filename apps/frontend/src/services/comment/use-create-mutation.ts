import { useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { ENTITY } from './entity';
import { useAxios } from '../use-axios';

interface IParams {
  massage: string;
  findingId: string;
  parentId?: string;
}

export const useCreateCommentMutation = () => {
  const queryClient = useQueryClient();
  const { axios } = useAxios();
  const { enqueueSnackbar } = useSnackbar();

  const mutationFn = useCallback(async (params: IParams) => axios.post(ENTITY, params), [axios]);

  return useMutation({
    mutationFn,
    onSuccess: async (data) => {
      enqueueSnackbar('Create comment successful', {
        variant: 'success',
      });
      // refetch all partially matching queries which are active
      await queryClient.refetchQueries({ queryKey: [ENTITY], type: 'active' });
    },
    onError: () => {
      enqueueSnackbar('Create comment failed', {
        variant: 'error',
      });
    },
  });
};
