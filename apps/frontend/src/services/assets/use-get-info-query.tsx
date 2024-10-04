import { useQuery } from '@tanstack/react-query';
import { IAsset, SingleResponseFe } from 'src/types';
import { useAxios } from '../use-axios';
import { ENTITY } from './entity';

export const getAssetInfoQueryKey = (assetId: string) => [ENTITY, assetId];

export const useGetAssetInfoQuery = (assetId: string) => {
  const { axios } = useAxios();

  return useQuery<SingleResponseFe<IAsset>>({
    queryKey: getAssetInfoQueryKey(assetId),
    queryFn: () => axios.get(`${ENTITY}/${assetId}`),
    enabled: !!assetId,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
};
