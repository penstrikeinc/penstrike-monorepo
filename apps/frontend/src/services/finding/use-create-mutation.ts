import { useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TFinding } from 'src/schemas';
import { useSnackbar } from 'notistack';
import { ENTITY } from './entity';
import { useAxios } from '../use-axios';

interface IParams {
  payload: TFinding;
}

export const useCreateFindingMutation = () => {
  const queryClient = useQueryClient();
  const { axios } = useAxios();
  const { enqueueSnackbar } = useSnackbar();

  const mutationFn = useCallback(
    async (params: IParams) => {
      const { payload } = params;
      return axios.post(ENTITY, payload);
    },
    [axios]
  );

  return useMutation({
    mutationFn,
    onSuccess: async (data) => {
      enqueueSnackbar('Create finding successful', {
        variant: 'success',
      });
      // refetch all partially matching queries which are active
      await queryClient.refetchQueries({ queryKey: [ENTITY], type: 'active' });
    },
    onError: () => {
      enqueueSnackbar('Create finding failed', {
        variant: 'error',
      });
    },
  });
};
