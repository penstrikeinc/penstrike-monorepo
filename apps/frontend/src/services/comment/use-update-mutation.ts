import { useSnackbar } from 'notistack';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { TFinding } from 'src/schemas';
import { ENTITY } from './entity';
import { useAxios } from '../use-axios';
import {} from './use-get-info-query';
import { getCommentQueryKey } from './use-get-all-query';

interface IUpdateParam {
  findingId: string;
  payload: TFinding;
}

export const useUpdateCommentMutation = () => {
  const queryClient = useQueryClient();
  const { axios } = useAxios();
  const { enqueueSnackbar } = useSnackbar();

  const mutationFn = useCallback(
    async (data: IUpdateParam) => {
      const { findingId, payload } = data;
      return axios.patch(`${ENTITY}/${findingId}`, payload);
    },
    [axios]
  );

  return useMutation({
    mutationFn,
    onSuccess: ({ data }) => {
      enqueueSnackbar('Updated comment info', {
        variant: 'success',
      });
      queryClient.invalidateQueries({
        queryKey: getCommentQueryKey(),
      });
    },
    onError: () => {
      enqueueSnackbar('Unable to update comment info', {
        variant: 'error',
      });
    },
  });
};
