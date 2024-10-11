import { useSnackbar } from 'notistack';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { TAsset } from 'src/schemas';
import { ENTITY } from './entity';
import { useAxios } from '../use-axios';
import { getAssetQueryKey } from './use-get-all-query';

interface IUpdateAsset {
  assetId: string;
  payload: TAsset;
}

export const useUpdateAssetMutation = () => {
  const queryClient = useQueryClient();
  const { axios } = useAxios();
  const { enqueueSnackbar } = useSnackbar();

  const mutationFn = useCallback(
    async (data: IUpdateAsset) => {
      const { assetId, payload } = data;
      return axios.patch(`${ENTITY}/${assetId}`, payload);
    },
    [axios]
  );

  return useMutation({
    mutationFn,
    onSuccess: ({ data }) => {
      enqueueSnackbar('Updated Asset info', {
        variant: 'success',
      });
      queryClient.invalidateQueries({
        queryKey: getAssetQueryKey(),
      });
    },
    onError: () => {
      enqueueSnackbar('Unable to update Asset info', {
        variant: 'error',
      });
    },
  });
};
