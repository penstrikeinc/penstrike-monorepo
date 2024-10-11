import { useQuery } from '@tanstack/react-query';
import { IAsset, PageableResponseFe } from 'src/types';
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
