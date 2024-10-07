import { useQuery } from '@tanstack/react-query';
import { PageableResponseFe } from 'src/types';
import { IAsset } from 'src/types/asset';
import { ENTITY } from './entity';
import { useAxios } from '../use-axios';

export const getAssetQueryKey = () => [ENTITY];

export const useGetAllAssetQuery = () => {
  const { axios } = useAxios();

  return useQuery<PageableResponseFe<IAsset>>({
    queryKey: getAssetQueryKey(),
    queryFn: () => axios.get(ENTITY),
    refetchOnWindowFocus: false,
  });
};
