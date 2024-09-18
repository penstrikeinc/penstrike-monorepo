import { useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TRegister } from 'src/schemas';
import { useSnackbar } from 'notistack';
import { ENTITY } from './entity';
import { useAxios } from '../use-axios';

export const useCreateUserMutation = () => {
  const queryClient = useQueryClient();
  const { axios } = useAxios();
  const { enqueueSnackbar } = useSnackbar();

  const mutationFn = useCallback(async (params: TRegister) => axios.post(ENTITY, params), [axios]);

  return useMutation({
    mutationFn,
    onSuccess: async (data) => {
      console.log({ data });
      enqueueSnackbar('create user successful', {
        variant: 'success',
      });
      // refetch all partially matching queries which are active
      await queryClient.refetchQueries({ queryKey: [ENTITY], type: 'active' });
    },
    onError: () => {
      enqueueSnackbar('create user failed', {
        variant: 'error',
      });
    },
  });
};
