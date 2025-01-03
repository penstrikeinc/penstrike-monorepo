import { useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TReportBE } from 'src/schemas';
import { useSnackbar } from 'notistack';
import { ENTITY } from './entity';
import { useAxios } from '../use-axios';

export const useCreateReportMutation = () => {
  const queryClient = useQueryClient();
  const { axios } = useAxios();
  const { enqueueSnackbar } = useSnackbar();

  const mutationFn = useCallback(async (params: TReportBE) => axios.post(ENTITY, params), [axios]);

  return useMutation({
    mutationFn,
    onSuccess: async (data) => {
      enqueueSnackbar('Create report successful', {
        variant: 'success',
      });
      // refetch all partially matching queries which are active
      await queryClient.refetchQueries({ queryKey: [ENTITY], type: 'active' });
    },
    onError: () => {
      enqueueSnackbar('Create report failed', {
        variant: 'error',
      });
    },
  });
};
