import { useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TAsset } from 'src/schemas';
import { useSnackbar } from 'notistack';
import { ENTITY } from './entity';
import { useAxios } from '../use-axios';

export const useCreateAssetMutation = () => {
  const queryClient = useQueryClient();
  const { axios } = useAxios();
  const { enqueueSnackbar } = useSnackbar();

  const mutationFn = useCallback(async (params: TAsset[]) => axios.post(ENTITY, params), [axios]);

  return useMutation({
    mutationFn,
    onSuccess: async (data) => {
      enqueueSnackbar('create asset successful', {
        variant: 'success',
      });
      // refetch all partially matching queries which are active
      await queryClient.refetchQueries({ queryKey: [ENTITY], type: 'active' });
    },
    onError: () => {
      enqueueSnackbar('create asset failed', {
        variant: 'error',
      });
    },
  });
};
