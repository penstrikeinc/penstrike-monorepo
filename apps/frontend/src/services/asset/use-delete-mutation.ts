import { useSnackbar } from 'notistack';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { ENTITY } from './entity';
import { useAxios } from '../use-axios';
import { getAssetQueryKey } from './use-get-all-query';

interface IUpdateAsset {
  assetId: string;
}

export const useDeleteAssetMutation = () => {
  const queryClient = useQueryClient();
  const { axios } = useAxios();
  const { enqueueSnackbar } = useSnackbar();

  const mutationFn = useCallback(
    async (data: IUpdateAsset) => {
      const { assetId } = data;
      return axios.delete(`${ENTITY}/${assetId}`);
    },
    [axios]
  );

  return useMutation({
    mutationFn,
    onSuccess: ({ data }) => {
      enqueueSnackbar('Deleted asset successful', {
        variant: 'success',
      });
      queryClient.invalidateQueries({
        queryKey: getAssetQueryKey(),
      });
    },
    onError: () => {
      enqueueSnackbar('Asset delete failed', {
        variant: 'error',
      });
    },
  });
};
